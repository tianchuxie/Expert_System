    String.prototype.replaceAll = function(s, r) {
        var index, str = this;
        while ((index = str.indexOf(s)) != -1)
            str = str.substring(0, index) + r + str.substr(index + s.length, str.length);
        return str;
    };
    var parseQuery = function(str) {
        var qso = {};
        var qs = document.location.search;
        if (qs == "")
            return undefined;
        qs = qs.replace(/(^\?)/, '').replace(/;/g, '&').replaceAll("+", " ");
        while (qs.indexOf("&&") != -1)
            qs = qs.replace(/&&/g, '&');
        qs = qs.replace(/([\&]+$)/, '');
        qs = qs.split("&");
        for (var i = 0; i < qs.length; i++) {
            var qi = qs[i].split("=");
            if (qi.length != 2)
                throw "Bad query string.";
            if (decodeURIComponent(qi[0]) == str)
                return decodeURIComponent(qi[1]);
        }
    };
    // function loadData() {
    //     var s = parseQuery("jsonString");
    //     if (s) {
    //     	var kb = JSON.parse(s);
    //     	console.log(JSON.stringify(kb));
    //     	Runner.run(kb);
    //     }
    // }
    
    function openLocalSave(){
        //find out if comming from acs or expert
        var flagACS = localStorage.getItem("acsJSON");
    
        if (flagACS === null) {
            var flag = localStorage.getItem("ExpertJSON");
            console.log('sentJSON: ', flag);
            if(flag === null){
                
                //not deleted to send back
            } else {
                var expertReceivedJSON = JSON.parse(flag);
                console.log('retrievedObject: ', expertReceivedJSON);
                Runner.run(expertReceivedJSON);
            }
        } else {
            var expertAcsJSON = JSON.parse(flagACS);
            localStorage.removeItem("acsJSON");
            holder.display();
            Runner.run(expertAcsJSON);
        }
        //console.log('retrievedObject: ', expertAcsJSON);
    }
    
    var JSONholder;    
    function sendBackToExpert() {
        	var formHTML = `
    	<form id="sendForm" action="../app.html" method="GET">
        <input type="hidden" id="jsonString" name="jsonString" />
        <input type="submit" />
    	</form>
    	`
    	document.getElementById("content").innerHTML = formHTML;
    	document.getElementById("jsonString").value = JSON.stringify(JSONholder);
    	document.getElementById("sendForm").submit();
    }    
    