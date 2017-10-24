/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/Version\/[\d\.]+.*Safari/.test(navigator.userAgent),c=e.webkitRequestFileSystem,f=e.requestFileSystem||c||e.mozRequestFileSystem,u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},d="application/octet-stream",s=0,l=4e4,v=function(e){var t=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()};setTimeout(t,l)},p=function(e,t,n){t=[].concat(t);for(var o=t.length;o--;){var r=e["on"+t[o]];if("function"==typeof r)try{r.call(e,n||e)}catch(i){u(i)}}},w=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e},y=function(t,u,l){l||(t=w(t));var y,m,S,h=this,R=t.type,O=!1,g=function(){p(h,"writestart progress write writeend".split(" "))},b=function(){if(m&&a&&"undefined"!=typeof FileReader){var o=new FileReader;return o.onloadend=function(){var e=o.result;m.location.href="data:attachment/file"+e.slice(e.search(/[,;]/)),h.readyState=h.DONE,g()},o.readAsDataURL(t),void(h.readyState=h.INIT)}if((O||!y)&&(y=n().createObjectURL(t)),m)m.location.href=y;else{var r=e.open(y,"_blank");void 0===r&&a&&(e.location.href=y)}h.readyState=h.DONE,g(),v(y)},E=function(e){return function(){return h.readyState!==h.DONE?e.apply(this,arguments):void 0}},N={create:!0,exclusive:!1};return h.readyState=h.INIT,u||(u="download"),r?(y=n().createObjectURL(t),void setTimeout(function(){o.href=y,o.download=u,i(o),g(),v(y),h.readyState=h.DONE})):(e.chrome&&R&&R!==d&&(S=t.slice||t.webkitSlice,t=S.call(t,0,t.size,d),O=!0),c&&"download"!==u&&(u+=".download"),(R===d||c)&&(m=e),f?(s+=t.size,void f(e.TEMPORARY,s,E(function(e){e.root.getDirectory("saved",N,E(function(e){var n=function(){e.getFile(u,N,E(function(e){e.createWriter(E(function(n){n.onwriteend=function(t){m.location.href=e.toURL(),h.readyState=h.DONE,p(h,"writeend",t),v(e)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&b()},"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=h["on"+e]}),n.write(t),h.abort=function(){n.abort(),h.readyState=h.DONE},h.readyState=h.WRITING}),b)}),b)};e.getFile(u,{create:!1},E(function(e){e.remove(),n()}),E(function(e){e.code===e.NOT_FOUND_ERR?n():b()}))}),b)}),b)):void b())},m=y.prototype,S=function(e,t,n){return new y(e,t,n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return n||(e=w(e)),navigator.msSaveOrOpenBlob(e,t||"download")}:(m.abort=function(){var e=this;e.readyState=e.DONE,p(e,"abort")},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,S)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!==define.amd&&define([],function(){return saveAs});

var Identifier = (function() {
    var finished, array = [];
    return {
        create: function(name, question, values) {
            checkString(name);
            checkString(question);
            if (values) {
                checkArray(values);
                for (var i = 0; i < values.length; i++)
                    checkString(values[i]);
            }
            if (finished)
                throw "Already finished!";
            var i;
            for (i = 0; i < array.length; i++)
                if (array[i].name == name)
                    throw "Already contains name '" + name + "'.";
            var o = {};
            o.name = name;
            o.question = question;
            if (values)
                o.values = values;
            array[i] = o;
        },
        finish: function() {
            if (finished)
                throw "Already finished!";
            finished = true;
            return array;
        },
        checkValue: function(identifier, value) {
            if (!finished)
                throw "Not finished!";
            checkInteger(identifier);
            checkString(value);
            var arr = array[identifier].values;
            if (arr)
                for (var i = 0; i < arr.length; i++)
                    if (arr[i] == value)
                        return i;
            throw "Value not found! " + JSON.stringify(value);
        },
        verify: function(name) {
            if (!finished)
                throw "Not finished!";
            checkString(name);
            for (var i = 0; i < array.length; i++)
                if (array[i].name == name)
                    return i;
            throw "Identifier not found! " + JSON.stringify(name);
        }
    };
})();

var checkArray = function(a) {
    if (Array.isArray(a))
        return;
    throw "Not an Array: '" + JSON.stringify(a) + "'.";
}

var checkString = function(s) {
    if (typeof s === "string")
        return;
    throw "Not a string: '" + JSON.stringify(s) + "'.";
};

var checkNumber = function(n) {
    if (typeof n === "number")
        return;
    alert(typeof n);
    throw "Not a number: '" + JSON.stringify(n) + "'.";
};

var checkInteger = function(n) {
    checkNumber(n);
    if (Number.isInteger(n))
        return;
    throw "Not an integer: '" + JSON.stringify(n) + "'.";
};

var checkBoolean = function(b) {
    if (typeof b === "boolean")
        return;
    throw "Not a boolean: '" + JSON.stringify(b) + "'.";
};

var IntRange = function(/* integer */ lower,
                        /* integer */ upper,
                        /* boolean */ lowerInc,
                        /* boolean */ upperInc) {
    checkInteger(lower);
    checkInteger(upper);
    checkBoolean(lowerInc);
    checkBoolean(upperInc);
    this.inRange = function(/* integer */ x) {
        return x < lower || x > upper ? false : x > lower && x < upper ? true : x == lower && lowerInc || x == upper && upperInc;
    };
    this.lower = { value: lower, inc: lowerInc };
    this.upper = { value: upper, inc: upperInc };
};

var RealRange = function(/* number */ lower,
                         /* number */ upper,
                         /* boolean */ lowerInc,
                         /* boolean */ upperInc) {
    checkNumber(lower);
    checkNumber(upper);
    checkBoolean(lowerInc);
    checkBoolean(upperInc);
    this.inRange = function(/* number */ x) {
        return x < lower || x > upper ? false : x > lower && x < upper ? true : x == lower && lowerInc || x == upper && upperInc;
    };
    this.lower = { value: lower, inc: lowerInc };
    this.upper = { value: upper, inc: upperInc };
};

var DataType = {
    SingleValue: 0, // A single value out of a list of possible values.
    YesNo: 1, // Either true or false.
    MultipleValue: 2, // Multiple values out of a list of possible values.
    Real: 3, // A real number.
    Int: 4, // An integer.
    check: function(type) {
        switch (type) {
            case this.SingleValue:
            case this.Value:
            case this.MultipleValue:
            case this.Real:
            case this.Int:
                return;
            default:
                throw "Illegal DataType '" + type + "'.";
        }
    }
};

var BooleanRelation = {
    Equals: 100,
    NotEqualTo: 101,
    check: function(relation) {
        switch (relation) {
            case this.Equals:
            case this.NotEqualTo:
                return;
            default:
                throw "Illegal BooleanRelation '" + relation + "'.";
        }
    }
};

var NumericRelation = {
    Equals: 200,
    NotEqualTo: 201,
    GreaterThan: 202,
    LessThan: 203,
    GreaterThanOrEqualTo: 204,
    LessThanOrEqualTo: 205,
    check: function(relation) {
        switch (relation) {
            case this.Equals:
            case this.NotEqualTo:
            case this.GreaterThan:
            case this.LessThan:
            case this.GreaterThanOrEqualTo:
            case this.LessThanOrEqualTo:
                return;
            default:
                throw "Illegal NumericRelation '" + relation + "'.";
        }
    }
};

var StatusValue = {
    Known: 300,
    Unknown: 301,
    CantKnow: 302,
    check: function(value) {
        switch (value) {
            case this.Known:
            case this.Unknown:
            case this.CantKnow:
                return;
            default:
                throw "Illegal StatusValue '" + value + "'.";
        }
    }
};

var CommandType = {
    DisplayActions: 400,
    DisplayInstruction: 401,
    DisplayCertification: 402,
    DisplayReferences: 403,
    DisplayAttachments: 404,
    DisplayAttributes: 405,
    DisplayAttributeName: 406,
    DisplayInferredAttributes: 407,
    DisplayInputAttributes: 408,
    DisplayAttributeList: 409,
    DisplayInferredAttributesList: 410,
    DisplayKB: 411,
    DisplayPair: 412,
    DisplayValueName: 413,
    DisplayValues: 414,
    DisplaySynonyms: 415,
    DisplayValuesAttribute: 416,
    DisplayValue: 417,
    DisplayCalculation: 418,
    DisplayAuthorAttachmentAttribute: 419,
    DisplayAuthorAttachmentPair: 420,
    DisplayAuthorAttachmentValue: 421,
    Obtain: 422,
    Next: 423,
    Help: 424,
    Pause: 425,
    Continue: 426,
    Clear: 427,
    Stop: 428,
    Suspend: 429,
    Resume: 430,
    Message: 431,
    AskFor: 432,
    Assert: 433,
    If: 434,
    Mark: 435,
    /* rule-base specific */
    DisplayRules: 500,
    DisplayRule: 501,
    DisplayRuleAttachment: 502,
    Justify: 503
};

var Attribute = {
    SingleValue: function(/* string */ identifier) {
        checkString(identifier);
        this.type = DataType.SingleValue;
        this.identifier = Identifier.verify(identifier);
    },
    YesNo: function(/* string */ identifier) {
        checkString(identifier);
        this.type = DataType.YesNo;
        this.identifier = Identifier.verify(identifier);
    },
    MultipleValue: function(/* string */ identifier) {
        checkString(identifier);
        this.type = DataType.MultipleValue;
        this.identifier = Identifier.verify(identifier);
    },
    Real: function(/* string */ identifier, /* Array<RealRange> */ ranges) {
        checkString(identifier);
        checkArray(ranges);
        this.type = DataType.Real;
        this.identifier = Identifier.verify(identifier);
        this.ranges = ranges;
    },
    Int: function(/* string */ identifier, /* Array<IntRange> */ ranges) {
        checkString(identifier);
        checkArray(ranges);
        this.type = DataType.Int;
        this.identifier = Identifier.verify(identifier);
        this.ranges = ranges;
    }
};
