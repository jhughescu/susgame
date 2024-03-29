(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['slide_010_intro'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='wrapper intro'>\r\n    <div id='circle-wrapper'>\r\n        <div class='circle' id='circle-fill'></div>\r\n    </div>\r\n    <div id='header'>\r\n        <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"header") || (depth0 != null ? lookupProperty(depth0,"header") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"header","hash":{},"data":data,"loc":{"start":{"line":6,"column":11},"end":{"line":6,"column":21}}}) : helper)))
    + "</p>\r\n    </div>\r\n    <div class=\"container intro "
    + alias4(((helper = (helper = lookupProperty(helpers,"viewtype") || (depth0 != null ? lookupProperty(depth0,"viewtype") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"viewtype","hash":{},"data":data,"loc":{"start":{"line":8,"column":32},"end":{"line":8,"column":44}}}) : helper)))
    + "\">\r\n    Welcome, the session will begin shortly\n    </div>\r\n</div>\r\n";
},"useData":true});
templates['slide_010_outro'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='wrapper intro'>\n    <div id='circle-wrapper'>\n        <div class='circle' id='circle-fill'></div>\n    </div>\n    <div id='header'>\n        <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"header") || (depth0 != null ? lookupProperty(depth0,"header") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"header","hash":{},"data":data,"loc":{"start":{"line":6,"column":11},"end":{"line":6,"column":21}}}) : helper)))
    + "</p>\n    </div>\n    <div class=\"container intro "
    + alias4(((helper = (helper = lookupProperty(helpers,"viewtype") || (depth0 != null ? lookupProperty(depth0,"viewtype") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"viewtype","hash":{},"data":data,"loc":{"start":{"line":8,"column":32},"end":{"line":8,"column":44}}}) : helper)))
    + "\">\n    Thank you for participating\n    </div>\n</div>\n";
},"useData":true});
templates['slide_020_entry'] = template({"1":function(container,depth0,helpers,partials,data) {
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
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container entry "
    + alias4(((helper = (helper = lookupProperty(helpers,"viewtype") || (depth0 != null ? lookupProperty(depth0,"viewtype") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"viewtype","hash":{},"data":data,"loc":{"start":{"line":1,"column":28},"end":{"line":1,"column":40}}}) : helper)))
    + "\">\n    <div class=\"box top-box blank wide\">go to "
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":2,"column":46},"end":{"line":2,"column":53}}}) : helper)))
    + "</div>\n    <div class=\"box bottom-box blank wide\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasSession") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":43},"end":{"line":3,"column":122}}})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});
templates['slide_110_stakeholders'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"frame1full"),depth0,{"name":"frame1full","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class='container'>\n    <div class=\"grid-container1\">\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card"),(depth0 != null ? lookupProperty(depth0,"card_0") : depth0),{"name":"stakeholder_card","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card"),(depth0 != null ? lookupProperty(depth0,"card_1") : depth0),{"name":"stakeholder_card","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card"),(depth0 != null ? lookupProperty(depth0,"card_2") : depth0),{"name":"stakeholder_card","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"grid-container2\">\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card"),(depth0 != null ? lookupProperty(depth0,"card_3") : depth0),{"name":"stakeholder_card","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card"),(depth0 != null ? lookupProperty(depth0,"card_4") : depth0),{"name":"stakeholder_card","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['slide_210_checkdevice'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"frame1full"),depth0,{"name":"frame1full","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class='container'>\n    <div class='centered check'>\n    CHECK YOUR DEVICE\n    </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['slide_230_stakeholderscollab'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"frame1full"),depth0,{"name":"frame1full","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class='container'>\n    <div class=\"grid-container1\">\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card2"),(depth0 != null ? lookupProperty(depth0,"card_0") : depth0),{"name":"stakeholder_card2","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card2"),(depth0 != null ? lookupProperty(depth0,"card_1") : depth0),{"name":"stakeholder_card2","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card2"),(depth0 != null ? lookupProperty(depth0,"card_2") : depth0),{"name":"stakeholder_card2","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"grid-container2\">\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card2"),(depth0 != null ? lookupProperty(depth0,"card_3") : depth0),{"name":"stakeholder_card2","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"cell\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"stakeholder_card2"),(depth0 != null ? lookupProperty(depth0,"card_4") : depth0),{"name":"stakeholder_card2","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['video'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='wrapper video' style='overflow: hidden;'>\n    <div id='vidDiv'>\n        <iframe id='vidFrame' src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":3,"column":35},"end":{"line":3,"column":42}}}) : helper)))
    + "\" style=\"border: 0px; overflow: hidden;\" allowfullscreen allow=\"autoplay\" title='"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":123},"end":{"line":3,"column":132}}}) : helper)))
    + "' aria-label=\"Panopto Embedded Video Player\"></iframe>\n    </div>\n</div>\n\n\n\n\n";
},"useData":true});
templates['slide_partials/frame1'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='wrapper intro'>\n    <div class=\"container frame1top\">\n    </div>\n    <div class=\"container frame1bottom\">\n    </div>\n</div>\n";
},"useData":true});
templates['slide_partials/frame1full'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n    <div class=\"frame1full\">\n    </div>\n";
},"useData":true});
templates['slide_partials/fullscreen1'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='fullscreen1'></div>\n";
},"useData":true});
templates['slide_partials/fullscreen2'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"frame2\">\n    <div class=\"framecorner top-left\"></div>\n    <div class=\"top\"></div>\n    <div class=\"framecorner top-right\"></div>\n    <div class=\"left\"></div>\n    <div class=\"center\"></div>\n    <div class=\"right\"></div>\n    <div class=\"framecorner bottom-left\"></div>\n    <div class=\"bottom\"></div>\n    <div class=\"framecorner bottom-right\"></div>\n</div>\n";
},"useData":true});
templates['slide_partials/stakeholder_card'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='stakeholder_card' id='stakeholder_card_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":51},"end":{"line":1,"column":57}}}) : helper)))
    + "'>\n    <div class='textarea'>\n        <div class='vertical-center'>\n            <div class='header'>\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":5,"column":25}}}) : helper)))
    + "\n            </div>\n        </div>\n        <div class='text action_name'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"action_name") || (depth0 != null ? lookupProperty(depth0,"action_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"action_name","hash":{},"data":data,"loc":{"start":{"line":8,"column":38},"end":{"line":8,"column":53}}}) : helper)))
    + "</div>\n        <div class='text action_desc'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"action_desc") || (depth0 != null ? lookupProperty(depth0,"action_desc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"action_desc","hash":{},"data":data,"loc":{"start":{"line":9,"column":38},"end":{"line":9,"column":53}}}) : helper)))
    + "</div>\n        <div class='text vote'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"vote") || (depth0 != null ? lookupProperty(depth0,"vote") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"vote","hash":{},"data":data,"loc":{"start":{"line":10,"column":31},"end":{"line":10,"column":39}}}) : helper)))
    + "</div>\n    </div>\n    <div class='background'>\n        <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <svg class='card_bg' data-name='card_bg_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":14,"column":48},"end":{"line":14,"column":54}}}) : helper)))
    + "' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 503.54 398.18\">\n          <defs>\n            <style>\n                .cls-1-"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":17,"column":23},"end":{"line":17,"column":29}}}) : helper)))
    + " {\n                  fill: "
    + alias4(((helper = (helper = lookupProperty(helpers,"displayColour") || (depth0 != null ? lookupProperty(depth0,"displayColour") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayColour","hash":{},"data":data,"loc":{"start":{"line":18,"column":24},"end":{"line":18,"column":41}}}) : helper)))
    + ";\n              }\n\n                .cls-1-"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":21,"column":23},"end":{"line":21,"column":29}}}) : helper)))
    + ", .cls-2, .cls-3 {\n                stroke-width: 0px;\n              }\n\n              .cls-4 {\n                font-size: 38.14px;\n              }\n\n              .cls-4, .cls-5, .cls-6 {\n                font-family: ArialMT, Arial;\n              }\n\n              .cls-4, .cls-5, .cls-6, .cls-2, .cls-7 {\n                fill: #fff;\n              }\n\n              .cls-5 {\n                font-size: 24.95px;\n              }\n\n              .cls-8 {\n                fill: #5b7936;\n                stroke-width: 1.42px;\n              }\n\n              .cls-8, .cls-9 {\n                stroke: #fff;\n                stroke-linecap: round;\n                stroke-miterlimit: 10;\n              }\n\n              .cls-6 {\n                font-size: 19.96px;\n              }\n\n              .cls-9 {\n                fill: none;\n                stroke-width: 1.7px;\n              }\n\n              .cls-7 {\n                font-family: Arial-BoldMT, Arial;\n                font-size: 29.94px;\n                font-weight: 700;\n              }\n\n              .cls-3 {\n                fill: #80d2e7;\n              }\n\n              .cls-10 {\n                letter-spacing: -.07em;\n              }\n            </style>\n          </defs>\n          <polygon class=\"cls-1-"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":76,"column":32},"end":{"line":76,"column":38}}}) : helper)))
    + "\" points=\"497.34 118.71 3.08 118.71 3.08 1.93 485.34 .93 503.34 18.84 503.34 57.79 497.34 62.99 497.34 118.71\"/>\n          <path class=\"cls-3\" d=\"m503.34,394.99H214.78l-4.66-6.8h-123.31l-4.66,6.8H.19V.19h484.85l18.31,18.26v40.33l-5.65,4.65v305.12l5.65,4.65v21.79Zm-287.81-1.41h286.4v-19.72l-5.65-4.65V62.77l5.65-4.65V19.04l-17.48-17.43H1.61v391.98h79.8l4.66-6.8h124.8l4.66,6.8Z\"/>\n          <g>\n            <path class=\"cls-2\" d=\"m104.53,66.84c0-2.09-.02-4.18-.06-6.27-.01-.51.06-.94.5-1.27.15-.11.26-.29.37-.45,1.24-1.66,1.96-3.55,2.43-5.55.21-.86.35-1.73.53-2.61.94.2,1.47-.3,1.84-1.06.17-.35.32-.72.38-1.1.15-.91.3-1.83.36-2.75.08-1.22.15-2.45.11-3.67-.04-1.05-.34-1.31-1.33-1.57.15-1.23.31-2.46.44-3.69.18-1.78.37-3.56.05-5.34-.63-3.49-2.27-6.37-5.27-8.33-2.62-1.72-5.45-2.62-8.47-2.65v-.63c3.11.03,6.08.95,8.82,2.75,2.98,1.96,4.85,4.9,5.54,8.75.34,1.88.15,3.73-.04,5.52-.09.86-.19,1.73-.3,2.57-.03.2-.05.4-.07.6.8.3,1.23.8,1.27,2,.04,1.26-.03,2.54-.11,3.73-.07.99-.23,1.98-.37,2.82-.08.49-.28.93-.44,1.27-.52,1.08-1.24,1.42-1.89,1.46-.02.09-.04.18-.05.27-.11.59-.23,1.21-.37,1.81-.57,2.38-1.37,4.22-2.54,5.78l-.07.09c-.11.15-.24.34-.44.49-.17.13-.25.26-.24.74.03,1.85.05,3.82.06,6.2l2.53,1.12c1.9.84,3.85,1.71,5.78,2.55,1.78.77,3.69,1.57,5.68,2.04.29.07.59.12.91.17.38.07.78.13,1.18.24,5.76,1.56,9.74,4.61,12.15,9.34,1.47,2.88,2.4,6.07,2.75,9.49.07.64.14,1.29.14,1.95,0,.26-.01.52-.04.78-.16,1.65-1.19,2.67-2.91,2.88-.44.05-.87.08-1.3.08h-35.64v-.64c11.88,0,23.76,0,35.64,0,.41,0,.81-.03,1.22-.08,1.37-.17,2.22-.93,2.35-2.31.08-.86-.01-1.74-.1-2.61-.34-3.25-1.2-6.35-2.69-9.26-2.49-4.86-6.59-7.62-11.75-9.02-.68-.18-1.39-.25-2.07-.41-2-.48-3.9-1.27-5.78-2.08-2.78-1.2-5.54-2.44-8.31-3.67-.23-.1-.38-.2-.38-.51Z\"/>\n            <path class=\"cls-2\" d=\"m104.76,58.59s.06-.07.08-.11c1.06-1.42,1.8-3.11,2.32-5.32.14-.57.25-1.15.36-1.75.05-.28.11-.56.16-.84l.13-.64.64.14c.45.09.77.01,1.12-.71.12-.24.27-.6.33-.93.14-.81.29-1.75.35-2.68.08-1.16.15-2.4.11-3.6-.03-.71-.07-.77-.85-.97l-.54-.14.07-.56c.04-.38.09-.76.14-1.13.1-.84.21-1.7.29-2.54.17-1.7.36-3.46.05-5.16-.63-3.49-2.31-6.15-4.99-7.91-2.53-1.66-5.26-2.52-8.12-2.54v-.64c3.02.03,5.85.93,8.47,2.65,2.99,1.96,4.63,4.84,5.27,8.33.32,1.78.14,3.56-.05,5.34-.13,1.23-.29,2.46-.44,3.69,1,.25,1.3.51,1.33,1.57.04,1.22-.02,2.45-.11,3.67-.06.92-.21,1.84-.36,2.75-.06.38-.22.76-.38,1.1-.36.76-.9,1.27-1.84,1.06-.17.88-.32,1.75-.53,2.61-.47,2-1.19,3.89-2.43,5.55-.12.16-.22.34-.37.45-.44.33-.51.76-.5,1.27.04,2.09.06,4.18.06,6.27,0,.3.16.41.38.51,2.77,1.22,5.53,2.46,8.31,3.67,1.88.81,3.78,1.6,5.78,2.08.68.16,1.4.23,2.07.41,5.15,1.4,9.26,4.15,11.75,9.02,1.49,2.92,2.35,6.01,2.69,9.26.09.87.18,1.75.1,2.61-.13,1.37-.98,2.14-2.35,2.31-.41.05-.81.08-1.22.08-11.87,0-23.76,0-35.64,0v-.64h35.64c.37,0,.75-.03,1.14-.07,1.11-.14,1.69-.71,1.79-1.74.08-.8-.01-1.65-.1-2.48-.34-3.26-1.22-6.3-2.62-9.03-2.24-4.39-5.96-7.23-11.35-8.69-.34-.09-.69-.15-1.06-.22-.32-.06-.66-.12-.99-.19-2.09-.5-4.05-1.32-5.89-2.11-1.94-.84-3.9-1.71-5.79-2.55l-2.53-1.12c-.18-.08-.76-.34-.76-1.09,0-2.41-.03-4.39-.06-6.25-.01-.6.07-1.29.76-1.79.04-.03.11-.13.16-.2Z\"/>\n            <path class=\"cls-2\" d=\"m96.42,96.15v.64h-.64V20.56c.22,0,.43-.01.64-.01v75.6Z\"/>\n            <path class=\"cls-2\" d=\"m96.42,19.9v.02c-.22-.01-.43,0-.65,0l.65-.02Z\"/>\n            <path class=\"cls-2\" d=\"m95.77,19.92c.22,0,.43-.01.65,0v.63c-.22,0-.43,0-.64.01v76.23h.64v.64h-1.28V19.95c.21-.02.41-.03.62-.03h.02Z\"/>\n            <path class=\"cls-2\" d=\"m95.14,19.94l.62-.02c-.21,0-.41.02-.62.03h0Z\"/>\n            <path class=\"cls-2\" d=\"m77.42,72.23c-1.63.71-3.55,1.49-5.61,1.76-1.42.18-2.83.6-4.43,1.3-2.97,1.3-5.24,3.14-6.93,5.62-1.49,2.2-2.55,4.71-3.22,7.67-.48,2.12-.71,3.87-.68,5.5.01,1.06.54,1.71,1.59,1.92.41.09.88.13,1.38.13,11.87,0,23.75,0,35.62,0v1.28c-11.87,0-23.74,0-35.62,0-.59,0-1.15-.05-1.65-.15-1.64-.34-2.59-1.49-2.61-3.16-.02-1.74.21-3.59.72-5.81.71-3.12,1.83-5.77,3.41-8.1,1.83-2.69,4.27-4.68,7.47-6.08,1.72-.75,3.24-1.19,4.78-1.39,1.89-.25,3.71-.99,5.27-1.67,2-.87,4.03-1.78,5.99-2.65,1.16-.52,2.33-1.04,3.49-1.55v-.05c.01-1.3.02-2.6.04-3.9.01-.92.02-1.84.03-2.76-1.32-1.35-2.26-3.08-2.95-5.44-.23-.8-.39-1.61-.55-2.4-.06-.3-.12-.6-.18-.9-.58-.02-1.22-.28-1.73-1.1-.47-.76-.74-1.65-.84-2.81-.15-1.65-.26-3.11-.33-4.46-.03-.51.06-1.01.14-1.44.16-.81.53-1.28,1.21-1.5l-.03-.22c-.08-.6-.16-1.22-.21-1.84-.03-.39-.06-.78-.09-1.17-.11-1.31-.22-2.66-.18-4,.07-2.49,1.02-4.81,2.92-7.11,2.59-3.13,6.02-5.03,10.18-5.65.24-.04.47-.06,1.33-.15v1.28c-.38.03-.76.07-1.14.13-1.92.28-3.67.86-5.24,1.73-1.56.87-2.95,2.02-4.14,3.47-1.71,2.06-2.57,4.13-2.63,6.32-.04,1.28.07,2.59.18,3.87l.09,1.18c.04.59.12,1.19.2,1.77.04.27.07.55.11.82l.08.65-.66.06c-.56.05-.63.15-.72.6-.07.35-.14.76-.12,1.12.07,1.34.18,2.78.33,4.43.08.95.29,1.66.66,2.25.32.51.62.56,1.01.47l.64-.15.16.8c.02.09.03.17.05.25.07.35.14.71.22,1.06.15.76.31,1.55.52,2.29.64,2.19,1.5,3.76,2.7,4.96.28.28.31.68.31.84-.01.92-.02,1.84-.03,2.77-.02,1.29-.03,2.59-.04,3.89,0,.22,0,.88-.75,1.21-1.17.51-2.33,1.03-3.49,1.55-1.96.88-4,1.79-6,2.66Z\"/>\n          </g>\n          <text class=\"cls-5\" transform=\"translate(157.87 176.03)\"><tspan x=\"0\" y=\"0\"></tspan></text>\n          <text class=\"cls-7\" transform=\"translate(208.56 74.99)\"><tspan class=\"cls-10\" x=\"0\" y=\"0\"></tspan></text>\n          <text class=\"cls-6\" transform=\"translate(85.82 206.25)\"><tspan x=\"0\" y=\"0\"></tspan></text>\n          <text class=\"cls-4\" transform=\"translate(271.03 354.88)\"><tspan x=\"0\" y=\"0\"></tspan></text>\n          <g>\n            <line class=\"cls-9\" x1=\"236.27\" y1=\"358.46\" x2=\"236.27\" y2=\"341.52\"/>\n            <path class=\"cls-8\" d=\"m211.36,327.68h16.09c4.67,0,8.47,3.8,8.47,8.47v5.93h-16.09c-4.67,0-8.47-3.8-8.47-8.47v-5.93h0Z\" transform=\"translate(447.29 669.76) rotate(180)\"/>\n            <path class=\"cls-8\" d=\"m245.85,327.68h15.04v4.88c0,5.25-4.27,9.52-9.52,9.52h-15.04v-4.88c0-5.25,4.27-9.52,9.52-9.52Z\"/>\n          </g>\n        </svg>\n    </div>\n</div>\n";
},"useData":true});
templates['slide_partials/stakeholder_card2'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='stakeholder_card' id='stakeholder_card_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":51},"end":{"line":1,"column":57}}}) : helper)))
    + "'>\n    <div class='textarea'>\n        <div class='vertical-center'>\n            <div class='header'>\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":5,"column":25}}}) : helper)))
    + "\n            </div>\n        </div>\n        <div class='scorebox' id='st"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":8,"column":36},"end":{"line":8,"column":42}}}) : helper)))
    + "_v1'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox' id='st"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":9,"column":36},"end":{"line":9,"column":42}}}) : helper)))
    + "_v2'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox' id='st"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":10,"column":36},"end":{"line":10,"column":42}}}) : helper)))
    + "_v3'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox' id='st"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":11,"column":36},"end":{"line":11,"column":42}}}) : helper)))
    + "_v4'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox' id='st"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":12,"column":36},"end":{"line":12,"column":42}}}) : helper)))
    + "_v5'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox' id='pv"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":13,"column":36},"end":{"line":13,"column":42}}}) : helper)))
    + "_v1'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox' id='pv"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":14,"column":36},"end":{"line":14,"column":42}}}) : helper)))
    + "_v2'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox subtotal' id='st"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":15,"column":45},"end":{"line":15,"column":51}}}) : helper)))
    + "_vtotal'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox subtotal' id='pv"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":16,"column":45},"end":{"line":16,"column":51}}}) : helper)))
    + "_vtotal'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n        <div class='scorebox total' id='score"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":17,"column":45},"end":{"line":17,"column":51}}}) : helper)))
    + "'><span class='scoreboxsrc'></span><span class='scoreboxval'></span></div>\n    </div>\n</div>\n";
},"useData":true});
})();
