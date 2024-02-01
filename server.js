const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const os = require('os');
const ditenv = require('dotenv').config();
const socketIO = require('socket.io');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

const isDev = true;
//let isDev = false;
let debug = true;

//app.engine('handlebars', exphbs.engine({defaultLayout: 'backup'}));
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: '',
    partialsDir: 'views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" folder
app.use(express.static('public'));


const gameDataOut = 'gamedata.csv';
const playerPrefix = 'player-';
//const logPath = `../logs`;
const logPath = `logs`;
const logging = false;
const passwords = {
    'ADMIN': 'lemon',
    'SUPER': 'dragon'
};

let clean = true; /* clean means no activity has taken place, it can only be set to false when an admin screen connects*/
let logCount = 0;
let statusMessages = [];
let gamedata = null;
let presentationdata = null;
let sessionID = null;
let connectedSockets = {};
let playersBasic = {};
let playersDetail = {};
let socketMap = new Map();
let playersMap = new Map();
let session = null;
let storedData = null;
let sessionArchive = [];
let admin = false;
let scorePackets = [];
let scoreMap = [
    'round',
    'type',
    'id',
    'val',
    undefined
];

class Player {
    constructor(id, socket) {
//        this.id = minifyPlayerID(id);
        this.id = id;
//        this.socket = socket;
        this.socketID = socket.id;
        this.enrolled = false;
        this.active = true;
        this.stakeholder = -1;
//        writeLogFile(`playerinstance`, this);
    }
    getWebSocket () {
        return 'ws';
    };
    setActive(boo) {
        this.active = boo;
    };
    handleDisconnect() {
//        console.log('Player', this.id, 'disconnected.');
        this.connected = false;
//        alert('ham')
    };
    getVotes() {
        return this.teamObj.type === 1 ? this.teamObj.votes : this.votes;
    }
    setVotes(v) {
        this.teamObj.type === 1 ? this.teamObj.votes = v : this.votes = v;
    }
};
class Session {
    constructor(id) {
        this.id = id;
        this.round = 0;
        this.scores = {
            round1: {},
            round2: {}
        };
    }
    assigned;
    active;
    era;
    scores;
    round;
    rounds;
    setAssigned(boo) {
        this.assigned = boo;
    }
    setEra(n) {
        this.era = n;
    }
    setRound(n) {
        this.round = n;
        this.scores[`round${n}`] = {};
    }
    getRound() {
        return this.round;
    }
    getCurrentScores() {
        let r = this.round;
        r = 1;
        return this.scores[`round${this.round}`];
    }
};
class Stakeholder {
    constructor(stub, s, d) {
        this.id = s.id;
        this.stub = stub;
        this.title = s.title;
//        this.active = s.hasOwnProperty('active') ? s.active : d.active;
//        this.votes = d.votes;
        this.team = [];
        this.voteObj = {
            total: 0,
            detail: {}
        };
        for (var i in s) {
            this[i] = s[i];
        }
//        this.likes = 0;
    }
};
class ScorePacket {
    constructor(src, targ, valID, val, roundComplete) {
        this.id = getPacketID();
        this.src = src;
        this.targ = targ;
        this.val = val;
        this.valID = valID;
        this.isMultiplier = false;
        this.round = session ? session.getRound() : 0;
        this.roundComplete = roundComplete;
    }
};
const getPacketID = () => {
    return scorePackets.length;
};
const getNewScorePacket = (cb, src, targ, val, valID) => {
    console.log('OLD METHOD CALL');
    let sp = new ScorePacket(src, targ, valID, val);
    scorePackets.push(sp);
    applyScorePacket(sp);
    cb(sp);
}
const getNewScorePacket2 = (o) => {
    if (o.hasOwnProperty('src') && o.hasOwnProperty('targ') && o.hasOwnProperty('valID') && o.hasOwnProperty('val')) {
        let roundComplete = o.hasOwnProperty('roundComplete') ? o.roundComplete : false;
        let sp = new ScorePacket(o.src, o.targ, o.valID, o.val, roundComplete);
        o.isMultiplier ? sp.isMultiplier = o.isMultiplier : '';
        scorePackets.push(sp);
        updateLogFile('scorePackets', scorePackets);
        applyScorePacket(sp);
    } else {
        console.log('WARNING scorePackets require as a minimum a src, targ, valID and val')
    }
}

const isLocal = () => {
    return process.env.NODE_ENV === 'development';
};
const isLogging = () => {
    return Boolean(process.env.LOGGING === 'true');
};
console.log(`isLocal: ${isLocal()}`);
console.log(`isLogging: ${isLogging()}`);
const writeLogFile = (id, c, msg) => {
    if (isLocal() && isLogging()) {
        let f = `${logPath}/log.${logCount++}.${id}.json`;
//        let f = `${logPath}/log_${logCount++}_${id}.json`;
        if (msg) {
            c = Object.assign({msg: msg}, c);
        }
        fs.writeFile(f, JSON.stringify(c, null, 4), () => {
//        console.log(`log written: ${f}`)
    })
    }
};
const updateLogFile = (id, c, msg) => {
    if (isLocal() && isLogging()) {
        let f = `${logPath}/log.${id}.json`;
//        let f = `${logPath}/log_${id}.json`;
        if (msg) {
            c = Object.assign({msg: msg}, c);
        }
        fs.writeFile(f, JSON.stringify(c, null, 4), () => {
//        console.log(`log written: ${f}`);
    })
    }
};
const consoleLog = (m) => {
    const stack = new Error().stack;
    const l = stack.split('\n')[3].split(':')[2];
//    console.log(stack.split('\n')[3].split(':'));
    console.log(`Line ${l}: ${m}`);
//    console.log(m);
    io.emit('logoutput', `Line ${l}: ${m}`);
};
const clearLogs = (cb) => {
    if (isLocal() && isLogging()) {
        fs.readdir(logPath, (err, files) => {
            let l = files.length
            if (l === 0) {
                if (cb) {
                    cb();
                }
            }
            if (err) throw err;
            for (const f of files) {
                let d = `${logPath}/${f}`;
                fs.copyFileSync(d, d.replace('logs/', 'logscopy/'));
                fs.unlink(d, (e) => {
                    if (l-- === 1) {
                        if (cb) {
                            cb();
                        }
                    }
                    if (e) throw e;
                })
            }
        });
    }
};
const getPassword = (p) => {
    let pw = 'this_will_NEVER_be_a_valid_password_026219873971_jGfTRAjusFtha';
    if (passwords.hasOwnProperty(p)) {
        pw = passwords[p];
    }
    return pw;
};
const getScoreString = (p) => {
//    console.log(`============ getScoreString`);
//    console.log(p);
//    getTeamFromPlayer(p.src);
//    console.log('=========================');
    let ttarg = Object.values(gamedata.teams)[p.targ];
    let tsrc = getTeamFromPlayer(p.src);
//    console.log(`allocation? ${ttarg.id === tsrc.id}`);
    return `${p.valID} set to ${p.val} for ${ttarg.title} ${ttarg.id === tsrc.id ? '(allocation)' : ''}`;
};
const statusUpdate = (s) => {
//    console.log(`statusUpdate, ${typeof(m)}`);
//    console.log(m);
    let m = '';
    if (s instanceof ScorePacket) {
        m = JSON.stringify(s);
        m = getScoreString(s);
    }
    if (typeof(s) === 'string') {
        m = s;
    }
    statusMessages.push({message: m});
    io.emit('onStatusUpdate', statusMessages);
};
const updateApp = () => {
    updatePresentationPack();
};
const processGameData = (d) => {
    let t = d.teams;
    let f = d.defaults;
    let m = d.map;
    d.mainTeams = [];
    for (var i in t) {
        t[i].stub = t[i].title.toLowerCase().replace(/ /gm, '_');
        for (var j in f) {
            if (!t[i].hasOwnProperty(j)) {
                t[i][j] = f[j];
            }
        }
        if (t[i].hasMax) {
            d.mainTeams.push(t[i]);
        }
    }
    for (var i in m) {
        m[m[i]] = i;
    }
    writeLogFile('data', d, 'gameData prepared by processData method');
    return d;
};
const processPresentationData = (d) => {
    for (var i = 0; i < d.slideList.length; i++) {
        let s = d.slideList[i];
        s.index = i;
        s.hasSession = Boolean(session);
        if (session) {
            let id = session.id.toString();
            s.code = `${id.substr(0, 3)} ${id.substr(3, 3)} ${id.substr(6, 3)}`
        }
        if (s.type === 'video') {
            s.src = `${d.videoEnv}${d.videoLinks[s.srcRef]}${d.videoSettings}`;
        }
        s.hasAction = s.hasOwnProperty('action');
        if (s.hasOwnProperty('action')) {
//            console.log(`action: ${s.action}`);
            let ar = getRoundFromProp(s.action);
            if (ar) {
                s.actionID = ar;
//                console.log(` - resultant action: ${ar}`);
            }
        }
    }
    d.gamedata = gamedata;
    return d;
};
const roundNum = (n) => {
    let r = n;
    if (n < 10) {
        r = '0' + n;
    }
    return r;
};
const getDayCode = (d) => {
    let dc = `${String(d.getFullYear()).substr(2)}${roundNum(d.getMonth() + 1)}${roundNum(d.getDate())}`;
    return dc;
};
const updateTimer = () => {
//    console.log('ut');
    let d = new Date();
    let t = `${getDayCode(d)} ${d.getHours()}:${d.getMinutes()}:${roundNum(d.getSeconds())}`;
    io.emit('onUpdateTimer', t);
};
const updatePlayersBasic = () => {
    for (var i in playersDetail) {
        playersBasic[i] = getBasicPlayerSummary(playersDetail[i]);
    }
};
const updatePlayersDetail = () => {
    let pd = playersDetail;
    sortPlayersDetail();
//    console.log(`~~~~~~~~~~~~~~~~~~~~  updatePlayersDetail (${Object.keys(pd).length} players)`);
    for (var i in pd) {
        pd[i].connected = playersMap.get(pd[i].socketID).connected;
    }
};
const updateSinglePlayerDetail = (id) => {
    // new player has connected, possibly after a server restart - check for stored update
    if (storedData) {
        let sp = storedData.p;
        id = id.replace(playerPrefix, '');
//        console.log(`updateSinglePlayerDetail: ${id}`);
    //    console.log(sp);
        if (sp) {
            if (sp.hasOwnProperty(id)) {
//                console.log('assigning object');
//                console.log(sp[id]);
                Object.assign(playersDetail[id], getDetailedPlayerSummary(sp[id], playersDetail[id]));
//                console.log(playersDetail[id]);
            } else {
//                console.log(`no player found with ID ${id}`);
            }
        }
    } else {
        console.log(`can't update ${id} because storedData has not been defined`)
    }
};
const getTeamFromNumber = (n) => {
//    console.log(gamedata);
    let t = null;
    if (gamedata.hasOwnProperty('mainTeams')) {
        t = gamedata.mainTeams[n];
    }
    return t;
};
const getTeamFromPlayer = (p) => {
    // return a team object based on a player, expressed as either a numeric or alphanumeric id or as an object
    let t = null;
    if (typeof(p) === 'number') {

    } else if (typeof(p) === 'string') {
        Object.values(gamedata.teams).forEach((tm) => {
            let obj = tm.team.reduce(function(acc, cur, i) {
              acc[cur] = i;
              return acc;
            }, {});
            if (obj.hasOwnProperty(p)) {
//                console.log(`team for ${p} found:`);
//                console.log(tm);
                t = tm;
            }

        });
    } else if (typeof(p) === 'object') {

    }
    return t;
};
const getTeamMembers = (id) => {
    let t = [];
//    console.log(`getTeamMembers: ${id}`);
    // return an array of players from a given team. Can be derived either from player ID (String) or team ID (Number)
    if (typeof (id) === 'number') {
        // Number, assume this is a team ID and return all members with matching team id.
        Object.entries(playersDetail).forEach((te, i) => {
            if (te[1].teamObj.hasOwnProperty('id')) {
                if (te[1].teamObj.id === id) {
                    t.push(te[1]);
                }
            }
//            console.log(te.length);
        })
    }
    if (typeof (id) === 'string') {
        // String, assume this is a player ID. Use the team object to access the team ID
        t = getPlayerFromID(id);
//        console.log(t.teamObj);
    }
    return t;
};
const getAllTeams = () => {
    // return teams with live data
//    console.log(`getAllTeams`);
    let p = playersDetail;
    let t = {};
    Object.values(p).forEach((pl) => {
        if (pl.teamObj) {
            t[`t${pl.teamObj.id}`] = pl.teamObj;
        }
    });
    t = Object.values(t);
    return t;
};
const getPlayerFromID = (id) => {
//    console.log(`getPlayerFromID: ${id}`);
    let pl = playersDetail[id];
    return pl;
};
const getSocketFromID = (id) => {
    let sock = null;
    sock = getPlayerFromID(id).socketID;
    sock = playersMap.get(sock);
    return sock;
};
const onPlayersUpdate = () => {
//    console.log(`emit the event`);
    io.emit('playersUpdate', playersDetail);
};
const setSessionID = () => {
    var d = new Date();
    sessionID = getDayCode(d) + (Math.floor(Math.random() * 900) + 100);
};
const getSessionID = () => {
    return sessionID;
};
const getSession = (cb) => {
    cb(session);
};
const setMaxVotes = (m) => {
//    console.log(`setMax ${m}`)
    io.emit('upateMaxVotes', m);
    let ts = gamedata.teams;
    for (var t in ts) {
        t.votes = m;
    }
};
const getCurrentEra = () => {
    // eras are discrete scoring sessions (e.g. 2030, 2040)
    // Initially only a single era is defined
    return 1;
};
const requestSession = (o) => {
//    if the session ID passed matches the session ID for the app, return the passed player id for verification, otherwise return false:
    let ro = {
        player: o.player,
        success: o.session === getSessionID(),
        sessionAssigned: session.assigned
    }
    onRequestSession(ro);
};
const sessionUpdate = () => {
    // emit an event in the case of any update to the session
    io.emit('sessionUpdate', session);
    console.log('emit sessionUpdate');
//    console.log('session');
//    console.log('session');
//    console.log(session);
    logSession();
};
const logSession = () => {
//    console.log(`logSession`);
    updateLogFile('session', session);
};
const allPlayersEnrolled = () => {
    let allIn = Object.keys(playersDetail).length > 0;
    for (var i in playersDetail) {
        if (!playersDetail[i].enrolled) {
            allIn = false;
            break;
        }
    }
    io.emit('enrollmentUpdate', {allIn: allIn, count: Object.keys(playersDetail).length});
    return allIn;
};
const onRequestSession = (o) => {
    let p = playersDetail[o.player.replace(playerPrefix, '')];
    if (p) {
        p.enrolled = o.success;
    }
    if (o.success) {
        updatePlayersBasic();
//        console.log(`success, what sbout the session?`);
//        console.log(session);
        if (session.assigned) {
//            console.log('session is already assigned, this one goes into the public voices group');
//            console.log(o);
            latecomer(o);
        }
    }
    o.allIn = allPlayersEnrolled();
    io.emit('onRequestSession', o);
};
const terminateSession = () => {
    sessionArchive.push({playersDetail: playersDetail});
    playersBasic = {};
    playersDetail = {};
    playersMap = new Map();
    socketMap = new Map();
    sessionID = null;
    session = null;
    updateApp();
    io.emit('terminateSession');
};
//
const getPresentationPack = (cb) => {
    presentationdata = processPresentationData(require('./data/presentationdata.json'));
    cb(presentationdata);
//    return presentationdata;
};
const updatePresentationPack = () => {
    presentationdata = processPresentationData(require('./data/presentationdata.json'));
//    console.log('UPP');
//    console.log(presentationdata);
    io.emit(`updatePresentationPack`, presentationdata);
//    return presentationdata;
};
const presentationSlideRendered = (o) => {
    // dev method = help to debug slide reset issue
    if (process.env.DEBUG) {
//        console.log(`presentationSlideRendered: ${JSON.stringify(o)}`);
    }
//    console.log(process.env.DEBUG);
};
//
const allocation1 = (o) => {
    // stakeholder lead has submitted an initial resource allocation
    // DEPRECATED METHOD
    /*
    let sc = session.getCurrentScores();
    let t = getTeamFromNumber(o.t);
    let pl = getPlayerFromID(o.src);
    io.emit('updateAllocation1', o);
    console.log('updateAllocation1');
    if (!sc.hasOwnProperty('allocations')) {
        sc.allocations = {};
    }
    sc.allocations[`team_${o.t}`] = o;
    t.votes -= o.resource;
    pl.teamObj.votes -= o.resource;
    let sco = {
        src: o.src,
        team: o.t,
        targ: o.t,
        v: o.resource
    }
    stStakeholderScore(sco);
    io.emit('scoreUpdate', sco);
    sessionUpdate();
    */
};
//
const pvStakeholderScoreFunk = (o) => {
    let sc = session.getCurrentScores();
    if (!sc.hasOwnProperty('pvVotes')) {
        sc.pvVotes = {
            list: [],
            summary: {}
        };
    }
    sc.pvVotes.list.push(o);
    let ob = Object.assign({}, sc.pvVotes);
    Object.values(gamedata.teams).forEach((p) => {
        if (p.hasMax) {
            ob.summary[`t-${p.id}`] = {};
        }
    });
    ob.list.forEach((v) => {
        if (!ob.summary[`t-${v.targ}`].hasOwnProperty(`v-${v.team}`)) {
            ob.summary[`t-${v.targ}`][`v-${v.team}`] = {a: [], t: 0, m: 0}
        }
        ob.summary[`t-${v.targ}`][`v-${v.team}`].a.push(v.v);
    });
    Object.values(ob.summary).forEach((a) => {
        Object.values(a).forEach((s) => {
            s.a.forEach((v) => {
                s.t += v;
            });
            // round to 2 DP
            s.m = Math.round((s.t / s.a.length) * 100) / 100;
        });
    });
    updateLogFile('theob', ob);
    updateLogFile('thesession', session);
    // Store the scores in the scoring player object
    let pl = getPlayerFromID(o.src);
    if (!pl.hasOwnProperty('scores')) {
        pl.scores = {};
    }
    let r = `r${session.getRound()}`;
    if (!pl.scores.hasOwnProperty(r)) {
        pl.scores[r] = [];
    }
    pl.scores[r].push({targ: o.targ, v: o.v});
    // Update the vote total in the scoring player
    pl.teamObj.votes -= Math.abs(o.v);
    console.log('this is the PV event, object:');
    console.log(o);
    io.emit('scoreUpdate', o);
    session.getCurrentScores().pvVotes = ob;
    sessionUpdate();
    return ob;
 };
const pvStakeholderScore = (o) => {
    let t = Object.values(gamedata.teams);
    if (session) {
        if (session.assigned) {
            if (t[o.targ].team) {
                // separate the conditional logic from the method, for clarity
                return pvStakeholderScoreFunk(o);
            }
        }
    }
};
const onShareState = (o) => {
//    console.log(`onShareState`);
//    console.log(o);
    getTeamFromPlayer(o.src).team.forEach((t) => {
//        console.log(t);
//        console.log(t.id);
        getSocketFromID(t).emit('shareStored', o.d);
    });
};
//
const stStakeholderScoreFunk = (o) => {
    let sc = session.getCurrentScores();
    console.log(`stStakeholderScoreFunk`);
    console.log(sc);
    if (!sc.hasOwnProperty('stakeholderVotes')) {
        sc.stakeholderVotes = {
            list: [],
            summary: {}
        };
    }
    sc.stakeholderVotes.list.push(o);
    let ob = Object.assign({}, sc.stakeholderVotes);
    Object.values(gamedata.teams).forEach((p) => {
        if (p.hasMax) {
            ob.summary[`t-${p.id}`] = {};
        }
    });
    ob.list.forEach((v) => {
        if (!ob.summary[`t-${v.targ}`].hasOwnProperty(`v-${v.team}`)) {
            console.log('SET TO ZERO');
            ob.summary[`t-${v.targ}`][`v-${v.team}`] = {a: [], t: 0}
        }
        ob.summary[`t-${v.targ}`][`v-${v.team}`].a.push(v.v);
    });
    Object.values(ob.summary).forEach((a) => {
        Object.values(a).forEach((s) => {
            s.a.forEach((v) => {
                s.t += v;
            });
        });
    });
    updateLogFile('thestob', ob);
    updateLogFile('thesession', session);
    // Store the scores in the scoring player object
    let pl = getPlayerFromID(o.src);
    if (!pl.hasOwnProperty('scores')) {
        pl.scores = {};
    }
    let r = `r${session.getRound()}`;
    if (!pl.scores.hasOwnProperty(r)) {
        pl.scores[r] = [];
    }
    pl.scores[r].push({targ: o.targ, v: o.v});
    // Update the vote total in the scoring player
    pl.teamObj.votes -= Math.abs(o.v);
    console.log('this is the ST event, object:');
    console.log(o);
    io.emit('scoreUpdate', o);
    session.getCurrentScores().stakeholderVotes = ob;
    console.log(session.getCurrentScores());
    return ob;
};
const stStakeholderScore = (o) => {
    console.log('first score!!');
    console.log(o);
    let t = Object.values(gamedata.teams);
    if (session) {
        if (session.assigned) {
            if (t[o.targ].team) {
                // separate the conditional logic from the method, for clarity
//                console.log('score!!');
//                console.log(o);
                return stStakeholderScoreFunk(o);
            }
        }
    }
};
//
const teamRoundComplete = (o) => {
    if (session) {
        if (session.getRound() > 0) {
            console.log(`teamRoundComplete, team: ${o.team}, round ${session.getRound()}`);
//            console.log(o);
            let tid = `t${o.team}`;
            if (!session.scores[`round${session.getRound()}`].hasOwnProperty(tid)) {
                session.scores[`round${session.getRound()}`][tid] = o;
            }
            let t = getTeamMembers(o.team);
            t.forEach((p, id) => {
                let r = `r${session.getRound()}`;
                let a = p.teamObj.rounds.length === 0 ? [] : p.teamObj.rounds.split(',');
                if (a.toString().indexOf(r) < 0) {
                    a.push(r);
                }
                p.teamObj.rounds = a.join(',');
            });
            onPlayersUpdate();
        }
    }
};
const roundIsComplete = () => {
//    console.log(`roundIsComplete ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    let d = gamedata;
    let s = session;
    let r = s.getRound();
    let t = d[d.rounds[r].teams];
    let c = s.scores[`round_${r}`];
    let ric = true;
    if ('hidethis') {
//    console.log(d.rounds[s.getRound()].type);
//    console.log(t);
    /*
    t.forEach((te) => {
        if (te.type === d.rounds[r].type) {
            // only include teams which match the current round type
//            consoleLog(`check team ${te.title}, ${te.rounds}, ${te.rounds.indexOf(`r${r}`)}`);
//            console.log(te);
            if (te.rounds.indexOf(`r${r}`) === 0) {
                ric = false;
//                console.log(`no round completion for ${te.title}`);
//                break;
            }
        }
    });
    */
    }
    t = getAllTeams();
    t.forEach((te) => {
        if (te.type === d.rounds[r].type) {
            if (te.rounds.indexOf(`r${r}`) === -1) {
                ric = false;
//                console.log(`no round completion for ${te.title}`);
            }
        }
    });
//    console.log(`roundIsComplete (r${r})? ${ric}`);
    return ric;
//    console.log(t.length, c.length);
//    return t.length === c.length;
};
const getRoundFromProp = (id) => {
    let rs = gamedata.rounds;
    let rr = null;
    rs.forEach((r, n) => {
        for (var i in r) {
            if (r[i] === id) {
                rr = n;
            }
        }
    });
    return rr;
};
const initRound = (id, cb) => {
    // method uses an identifier (e.g. flag) to select a round from the gamedata
    console.log(`initRound ${id}`);
    console.log(`has callback? ${Boolean(cb)}`);
    console.log(cb);
    let rr = getRoundFromProp(id);
    if (rr) {
        console.log(`starting round ${rr}`);
        startRound(rr);
    } else {
        console.log(`no round found for identifier ${id}`);
    }
    if (cb) {
        console.log(`callback retrieves method`)
        cb();
    }
    return rr;
};
const startRound = (r, cb) => {
    console.log(` - startRound: ${r}`)
    if (session) {
        let allowed = false;
        let rs = session.rounds;
        if (rs[r - 1]) {
            allowed = rs[r - 1].complete
        }
        if (allowed) {
            session.setRound(r);
            rs[r].current = true;
            rs[r - 1].current = false;
            io.emit('onStartRound', r);
            sessionUpdate();
        } else {
            io.emit('appError', {msg: `cannot start round ${r}, previous round incomplete`})
        }
    } else {
        io.emit('appError', {msg: `cannot start round ${r}, no session currently active`})
    }
    if (cb) {
        cb();
    }
};
const completeCurrentRound = () => {
    console.log(`*********************************************** completeCurrentRound: ${session.round}`);
    session.rounds[session.round].complete = true;
    session.rounds[session.round].current = false;
//    console.log(session.rounds);
    console.log('CALL THE SESSION UPDATE')
    sessionUpdate();
//    session.rounds[session.round].complete = true;
};
let scoreReport = {};
const applyScorePacket = (sp) => {
    let teamSrc = getTeamFromPlayer(sp.src);
    if (sp.targ === 0 && sp.round < 10) {
        scoreReport[sp.id] = JSON.stringify(sp).replace(/"/gm, '').replace(/,/gm, ', ');
        updateLogFile('scoreReport', scoreReport)
    }
    if (session) {
        if (!session.hasOwnProperty('scores')) {
            session.scores = {};
        }
        if (!session.scores.hasOwnProperty('raw')) {
            session.scores.raw = [];
        }
        if (!session.scores.hasOwnProperty(`round_${session.getRound()}`)) {
            session.scores[`round_${session.getRound()}`] = [];
        }
        session.scores.raw.push(sp);
        session.scores[`round_${session.getRound()}`].push(sp);
        if (sp.valID === 'vote') {
            // assign/subtract votes to src and targ separately
            let t = getTeamMembers(sp.targ);
                // if the SP is a multiplier then it is treated as a voteReceived for the src but as a multiplier for the targ
            let vType = sp.isMultiplier ? 'multiplier' : 'votesReceived';
            let vDef = sp.isMultiplier ? 1 : 0;
            let report = {};
            let ms = `${session.round}_${teamSrc.type}_${teamSrc.id}_${sp.val}`;
            t.forEach((te, id) => {
                ms = `${session.round}_${teamSrc.type}_${teamSrc.id}_${sp.val}_${id}`;
                let tob = te.teamObj;
                tob[vType] = tob.hasOwnProperty(vType) ? tob[vType] : vDef;
                tob[vType] += parseInt(sp.val);
                if (tob.hasOwnProperty('multiplier')) {
                    tob.total = tob.votesReceived * tob.multiplier;
                }
                tob.scores.eras[`era${getCurrentEra()}`].push(ms);
            });
            t = getTeamMembers(teamSrc.id);
            if (sp.roundComplete) {
                teamRoundComplete({team: getTeamFromPlayer(sp.src).id});
            }
            let pt = playersDetail[sp.src].teamObj.type;
            t.forEach((te, id) => {
                if (pt === 1 || pt === 2) {
                    // type one players have shared votes
                    te.teamObj.votes -= Math.abs(parseInt(sp.val));
                }
            });
        }
        // update the team members for targ
        Object.values(gamedata.teams)[sp.targ].team.forEach((p, i) => {
            getSocketFromID(p).emit('scoreUpdate', sp);
        });
        // update team members for src, if different to targ
        if (sp.targ !== teamSrc.id) {
            Object.values(gamedata.teams)[teamSrc.id].team.forEach((p, i) => {
                getSocketFromID(p).emit('scoreUpdate', sp);
            });
        }
        io.emit('roundUpdate', {
            round: session.getRound(),
            complete: roundIsComplete(),
            scorePacket: sp
        });
        sessionUpdate();
        statusUpdate(sp);
        onPlayersUpdate();
        updateLogFile('playersDetail', playersDetail, `applyScorePacket`);
    }
};
//
const rNum = (i) => {
    if (i < 10) {i = '0' + i};
    return i;
};
const getPlayerPack = (cb, sock) => {
    // return all available initial stuff to a newly connected player client
    let d = new Date();
    let o = {
        admin: admin,
        clean: clean,
        timer: `${rNum(d.getHours())}:${rNum(d.getMinutes())}:${rNum(d.getSeconds())}`,
        isDev: isDev,
        sessionID: isDev ? getSessionID() : Boolean(getSessionID()),
        session: session,
        playersBasic: playersBasic,
        playersDetail: playersDetail,
        storedData: storedData,
        gamedata: gamedata,
        process: process.env
    }
//    console.log(`returning the playerPack, admin: ${o.admin}`)
    if (cb) {
        cb(o);
    }
};
const getPlayer = (id, cb) => {
    // return just the player defined by id
//    console.log(`request to getPlayer ${id}`);
    let pl = getPlayerFromID(id);
//    console.log(pl)
    if (cb) {
        cb(pl);
    }
};
const getGameMin = (cb) => {
    // Prepare & return a minimal game summary for localStorage
//    console.log('request to getGameMin');
//    let o = {sid: sessionID, p: playersBasic};
    let s = {
        sid: sessionID,
        ass: false
    }
    if (session) {
        if (session.hasOwnProperty('assigned')) {
            if (session.assigned !== undefined) {
                s.ass = session.assigned;
            }
        }
    }
    let o = {
        s: s,
        p: playersBasic};
//    console.log(o);
    cb(o);
};
const valConvert = (v) => {
//    console.log(`IN ${v}`);
    if (v === 'null') {
        v = null;
    }
    if (!isNaN(parseInt(v))) {
        v = parseInt(v);
    }
    if (v === 'true') {
        v = true;
    }
    if (v === 'false') {
        v = false;
    }
//    console.log(`OUT ${v}`);
    return v;
};
const getBasicPlayerSummary = (plo) => {
    let s = '';
//    console.log(`get the player summary ${plo}`);
//    console.log(plo);
    s = `e${Number(plo.enrolled)},a${Number(plo.active)},s${plo.stakeholder}`;
//    console.log(`store string: ${s}`);
    return s;
};
const getDetailedPlayerSummary = (str, o) => {
//    console.log('oooooooooooooooooooooooooooooooooo')
    let c = {
        enrolled: 'e',
        active: 'a',
        stakeholder: 's'
    };
    let d = {
        e: null,
        a: null,
        s: null
    };
    str.replace(/ /gm, '').split(',').forEach((i) => {
        d[i.substr(0, 1)] = valConvert(i.substr(1));

    });
    for (var i in c) {
        let v = d[c[i]];

        if (!isNaN(parseInt(v)) && v.toString().length === 1 && c[i] !== 's') {
            // don't boolean if c[i] is 's' (stakeholder is an integer)
            v = Boolean(v);
        }
        if (c[i] === 's') {
//            console.log(i, c[i], v);
//            console.log(gamedata.teams);
//            console.log(Object.values(gamedata.teams));
//            console.log(Object.values(gamedata.teams)[c[i]]);
//            v = Object.values(gamedata.teams)[v].title;
        }
        c[i] = v;
    }
//    console.log(`getDetailedPlayerSummary: ${str}`);
//    console.log(c);
//    console.log(o);
    return c;
};
const sortPlayersDetail = () => {
    let d = playersDetail;
    let od = {};
    let i = null;
    for (i in d) {
        if (!d[i].hasOwnProperty('fake') || !d[i].fake) {
            od[i] = d[i];
        }
    }
    for (i in d) {
//        console.log(` - ${d[i].fake}`);
        if (d[i].fake) {
            od[i] = d[i];
        }
    }
//    writeLogFile('sortedPlayers', od);
    playersDetail = od;
};
const pingPlayer = (id) => {
    let pl = playersDetail[id];
    if (pl) {
        if (playersMap.has(pl.socketID)) {
            playersMap.get(pl.socketID).emit('ping');
        } else {
//            console.log(`playersMap has no element with key ${pl.socketID}`);
        }
    } else {
//        console.log(`no player with id ${id} in the playersDetail object`);
    }
};
const refreshPlayer = (id) => {
    let pl = playersDetail[id];
    if (pl) {
        if (playersMap.has(pl.socketID)) {
            playersMap.get(pl.socketID).emit('refresh');
//            io.emit('playersUpdate', playersDetail);
        } else {
//            console.log(`playersMap has no element with key ${pl.socketID}`);
        }
    } else {
//        console.log(`no player with id ${id} in the playersDetail object`);
    }
};
const removePlayer = (id) => {
    let pl = playersDetail[id];
    if (pl) {
        if (playersMap.has(pl.socketID)) {
            playersMap.get(pl.socketID).emit('evict');
            playersMap.delete(pl.socketID);
            if (playersDetail.hasOwnProperty(id)) {
                delete playersDetail[id];
            }
            if (playersBasic.hasOwnProperty(id)) {
                playersBasic[id]
            }
            io.emit('playersUpdate', playersDetail);
        } else {
//            console.log(`playersMap has no element with key ${pl.socketID}`);
        }
    } else {
//        console.log(`no player with id ${id} in the playersDetail object`);
    }
};
const makeTeamLead = (id) => {
//    console.log(`make ${id} the team leader`);
    let pd = playersDetail;
    let tm = gamedata.teams;
    if (tm) {
        if (pd) {
            getTeamFromPlayer(id).team.forEach((t) => {
                playersDetail[t].isLead = t === id;
                refreshPlayer(t);
            });
            io.emit('playersUpdate', playersDetail);
        }
    } else {

    }
};
const addNewPlayer = (o, socket, callback) => {
    let id = o.id;
    id = id.replace(gamedata.prefixes.player, '');
    let pl = new Player(id, socket);
    if (o.fake) {
        pl.fake = true;
    } else {
        pl.fake = false;
    }
    if (!playersBasic.hasOwnProperty(id)) {
        playersBasic[id] = getBasicPlayerSummary(pl);
    }
    if (!playersDetail.hasOwnProperty(id)) {
        playersDetail[id] = pl;
        updateSinglePlayerDetail(id);
        playersMap.set(socket.id, socket);
    } else {
        if (playersDetail[id].socketID !== socket.id) {
//            console.log(`yep, it's a socket update, change the socketID and update the map`);
            playersMap.delete(playersDetail[id].socketID);
            playersDetail[id].socketID = socket.id;
            playersMap.set(socket.id, socket);
        }
    }
    io.emit('onAddNewPlayer', playersBasic);
    allPlayersEnrolled();
    if (callback) {
        if (typeof (callback) === 'function') {
            callback({
                player: pl,
                playersBasic: playersBasic
//                    master: master,
//                    session: getSession(),
//                    gamedata: gamedata
            })
        }
    }
};
const getFakePlayers = (cb) => {
    // dev method; return an object containing all player objects with a 'fake=true' property
    let p = playersDetail;
    let rp = {};
    Object.entries(p).forEach(([k, v]) => {
//        console.log(k);
//        console.log(v);
        if (v.fake) {
            rp[k] = Object.assign({}, v);
        }
    });
    cb(rp);
};
const addFakePlayers = () => {
    // dev method: stored data has fake players but the players have not been added
    if (isDev) {
        console.log(`let's do it`);
        let sp = storedData;
        if (sp) {
            sp = storedData.p
            let n = 0;
            for (var i in sp)  {
                if (i.substr(0, 1) === 'f') {
                    n++;

                }
            }
            io.emit('getFakePlayers', n);
        }
    }
};
const startSession = () => {
//    console.log(`startSession called`);
//    console.log(session);
    if (session === null) {
//        if (!session.active) {
        let sid = getSessionID();
        app.get(`/sustain${getSessionID()}`, (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'player.html'));
        });
        io.emit('newSession', {sid: sid});
        console.log(`Hey, it's a new session, that's awesome`);
        session = new Session(sid);
        session.active = true;
        session.setEra(getCurrentEra());
        session.rounds = Object.assign({}, gamedata.rounds);
        Object.values(session.rounds).forEach((r, id) => {
            session.rounds[id].current = id === 0;
            session.rounds[id].complete = id === 0;
        });
        updateApp();
        sessionUpdate();
//        io.emit('sessionUpdate', session);
//            setInterval(updateTimer, 1000);
//        }
    } else {
//        console.log(`session already in progress, can't start another`);
    }
};
const startNewSession = (cb) => {
    setSessionID();
//    console.log(`startNewSession calls startSession`);
    startSession();
    if (cb) {
//        console.log(`and the callback`);
        cb();
    }
};
const setAdmin = (boo) => {
//    console.log(`set admin to ${boo} ${typeof(boo)}`);
    admin = boo;
};
const resetAdmin = (pw, id) => {
//    console.log(`request to reset, ${pw}, ${pw === getPassword('ADMIN')}`);
    if (pw === getPassword('ADMIN')) {
        setAdmin(false);
        let cs = connectedSockets;
        for (var i in cs) {
            if (cs[i].hasOwnProperty(`customData`)) {
                if (cs[i].customData.hasOwnProperty(`activeAdmin`)) {
                    cs[i].customData.activeAdmin = false;
//                    console.log(cs[i].customData);
//                    console.log(cs[i].id === id);
                    cs[i].emit('test');
//                    console.log('a denial a denial');
                    cs[i].emit(cs[i].id === id ? 'takeover' : 'denialOfRegistration');

                }
            }
        }
    }
};
const processStoredGame = (d) => {
    storedData = d;
//    console.log('PROCESS-STORED-GAME');
    if (typeof(d) === 'string') {
            d = JSON.parse(d);
    }
    if (d.hasOwnProperty('sid')) {
        if (d.sid) {
            sessionID = d.sid;
//            console.log(`processStoredGame calls startSession`);
            startSession();
        }
    }
    if (d.p) {
        updatePlayersDetail();
        for (var i in d.p) {
//            console.log(` - ${i}`);
            if (playersDetail.hasOwnProperty(i)) {
                // Combine the playersDetail object with the stored data for the given player
                let det = getDetailedPlayerSummary(d.p[i], playersDetail[i]);
                Object.assign(playersDetail[i], det);

//                console.log(` - ${playersDetail[i]}`);
            }
        }
    }
    if (Object.keys(playersDetail).length > 0) {
//        console.log(`${Object.keys(playersDetail).length} playerDetail obejct(s) updated`);
    } else {
//        console.log('No playerDetail obejcts updated');
    }
    playersBasic = Object.assign({}, d.p);
    io.emit('onStoredGameFound');
//    writeLogFile('playersDetailUpdated', playersDetail, 'this is the playersDetail object after being updated with data retrieved from localStorage')
};
const pageTypeAdded = (s) => {
    let t = null;
    let cs = connectedSockets;
    if (s.hasOwnProperty('customData')) {
        if (s.customData.hasOwnProperty('role')) {
            r = s.customData.role;
            if (r === 'admin') {
//                console.log(`s.customData.activeAdmin: ${s.customData.activeAdmin} (${typeof(s.customData.activeAdmin)})`);
                if (s.customData.activeAdmin !== false) {
                    for (var i in cs) {
                        if (cs[i].hasOwnProperty('customData')) {
                            if (cs[i].customData.hasOwnProperty('role')) {
                                // do not compare if self or if socket is not the active admin:
                                if ((cs[i].id !== s.id) && cs[i].customData.activeAdmin !== false && cs[i].customData.role === 'admin') {
//                                    console.log('this is the denial');
//                                    console.log(s.id);
//                                    console.log(cs[i].id);
//                                    console.log(cs[i].customData);
                                    s.emit('denialOfRegistration');
                                }
                            }
                        }
                    }
                } else {
//                    console.log('this is just the duplicate admin registering it is not cool');
                }
            }
        }
    }
//    console.log(`socketTypeAdded :${r}`);
};
const getGameData = (cb) => {
    cb(gamedata);
};
const sortWeight = (a, b) => {
    // sort an array of teams according to the weighting factor
    let r = 0;

    if (a[1].weight > b[1].weight) {
        r = -1;
    }
    if (a[1].weight < b[1].weight) {
        r = 1;
    }
//    console.log(a[1].weight, b[1].weight, r);
    return r;
};
const sortFake = (a, b) => {
    // sort IDs depending on whether they are fakes, i.e. have an 'f' prefix
    // (fakes at the end)
    let r = 0;
    if (a.substr(0, 1) === 'f') {
        r = 1;
    }
    if (b.substr(0, 1) === 'f') {
        r = -1;
    }
//    console.log(r);
    return r;
};
const sortRandom = (a, b) => {
    const r = Math.ceil((Math.random() * 3) - 2);
//    console.log(r);
    return r;
};
const previewDistribution = (tin) => {
    console.log(`########################previewDistribution`);
    let c = 0;
    let d = [];
    let t = JSON.parse(JSON.stringify(tin));
    t = Object.entries(t);
    t.sort(sortRandom);
    t.sort(sortRandom);
    t.sort(sortRandom);
    t.sort(sortWeight);
    t.forEach(([k, v]) => {
        c += v.weight;
        for (var j = 0; j < v.weight; j++) {
            d.push({id: k, n: v.id, t: []});
        }
    });
    let p = Object.keys(playersDetail);
    p.sort(sortRandom);
    p.sort(sortRandom);
    p.sort(sortRandom);
//    console.log(p);
    while (p.length > 0) {
        d.forEach((dt) => {
            if (p.length > 0) {
                let cp = p.pop();
                dt.t.push(cp);
            }
        });

    };
//    console.log(d);
    t = JSON.parse(JSON.stringify(tin));
//    console.log(t);
//    Object.keys(t).forEach();
    d.forEach((te) => {
        let team = te.id;
        console.log(t[team].title);
        if (t[te.id]) {
//            console.log(`team found in gamedata with id ${te.id}`);
            if (!t[te.id].hasOwnProperty('team')) {
                t[te.id].team = te.t;
            } else {

                // - here is a problem: the array is cocatenated each time the method runs
                // - solve by using an obect instead?

                let a = t[te.id].team.reduce((acc, id) => {
                    acc[id] = {};
                    return acc;
                }, {});
//                console.log(`a:`);
//                console.log(a);
                let b = te.t;
//                console.log('b:');
//                console.log(b);
                if (b) {
                    b = te.t.reduce((acc, id) => {
                        acc[id] = {};
                        return acc;
                    }, {});
                }
                console.log(a);
                console.log(b);
                a = Object.assign(a, b);
//                console.log(`a final:`);
                console.log(a);

//                t[te.id].team = t[te.id].team.concat(te.t);
                t[te.id].team = Object.keys(a);
                console.log(`team has ${Object.keys(a).length} members`);
            }
            t[te.id].teamSize = t[te.id].team.length
        }
    });
//    console.log(t);
//    console.log(playersDetail);
    return t;
};
const previewTeams = (cb) => {
//    console.log('previewTeams');
    let teams = {};
    let d = gamedata;
    if (d.hasOwnProperty('teams')) {
        d = d.teams;
    } else {
        d = d[d.definitions['teams']];
    }
    teams = previewDistribution(d);
    cb(teams);
};
const getTeamMax = () => {
    let d = gamedata;
    let tm = Object.keys(d.teams);
    let p = Object.keys(playersDetail);
    let max = tm.length;
    if (d.settings) {
        if (d.settings.teamMax) {
            max = d.settings.teamMax;
        }
    }
//    console.log(`${max} before`);
    while ((max * tm.length) > p.length) {
        max--;
    }
//    console.log(`${max} after`);
    return max;
};
const copyObj = (o) => {
    return JSON.parse(JSON.stringify(o));
};
const latecomer = (o) => {
    // someone has joined an active session, assign them to one of the public voices teams
    let p = playersDetail;
    let t = Object.assign({}, gamedata.teams);
    let tn = {};
    let pid = o.player.replace(playerPrefix, '');
//    console.log('adding a latecomer to the public voices team with the least members');
    for (var i in t) {
        if (!t[i].hasMax) {
            tn[i] = t[i];
        }
    }
    let min = 999;
    for (var i in tn) {
        if (tn[i].team.length < min) {
            min = tn[i].team.length;
            // NOTE: reusing t
            t = tn[i];
        }
    }
    playersDetail[pid].stakeholder = t.id;
    playersDetail[pid].teamObj = Object.assign(copyObj(t), {});
    updatePlayersBasic();
    t.team.push(pid);
};
const assignTeams = (cb) => {
    console.log(`assignTeams --------------------- GO`);
    let d = gamedata;
    let teams = d.teams;
    let max = getTeamMax();
    let p = Object.keys(playersDetail);
    let t = 0;
    Object.values(teams).forEach((v) => {
        v.team = [];
        if (v.hasMax) {
            t++
        }
    });
    if (t === 0) {
        t = 1;
    }
    let top = max * t;
    if (top > p.length) {
        top = p.length;
    }
    let tc = Object.keys(JSON.parse(JSON.stringify(teams)));
    p.sort(sortRandom);
    p.sort(sortRandom);
    p.sort(sortRandom);
    p.sort(sortFake);
    for (var i = 0; i < (max * Object.keys(teams).length); i++) {
        let tn = p.shift();
        if (tn) {
            Object.values(teams)[i%Object.keys(teams).length].team.push(tn);
        }
    }
    while (p.length > 0) {
        Object.values(teams).forEach((v) => {
            if (!v.hasMax) {
                if (p.length > 0) {
                    let tn = p.shift();
                    v.team.push(tn);
                }
            }
        });
    }
    Object.entries(gamedata.teams).forEach(([k, v]) => {
        v.team.forEach((p, i) => {
            let pl = playersDetail[p];
            if (pl) {
                if (pl.active && pl.enrolled) {
//                    if (v.hasLead) {
                        pl.isLead = i === 0;
//                    }
                    pl.stakeholder = v.id;
                    pl.teamObj = Object.assign(copyObj(v), {});
                    if (pl.teamObj.type === 2) {
                        pl.votes = pl.teamObj.votes
                    }
                    let sock = playersMap.get(pl.socketID);
                    sock.emit('onAssignTeams', k);
                }
            } else {
                console.log(`${p} not defined in playersDetail`);
            }
        });
    });
    updatePlayersBasic();
    if (session){
        session.setAssigned(true);
    }
    completeCurrentRound();
    updateLogFile('gamedata', gamedata);
    updateLogFile('playersDetail', playersDetail);
    if (cb) {
        cb(gamedata.teams);
    }
};
const e1r1 = () => {
    console.log('oooooooooooooooo aaaaaaaaaaaaaaaaaaaaaaaaah')
};

// Presentation code
const nextSlide = () => {
//    console.log.('nextSlide');
    io.emit('nextSlide');
    io.emit('slideUpdate');
};
const previousSlide = () => {
    io.emit('previousSlide');
    io.emit('slideUpdate');
};
const reloadSlide = () => {
    io.emit('reloadSlide');
    io.emit('slideUpdate');
};
const gotoSlide = (s) => {
//    console.log(`gotoSlide ${s}`);
    io.emit('gotoSlide', s);
    io.emit('slideUpdate');
};
const setCurrentSlide = (s) => {
//    let sl =
};

const initApp = () => {
    consoleLog('~ ~ ~ ~ ~ ~ ~ ~');
    consoleLog('~ ~ ~ ~ ~ ~ ~ ~');
    consoleLog('~ ~ ~ ~ ~ ~ ~ ~ initApp');
    gamedata = processGameData(require('./data/gamedata.json'));
    presentationdata = processPresentationData(require('./data/presentationdata.json'));
//    console.log(gamedata);
//    console.log(presentationdata);
    clearLogs();
    io.emit('serverStartup');
//    initSession();
};
const exitApp = () => {
    // This is called when the server shuts down & should not be explicitly called from within the app
    console.log('SHUTDOWNSHUTDOWNSHUTDOWNSHUTDOWNSHUTDOWN');
    io.emit('serverShutdown');
    getPlayerPack(function (o) {
        io.emit('updateFull', o);
    })
    clearLogs();
};

io.on('connection', (socket) => {
    connectedSockets[socket.id] = socket;
    socket.on('customDataEvent', (customData) => {
        socket.customData = customData;
//        console.log(`socket connected with role ${socket.customData.role} ${socket.id}`);
        pageTypeAdded(socket);
//        pageTypeAdded(socket.customData.role);


//        if () {}
    });
    socket.on('addNewPlayer', (o, callback) => {
//        console.log('addNewPlayer event heard');
        addNewPlayer(o, socket, callback);
    });
    socket.on('getBasicPlayers', (cb) => {
        cb(playersBasic);
    });
    socket.on('getFakePlayers', (cb) => {
        getFakePlayers(cb);
    });
    socket.on('getPlayersDetail', (cb) => {
        updatePlayersDetail();
//        writeLogFile('thedetailasrequested', playersDetail);
        cb(playersDetail);
    });
    socket.on('getGameData', (cb) => {
        if (cb) {
            cb(gamedata);
        }
    });
    socket.on('startNewSession', (cb) => {
//        var s = startNewSession();
        startNewSession(cb);
//        io.emit('onNewSession', {session: s, gamedata: gamedata, players: playersObj});
    });
    socket.on('areWeDev', (cb) => {
        cb(isDev);
    });
    socket.on('toggleDevMode', (cb) => {
        isDev = !isDev;
        cb(isDev);
    });
    socket.on('getPlayerPack', (cb) => {
//        console.log('call to getPlayerPack');
        getPlayerPack(cb, socket);
    });
    socket.on('getPlayer', (id, cb) => {
        getPlayer(id, cb);
    });
    socket.on('getTeams', (cb) => {
        cb(getAllTeams());
    });
    socket.on('getScoreMap', (cb) => {
        // returns a mapping array for translating score strings
        cb(scoreMap.slice());
    });
    socket.on('updateSession', () => {
//        console.log('onUpdateSession');
        io.emit('onUpdateSession');
    });
    socket.on('getSession', (cb) => {
        getSession(cb);
    });
    socket.on('requestSession', (id) => {
//        console.log(`request session with ID ${id}`);
        requestSession(id);
    });
    socket.on('adminTerminateSession', () => {
        terminateSession();
    });
    socket.on('setMaxVotes', (m) => {
        setMaxVotes(m);
    });
    socket.on('getPlayerIDs', (cb) => {
        cb(playersBasic);
    });
    socket.on('getGameMin', (cb) => {
        getGameMin(cb);
    });
    socket.on('storedGameFound', (d) => {
//        console.log('storedGame FOUND');
        processStoredGame(d);
    });
    socket.on('storedGameUpdated', (d) => {
//        console.log('storedGame UPDATED');
        processStoredGame(d);

    });
    socket.on('playerPing', (id) => {
        pingPlayer(id);
    });
    socket.on('refreshPlayer', (id) => {
//        console.log(`I want to refresh stuff`);
        refreshPlayer(id);
    });
    socket.on('makeTeamLead', (id) => {
        makeTeamLead(id);
    });
    socket.on('removePlayer', (id) => {
        removePlayer(id);
    });
    socket.on('disconnect', () => {
        delete connectedSockets[socket.id];
        // Find the player with the corresponding socket.id in the 'players' map
        let disconnectedPlayer = null;
        for (const [playerId, player] of playersMap.entries()) {
            if (player.id === socket.id) {
                disconnectedPlayer = player;
                break;
            }
        }
        if (disconnectedPlayer) {
            if (disconnectedPlayer.hasOwnProperty('customData')) {
                if (disconnectedPlayer.customData.hasOwnProperty('id')) {
                    // Perform any actions required for the disconnected player
                    playersDetail[disconnectedPlayer.customData.id].handleDisconnect();
                    onPlayersUpdate();
                } else {
//                    console.log('customData found but has no ID property');
                }
            } else {
//                console.log('no customData found');
            }
        } else {
//            console.log('no player found for disconnect');
        }
//        console.log(`disconnect: ${disconnectedPlayer}`);

        // if the disconnect comes from an admin screen, set admin to false
        if (socket.customData) {
            let cd = socket.customData;
//            console.log(cd);
            if (cd.role) {
                if (cd.role === 'admin') {
                    if (cd.activeAdmin) {
                        setAdmin(false);
                    }
                }
            }
        }
    });
    socket.on('getConnectedAdmins', (cb) => {
        let cs = connectedSockets;
        let ca = [];
//        cs = Object.values(cs);
        Object.values(cs).forEach((s) => {
//            consoleLog(s.customData)
            if (s.customData) {
//                console.log('#######################');
//                console.log(s.customData);
                if (s.customData.role === 'admin') {
                    ca.push(s.customData);
                    console.log(s.id);
                }
            }
        })
//        consoleLog(ca);
//        console.log(Object.keys(cs).length);
        if (cb) {
            cb(ca);
        }
//        return cs;
    });
    socket.on('requestGameData', (cb) => {
        getGameData(cb);
    });
    socket.on('previewTeams', (cb) => {
        previewTeams(cb);
    });
    socket.on('assignTeams', (cb) => {
//        console.log(`the assignTeams socket event`);
        assignTeams(cb);
    });
    socket.on('testEvent', (msg) => {
        console.log(`testEvent: ${msg}`);
    });
    socket.on('setAdmin', (boo) => {
        setAdmin(boo);
    });
    socket.on('resetAdminV2', (pw, cb) => {
        console.log(`request to reset, ${pw}, ${pw === getPassword('ADMIN')}`);
        if (pw === getPassword('ADMIN')) {
            setAdmin(false);
            cb();
        }
    });
    socket.on('resetAdmin', (pw, id) => {
        resetAdmin(pw, id);
    });
    socket.on('requestLogin', (type, pw, cb) => {
        if (cb) {
            let pws = getPassword(type);
            cb(pw === pws);
        }
    })
    //
    /*
    // DEPRECATED
    socket.on('allocation1', (o) => {
        allocation1(o);
    });
    */
    socket.on('pvStakeholderScore', (o) => {
        pvStakeholderScore(o);
    });
    socket.on('stStakeholderScore', (o) => {
        stStakeholderScore(o);
    });
    socket.on('startRound', (r, cb) => {
        startRound(r, cb);
    });
    socket.on('initRound', (id, cb) => {
        // initRound differs from startRound in that it takes an ID arg which specifies the round to initialise (via gamedata)
        initRound(id, cb);
    });
    socket.on('teamRoundComplete', (o) => {
//        console.log(`teamRoundComplete event`);
//        console.log(o);
        teamRoundComplete(o);
    });
    socket.on('setClean', (boo) => {
        clean = boo;
    });
    socket.on('getNewScorePacket', (src, targ, valID, val, cb) => {
//        console.log(cb);
        getNewScorePacket(cb, src, targ, val, valID);
    });
    socket.on('getNewScorePacket2', (o) => {
//        console.log(cb);
        getNewScorePacket2(o);
    });
    socket.on('shareState', (o) => {
        onShareState(o);
    });
    //
    socket.on('getPresentationPack', (cb) => {
        getPresentationPack(cb);
    });
    socket.on('slideNext', nextSlide);
    socket.on('slidePrevious', previousSlide);
    socket.on('slideReload', reloadSlide);
    socket.on('gotoSlide', gotoSlide);
    socket.on('setCurrentSlide', setCurrentSlide);
    socket.on('presentationSlideRendered', presentationSlideRendered);
    //
    socket.on('clientDebug', (str) => {
        console.log(`client: ${str}`);
//        console.log(o.obj);
    });
    socket.on('statusUpdate', (m, cb) => {
        statusUpdate(m, cb);
    });
    socket.on('getStatusMessages', (cb) => {
        cb(statusMessages);
    });


});

// Code to run when the server app shuts down:
process.on('exit', () => {
    exitApp();
});
process.on('SIGINT', () => {
    exitApp();
});
process.on('SIGTERM', () => {
    exitApp();
});
process.on('SIGUSR2', () => {
    // should be called on restart, but doesn't seem to work
    console.log('RESYTARTRRTRRTRTSRT');
});


// Serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// All other routes will serve the 'default.html' file
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'default.html'));
});
app.get('/superuser', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'superuser.html'));
});
app.get('/admin', (req, res) => {
//    res.render('admin');
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.get('/player', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'player.html'));
});
app.get('/godmode', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'godmode.html'));
});
app.get('/presentation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'presentation.html'));
});
app.get('/playersBasic', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'playersBasic.html'));
});
app.get('/gamedata', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gamedata.html'));
});
app.get('/session', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'session.html'));
});
app.get('/status', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'status.html'));
});
app.get('/test', (req, res) => {
    const d = {title: 'awesome', answer: 'Oh hell yes'};
    res.render('test', d);
});
app.get('/test2', (req, res) => {
    const d = {title: 'awesome', answer: 'Oh hell yes'};
    res.render('test', d);
});
app.get('/download-session', (req, res) => {
    console.log('go down the route');
    let ob = session;
    if (!ob) {
        res.render('sessionno');
        return;
    }
    const csvWriterInstance = csvWriter({
//        path: ob,
        path: '',
        header: [
            { id: 'name', title: 'Name' },
            { id: 'score', title: 'Score' },
        ],
    });
    console.log('this bit done');
    console.log(ob);
    csvWriterInstance.writeRecords(ob)
        .then(() => {
            res.download(ob, (err) => {

                if (err) {
                    console.error('Error sending CSV:', err);
                }
                // Delete the CSV file after sending
                fs.unlinkSync(ob);
            });
        })
        .catch((error) => {
            console.error('Error writing CSV:', error);
            res.status(500).send('Internal Server Error - route not found');
        });
});
app.get('/download-csv', (req, res) => {
    console.log('go down the route');
    const csvWriterInstance = csvWriter({
        path: gameDataOut,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'score', title: 'Score' },
        ],
    });

    csvWriterInstance.writeRecords(data)
        .then(() => {
            res.download(gameDataOut, (err) => {
                if (err) {
                    console.error('Error sending CSV:', err);
                }
                // Delete the CSV file after sending
                fs.unlinkSync(gameDataOut);
            });
        })
        .catch((error) => {
            console.error('Error writing CSV:', error);
            res.status(500).send('Internal Server Error - route not found');
        });
});
app.get('/newlogin', (req, res) => {
    const d = {
        value: isDev ? getSessionID : 123456
    }
    res.render('newlogin', d); // Render the login template
});
app.get('/game', (req, res) => {
    res.render('game'); // Render the game template
});
app.get('/fakes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'fakeplayers.html'));
});

// Route to serve the Handlebars templates
app.get('/templates/:templateName', (req, res) => {
  const templateName = req.params.templateName;
  res.render(`${templateName}`);
});

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'default.html'));
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    initApp();
});
