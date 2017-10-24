//Need to convert to engine format
//Saves to local storage with name of expertJSON
//
//
// function isIE () {
//   var myNav = navigator.userAgent.toLowerCase();
//   return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
// }

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function addLocalStorageIE(){

  if (detectIE()) {
        console.log("IE browser");  
        if (!window.localStorage) {
          console.log("IE browser did not recognize localstorage using alternative");        
          Object.defineProperty(window, "localStorage", new (function () {
            var aKeys = [], oStorage = {};
            Object.defineProperty(oStorage, "getItem", {
              value: function (sKey) { return sKey ? this[sKey] : null; },
              writable: false,
              configurable: false,
              enumerable: false
            });
            Object.defineProperty(oStorage, "key", {
              value: function (nKeyId) { return aKeys[nKeyId]; },
              writable: false,
              configurable: false,
              enumerable: false
            });
            Object.defineProperty(oStorage, "setItem", {
              value: function (sKey, sValue) {
                if(!sKey) { return; }
                document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
              },
              writable: false,
              configurable: false,
              enumerable: false
            });
            Object.defineProperty(oStorage, "length", {
              get: function () { return aKeys.length; },
              configurable: false,
              enumerable: false
            });
            Object.defineProperty(oStorage, "removeItem", {
              value: function (sKey) {
                if(!sKey) { return; }
                document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
              },
              writable: false,
              configurable: false,
              enumerable: false
            });
            this.get = function () {
              var iThisIndx;
              for (var sKey in oStorage) {
                iThisIndx = aKeys.indexOf(sKey);
                if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
                else { aKeys.splice(iThisIndx, 1); }
                delete oStorage[sKey];
              }
              for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
              for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
                aCouple = aCouples[nIdx].split(/\s*=\s*/);
                if (aCouple.length > 1) {
                  oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
                  aKeys.push(iKey);
                }
              }
              return oStorage;
            };
            this.configurable = false;
            this.enumerable = true;
          })());
        } else {
          console.log("IE Browser supports localstorage");  
        }
    } else {
     // Other browser
     //suppose to work
    }
}



function saveToStorage(){
    window.localStorage.clear();
    var engineJSON = expertToEngineJson(expertJSON);
    window.localStorage.setItem("ExpertJSON" , JSON.stringify(engineJSON));
    expertJSON = engineToExpertJson(engineJSON);
}
function testIfExists(){

  addLocalStorageIE();
    if(window.localStorage.getItem("ExpertJSON") === null || checkIfExpertEmpty()){
        $('#continue').prop("href", "javascript: void(0)");
        document.getElementById("continue").style.visibility = "hidden";
        document.getElementById("message").innerHTML = " We could not find an expert system. Please make a new one.";
    }
}
function openLocalSave(flag){
    
    if(expertJSON.identifiers.length === 0){
        console.log("Converting to expert");
        expertJSON = engineToExpertJson(JSON.parse(flag));    
    }

    
    // expertJSON = JSON.parse(flag);
    fillSummary();
    updateRuleAttrib();
    updateActionAttribs();  
    updateDescription();
    
}
function openContinue(){
    
}
function openAcsSave(str){
    window.localStorage.removeItem("acsJSON");
    expertJSON = engineToExpertJson(JSON.parse(str));
    window.localStorage.setItem("ExpertJSON" , JSON.stringify(expertToEngineJson(expertJSON)));
    expertJSON = engineToExpertJson(JSON.parse(str));
    fillSummary();
    
}
function checkIfLoaded(){

    addLocalStorageIE();
    
    var flagACS = window.localStorage.getItem("acsJSON");
    
    actionPlaceHolder = -1;
    
    if (flagACS === null) {
        var flag = window.localStorage.getItem("ExpertJSON");
         if (flag === null){
             //MEANS NO ACS OR NO EXPERTJSON SAVED
            expertJSON = {};
            expertJSON.identifiers = [];
            expertJSON.attributes = [];
            expertJSON.rules = [];
            expertJSON.actions = [];
            expertJSON.description = {};
         } else {
             openLocalSave(flag);
         }
    } else {
         openAcsSave(flagACS);
    }
}
function checkIfExpertEmpty(){
    return  expertJSON["identifiers"] === [] &&
            expertJSON["attributes"] === [] &&
            expertJSON["rules.length"] === [] &&
            expertJSON["actions"] === [];
}