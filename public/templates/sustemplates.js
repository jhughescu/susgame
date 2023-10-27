(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['admin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"playersBasic"),depth0,{"name":"playersBasic","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Master</title>\n    <script src=\"https://code.jquery.com/jquery-3.7.0.js\" integrity=\"sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=\" crossorigin=\"anonymous\"></script>\n        <script src=\"/socket.io/socket.io.js\"></script>\n<!--    <script src=\"https://cdn.socket.io/4.5.4/socket.io.min.js\"></script>-->\n    <link rel='stylesheet' href='css/basics.css'>\n    <link rel='stylesheet' href='css/master.css'>\n</head>\n\n<body>\n    <h1>Master "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"me") || (depth0 != null ? lookupProperty(depth0,"me") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"me","hash":{},"data":data,"loc":{"start":{"line":16,"column":15},"end":{"line":16,"column":21}}}) : helper)))
    + "</h1>\n    <p>This is the master client, it listens for player connections</p>\n    <p id='message'></p>\n    <button id='startSession'>Start Session</button>\n    <button id='endSession'>End Session</button>\n    <div id='players'></div>\n\n    <div>\n        <div id='controlPaanel'>\n            "
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,(depth0 != null ? lookupProperty(depth0,"playersBasic") : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":12},"end":{"line":25,"column":60}}})) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n\n\n    <script>\n        const socket = io();\n        const PINGBTN = `pingbtn-`;\n        const RESETBTN = `resetbtn-`;\n\n        socket.on('connect', () => {\n            socket.emit('nowIAmTheMaster');\n        });\n        socket.on('onPlayerConnect', (msg) => {\n            onPlayerConnect(msg);\n        });\n        socket.on('onGetPlayers', (msg) => {\n//            console.log('I hear onGetPlayers')\n            onGetPlayers(msg);\n        });\n        socket.on('onGetPlayerIDs', (msg) => {\n//            console.log('I hear onGetPlayerIDs')\n            onGetPlayerIDs(msg);\n        });\n        socket.on('updatePlayers', (arr) => {\n//            console.log('I hear updatePlayers')\n            onGetPlayerIDs(arr);\n        });\n        socket.on('newPlayer', (players) => {\n            newPlayer(players);\n        });\n        const buttonSetup = () => {\n            let b = document.getElementsByClassName('pingBtn');\n            [...b].forEach((bu) => {\n                bu.addEventListener('click', (evt) => {\n                    let id = evt.target.id.replace(PINGBTN, '');\n                    socket.emit('playerPing', id);\n                });\n            });\n            b = document.getElementsByClassName('resetBtn');\n            [...b].forEach((bu) => {\n                bu.addEventListener('click', (evt) => {\n                    let id = evt.target.id.replace(RESETBTN, '');\n                    socket.emit('playerReset', id);\n                });\n            });\n        };\n        let ssb = document.getElementById('startSession');\n        ssb.addEventListener('click', (evt) => {\n            console.log('cow');\n            socket.emit('startNewSession', function (s) {\n                console.log('mooooooooooooooooooooo');\n            });\n        });\n        let esb = document.getElementById('endSession');\n        esb.addEventListener('click', (evt) => {\n            socket.emit('adminTerminateSession');\n        });\n        const playerDisplay = (p, i) => {\n            var e = document.getElementById('players');\n            var s = '';\n            s += `<div class='${p.active ? 'active' : 'inactive'}'>${p.id} <button class=\"pingBtn\" id=\"${PINGBTN}${p.id}\">Ping</button>`;\n            s += `<button class=\"resetBtn\" id=\"${RESETBTN}${p.id}\">Reset</button></div>`;\n            e.innerHTML += s;\n        };\n        const clearPlayers = () => {\n            document.getElementById('players').innerHTML = ``;\n        };\n        const onPlayerConnect = (msg) => {\n            document.getElementById('message').innerHTML += `<p>player ${msg} has connected</p>`;\n        };\n        const onGetPlayers = (arr) => {\n//            console.log('onGetPlayers');\n//            console.log(arr);\n            clearPlayers();\n            document.getElementById('players').innerHTML = '<b>players:</b>';\n            for (var i = 0; i < arr.length; i++) {\n                playerDisplay(arr[i], i);\n//                console.log(players);\n//                console.log(arr[i]);\n            }\n            buttonSetup();\n        };\n        const onGetPlayerIDsOld = (arr) => {\n            console.log('onGetPlayerIDs');\n            console.log(arr);\n            clearPlayers();\n            document.getElementById('players').innerHTML = '<b>players:</b>';\n            for (var i = 0; i < arr.length; i++) {\n                playerDisplay(arr[i], i);\n//                console.log(players);\n                console.log(arr[i]);\n            }\n            buttonSetup();\n        };\n        const newPlayer = (id) => {\n            socket.emit('getPlayerIDs');\n        };\n        const updateSession = () => {\n            socket.emit('updateSession');\n        };\n        window.updateSession = updateSession;\n        socket.emit('getPlayerIDs');\n//        socket.emit('getPlayers');\n\n    </script>\n</body>\n\n</html>\n";
},"usePartial":true,"useData":true});
templates['game'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id='game'>\n    <!--    <p>This is the player client, it requires a master before it can init</p>    -->\n    <p id='stakeholder'></p>\n    <p id='playerID'>PlayerID: "
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":37}}}) : helper)))
    + "</p>\n    <p id='team'>Team: <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"stakeholder") || (depth0 != null ? lookupProperty(depth0,"stakeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stakeholder","hash":{},"data":data,"loc":{"start":{"line":5,"column":29},"end":{"line":5,"column":44}}}) : helper)))
    + "</span></p>\n    <p id='gameTimer'>timer:</p>\n    <p id='active'></p>\n    <p id='message'></p>\n    <div id='activity'>\n    "
    + alias4((lookupProperty(helpers,"playerPartial")||(depth0 && lookupProperty(depth0,"playerPartial"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"partialName") : depth0),(depth0 != null ? lookupProperty(depth0,"ob") : depth0),{"name":"playerPartial","hash":{},"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":10,"column":36}}}))
    + "\n    </div>\n</div>\n";
},"useData":true});
templates['intro'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "Welcome to the sustainability game. There is currently no active session, please wait here.\n";
},"useData":true});
templates['kickedout'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "Sorry, you have been removed from the player list. But don't worry, you can rejoin by refreshing the page.\n";
},"useData":true});
templates['newlogin'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id='login'>\n    <p>If you have a session ID you can enter it here to join the session</p>\n    <input type='text' id='seshnum' placeholder='enter code...' value='"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data,"loc":{"start":{"line":3,"column":71},"end":{"line":3,"column":80}}}) : helper)))
    + "' oninput='validate'><button id='enter'>Join session</button>\n</div>\n<script>\n    validate = (inp) => {\n        inp.value = inp.value.replace(/[^0-9]/g, '');\n    };\n    requestSession = () => {\n        let o = {session: txt.val().replace(/ /gm, ''), player: staticID};\n//        console.log('request session:');\n//        console.log(o);\n        socket.emit('requestSession', o);\n    };\n    butt = $('#enter');\n    txt = $('#seshnum');\n    butt.on('click', () => {\n        requestSession();\n    });\n    txt.on('keydown', (ev) => {\n        if (ev.keyCode === '13') {\n            requestSession();\n        }\n    });\n    txt.focus();\n    if (getInitProps().autoenroll) {\n        console.log('auto enroll this');\n        let d = 1000 + (Math.random() * 2000);\n        d = 100;\n//        setTimeout(requestSession, d);\n        requestSession();\n    }\n</script>\n";
},"useData":true});
templates['outtro'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "Thank you for participating, the session has now ended. Please close this browser window to exit.\n";
},"useData":true});
templates['playerList'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <tr>\n        <td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":18}}}) : helper)))
    + "</td>\n        <td class='"
    + alias4(((helper = (helper = lookupProperty(helpers,"connected") || (depth0 != null ? lookupProperty(depth0,"connected") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"connected","hash":{},"data":data,"loc":{"start":{"line":9,"column":19},"end":{"line":9,"column":32}}}) : helper)))
    + "'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"connected") || (depth0 != null ? lookupProperty(depth0,"connected") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"connected","hash":{},"data":data,"loc":{"start":{"line":9,"column":34},"end":{"line":9,"column":47}}}) : helper)))
    + "</td>\n        <td class='"
    + alias4(((helper = (helper = lookupProperty(helpers,"enrolled") || (depth0 != null ? lookupProperty(depth0,"enrolled") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"enrolled","hash":{},"data":data,"loc":{"start":{"line":10,"column":19},"end":{"line":10,"column":31}}}) : helper)))
    + "'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"enrolled") || (depth0 != null ? lookupProperty(depth0,"enrolled") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"enrolled","hash":{},"data":data,"loc":{"start":{"line":10,"column":33},"end":{"line":10,"column":45}}}) : helper)))
    + "</td>\n        <td class='"
    + alias4(((helper = (helper = lookupProperty(helpers,"assigned") || (depth0 != null ? lookupProperty(depth0,"assigned") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"assigned","hash":{},"data":data,"loc":{"start":{"line":11,"column":19},"end":{"line":11,"column":31}}}) : helper)))
    + "'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"stakeholder") || (depth0 != null ? lookupProperty(depth0,"stakeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stakeholder","hash":{},"data":data,"loc":{"start":{"line":11,"column":33},"end":{"line":11,"column":48}}}) : helper)))
    + "</td>\n        <td><button class='pingBtn' id='pingbtn-"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":12,"column":48},"end":{"line":12,"column":54}}}) : helper)))
    + "'>ping</button>\n        <button class='refreshBtn' id='refreshbtn-"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":13,"column":50},"end":{"line":13,"column":56}}}) : helper)))
    + "'>refresh</button>\n        <button class='removeBtn' id='removebtn-"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":14,"column":48},"end":{"line":14,"column":54}}}) : helper)))
    + "'>remove</button></td>\n        </tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n\n<table id='playerList'>\n    <tbody>\n        <tr><th>player</th><th>connected</th><th>enrolled</th><th>team</th><th></th></tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"players") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":16,"column":17}}})) != null ? stack1 : "")
    + "    </tbody>\n</table>\n";
},"useData":true});
templates['playersBasic'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<p>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "list of player IDs\nThat's insane\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ids") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":5,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['playlist'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <tr class='"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isCurrent") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":15},"end":{"line":4,"column":48}}})) != null ? stack1 : "")
    + "'>\r\n    <td><div class='slideIcon "
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":5,"column":30},"end":{"line":5,"column":38}}}) : helper)))
    + "'></div></td><td><div class='slideLink' id='slideLink_"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":5,"column":92},"end":{"line":5,"column":101}}}) : helper)))
    + "'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":103},"end":{"line":5,"column":112}}}) : helper)))
    + "</div></td>\r\n    </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "highlight";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "list of slides:\r\n<table><tbody>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"slideList") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":7,"column":13}}})) != null ? stack1 : "")
    + "</tbody></table>";
},"useData":true});
templates['scores'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <tr><td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":6,"column":16},"end":{"line":6,"column":25}}}) : helper)))
    + "</td><td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"stVote") || (depth0 != null ? lookupProperty(depth0,"stVote") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stVote","hash":{},"data":data,"loc":{"start":{"line":6,"column":34},"end":{"line":6,"column":44}}}) : helper)))
    + "</td><td>"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"pv1") : depth0)) != null ? lookupProperty(stack1,"m") : stack1), depth0))
    + "</td><td>"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"pv2") : depth0)) != null ? lookupProperty(stack1,"m") : stack1), depth0))
    + "</td><td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"pvTotal") || (depth0 != null ? lookupProperty(depth0,"pvTotal") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pvTotal","hash":{},"data":data,"loc":{"start":{"line":6,"column":89},"end":{"line":6,"column":100}}}) : helper)))
    + "</td><td class='highlight'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"mult") || (depth0 != null ? lookupProperty(depth0,"mult") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mult","hash":{},"data":data,"loc":{"start":{"line":6,"column":127},"end":{"line":6,"column":135}}}) : helper)))
    + "</td></tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id='scoreSummary'>\n    <div>Score summary:</div>\n    <table><tbody>\n        <tr><th>Stakeholder</th><th>Player<br>resources</th><th>PV 1<br>mean</th><th>PV 2<br>mean</th><th>PV total</th><th>PR x PV</th></tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"teams") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":7,"column":17}}})) != null ? stack1 : "")
    + "    </tbody></table>\n</div>\n";
},"useData":true});
templates['serverlost'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='wrapper'>\n    server connection lost, please wait\n</div>\n";
},"useData":true});
templates['session'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['teamview'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":17}}}) : helper)))
    + "</h3>\n    "
    + alias4(((helper = (helper = lookupProperty(helpers,"teamSize") || (depth0 != null ? lookupProperty(depth0,"teamSize") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"teamSize","hash":{},"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":4,"column":16}}}) : helper)))
    + " members\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id='teamlist'>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"team") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":5,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['layouts/backup'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!DOCTYPE html>\n<html>\n\n<head>\n    <title>Default HB template</title>\n</head>\n\n<body>\n    <h3>Oh no</h3>\n    <p>Looks like you are trying use a Handlebars template which doesn't exist. This is the backup template.</p>\n</body>\n\n</html>\n";
},"useData":true});
templates['partials/playersBasic'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Wow ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "list of player IDs\nThat's insane\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ids") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":3,"column":26}}})) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['partials/publicvoices'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<tr><td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":35},"end":{"line":6,"column":41}}}) : helper)))
    + "</td><td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":6,"column":50},"end":{"line":6,"column":59}}}) : helper)))
    + "</td><td><input class='voteVal' id='voteVal_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":103},"end":{"line":6,"column":109}}}) : helper)))
    + "' style='width: 40px;' oninput='validateVote(this)' type='number' value='0'><button class='buttonVote' id='buttonVote_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":227},"end":{"line":6,"column":233}}}) : helper)))
    + "'>Submit</button></td></tr>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p>OK, I am a Public Voices thing</p>\n<div>Votes remaining: <span id='votes' class='highlight'>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"teamObj") : depth0)) != null ? lookupProperty(stack1,"votes") : stack1), depth0))
    + "</span></div>\n<table>\n    <tbody>\n        <tr><td><b>id</b></td><td><b>title</b></td><td></td></tr>\n        "
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"mainTeams") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":269}}})) != null ? stack1 : "")
    + "\n    </tbody>\n</table>\n\n<script>\n    setupPV();\n</script>\n";
},"useData":true});
templates['partials/stactions'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['partials/stakeholder'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Lead";
},"3":function(container,depth0,helpers,partials,data) {
    return "Member";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='round' id='collaboration'>\n    <div>Votes remaining: <span id='votes' class='highlight'>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"teamObj") : depth0)) != null ? lookupProperty(stack1,"votes") : stack1), depth0))
    + "</span></div>\n    <table><tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"mainTeams") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":10,"column":17}}})) != null ? stack1 : "")
    + "    </tbody></table>\n</div>\n\n<div class='round' id='allocation'>\n    <select id='actionSelect'>\n    <option value=''>Select an option...</option>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"actions") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":4},"end":{"line":19,"column":13}}})) != null ? stack1 : "")
    + "    </select>\n    <br>\n    Assign a value: <input class='allocateVal' id='allocateVal' style='width: 40px;' oninput='validateVote(this)' type='number' value='0'>\n    <button class='buttonAllocate' id='buttonAllocate'>Submit</button>\n</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isMyTeam") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":9,"column":15}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <tr><td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":8,"column":22}}}) : helper)))
    + "</td><td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":8,"column":31},"end":{"line":8,"column":40}}}) : helper)))
    + "</td><td><input class='voteVal' id='voteVal_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":8,"column":84},"end":{"line":8,"column":90}}}) : helper)))
    + "' style='width: 40px;' oninput='validateVote(this)' type='number' value='0'><button class='buttonVote' id='buttonVote_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":8,"column":208},"end":{"line":8,"column":214}}}) : helper)))
    + "'>Submit</button></td></tr>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <option value='"
    + alias2(alias1(depth0, depth0))
    + "'>"
    + alias2(alias1(depth0, depth0))
    + "</option>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p>Role: Stakeholder Team "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLead") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":26},"end":{"line":1,"column":65}}})) != null ? stack1 : "")
    + "</p>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLead") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":25,"column":7}}})) != null ? stack1 : "")
    + "\n<script>\n    setupStakeholder();\n</script>\n";
},"useData":true});
templates['partials/unassigned'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "Oh no, I am NOT ASSIGNED\n";
},"useData":true});
templates['slides/fullscreen1'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='fullscreen1'></div>";
},"useData":true});
templates['slides/slide_010_intro'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='wrapper intro'>\r\n    <div id='circle-wrapper'>\r\n        <div class='circle' id='circle-fill'></div>\r\n    </div>\r\n    <div id='header'>\r\n        <p>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"header") || (depth0 != null ? lookupProperty(depth0,"header") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"header","hash":{},"data":data,"loc":{"start":{"line":6,"column":11},"end":{"line":6,"column":21}}}) : helper)))
    + "</p>\r\n    </div>\r\n    <div class=\"container intro\">\r\n        <div class=\"box top-box\">admin</div>\r\n        <div class=\"box bottom-box\">play</div>\r\n    </div>\r\n</div>";
},"useData":true});
templates['slides/slide_020_entry'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "enter code "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"code") || (depth0 != null ? lookupProperty(depth0,"code") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"code","hash":{},"data":data,"loc":{"start":{"line":3,"column":72},"end":{"line":3,"column":80}}}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "<i>(no current session)</i>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container entry\">\r\n    <div class=\"box top-box blank wide\">go to "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":2,"column":46},"end":{"line":2,"column":53}}}) : helper)))
    + "</div>\r\n    <div class=\"box bottom-box blank wide\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasSession") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":43},"end":{"line":3,"column":122}}})) != null ? stack1 : "")
    + "</div>\r\n</div>";
},"useData":true});
templates['slides/video'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='wrapper video'>\r\n    <div id='vidDiv'>\r\n        <iframe id='vidFrame' src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":3,"column":35},"end":{"line":3,"column":42}}}) : helper)))
    + "\" style=\"border: 0px;\" allowfullscreen allow=\"autoplay\" title='"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":105},"end":{"line":3,"column":114}}}) : helper)))
    + "' aria-label=\"Panopto Embedded Video Player\"></iframe>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n";
},"useData":true});
})();
