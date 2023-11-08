(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['slide_010_intro'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
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
    + "\">\n        <div class=\"box top-box\">admin</div>\n        <div class=\"box bottom-box\">play</div>\n    </div>\n</div>\n";
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
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!--"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"fullscreen2"),depth0,{"name":"fullscreen2","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "-->\r\n<!--"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"frame1"),depth0,{"name":"frame1","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "-->\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"frame1full"),depth0,{"name":"frame1full","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<!--\r\n<div class='wrapper intro'>\r\n    <div class=\"container "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"viewtype") || (depth0 != null ? lookupProperty(depth0,"viewtype") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"viewtype","hash":{},"data":data,"loc":{"start":{"line":6,"column":26},"end":{"line":6,"column":38}}}) : helper)))
    + "\">\r\n    </div>\r\n</div>\r\n-->\r\n";
},"usePartial":true,"useData":true});
templates['video'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='wrapper video'>\n    <div id='vidDiv'>\n        <iframe id='vidFrame' src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":3,"column":35},"end":{"line":3,"column":42}}}) : helper)))
    + "\" style=\"border: 0px;\" allowfullscreen allow=\"autoplay\" title='"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":105},"end":{"line":3,"column":114}}}) : helper)))
    + "' aria-label=\"Panopto Embedded Video Player\"></iframe>\n    </div>\n</div>\n\n\n\n\n";
},"useData":true});
templates['slide_partials/frame1'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='wrapper intro'>\r\n    <div class=\"container frame1top\">\r\n    </div>\r\n    <div class=\"container frame1bottom\">\r\n    </div>\r\n</div>";
},"useData":true});
templates['slide_partials/frame1full'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='wrapper intro'>\r\n    <div class=\"container frame1full\">\r\n    </div>\r\n</div>";
},"useData":true});
templates['slide_partials/fullscreen1'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class='fullscreen1'></div>\n";
},"useData":true});
templates['slide_partials/fullscreen2'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"frame2\">\r\n    <div class=\"framecorner top-left\"></div>\r\n    <div class=\"top\"></div>\r\n    <div class=\"framecorner top-right\"></div>\r\n    <div class=\"left\"></div>\r\n    <div class=\"center\"></div>\r\n    <div class=\"right\"></div>\r\n    <div class=\"framecorner bottom-left\"></div>\r\n    <div class=\"bottom\"></div>\r\n    <div class=\"framecorner bottom-right\"></div>\r\n</div>";
},"useData":true});
})();
