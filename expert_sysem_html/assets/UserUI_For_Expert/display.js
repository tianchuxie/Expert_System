/*
    This file is for the action message the inference engine generate.
    This will change the html code dynamically
*/

/*  Display object*/
var Display = (function() {
    var logDiv;
    function getLogDiv() {/*Get the logDiv to modify the context inside*/
        if (!logDiv)
            logDiv = document.getElementById("logDiv");
        return logDiv;
    }
    return {
        /*This is an action message function to return for singlde value such as male or female*/
        SingleValue: function(/* string */ name, /* string */ value, /* function */ cb) {
            if(document.getElementById("questionDiv").innerHTML == ""){
                document.getElementById("questionDiv").style.display = "none";
                getLogDiv().style.display = "block";
            }

            holder.addMsg(name + " = " + value + "\n");
            getLogDiv().innerHTML += name.replaceAllnl('\n','<br>') + " = " + value + "\n";
            getLogDiv().innerHTML += "<br><br><p>Press Space Bar or Click Continue button to get the next question</p><p>(In warning message, you need to click the continue or submit the answer for the next question)</p>";

            getLogDiv().classList.add("well");

            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Continue");
            b.classList.add("btn");
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");
            b.onclick = function(){
                getLogDiv().innerHTML = "";
                getLogDiv().className = "";
                cb();            
            };
               
            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(b);

            document.body.onkeyup = function(e){
                if(e.keyCode == 32 && getLogDiv().style.display == 'block'
                    && (document.getElementById("questionDiv").style.display == 'none' || document.getElementById("questionDiv").innerHTML == "") 
                    && document.getElementById("prevDiv").style.display == 'none'){
                    getLogDiv().innerHTML = "";
                    getLogDiv().className = "";
                    cb();   
                }
            };
        },
        /*This is an action message function to return for Yes or No question*/
        YesNo: function(/* string */ name, /* string */ value, /* function */ cb) {
            if(document.getElementById("questionDiv").innerHTML == ""){
                document.getElementById("questionDiv").style.display = "none";
                getLogDiv().style.display = "block";
            }
           holder.addMsg(name + " = " + value + "\n");
            getLogDiv().innerHTML += name.replaceAllnl('\n','<br>') + " = " + value + "\n";
            getLogDiv().innerHTML += "<br><br><p>Press Space Bar or Click Continue button to get the next question</p><p>(In warning message, you need to click the continue or submit the answer for the next question)</p>";
            getLogDiv().classList.add("well");

            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Continue");
            b.classList.add("btn");
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");
            b.onclick = function(){
                getLogDiv().innerHTML = "";
                getLogDiv().className = "";
                cb();            
            };

            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(b);

            document.body.onkeyup = function(e){
                if(e.keyCode == 32 && getLogDiv().style.display == 'block'
                    && (document.getElementById("questionDiv").style.display == 'none' || document.getElementById("questionDiv").innerHTML == "") 
                    && document.getElementById("prevDiv").style.display == 'none'){
                    getLogDiv().innerHTML = "";
                    getLogDiv().className = "";
                    cb();   
                }
            };
        },
        /*This is an action message function for multiple value questions*/
        MultipleValue: function(/* string */ name, /* Array<string> */ values, /* function */ cb) {
            if(document.getElementById("questionDiv").innerHTML == ""){
                document.getElementById("questionDiv").style.display = "none";
                getLogDiv().style.display = "block";
            }            
            holder.addMsg(name + " = " + values.toString());
            getLogDiv().innerHTML += name.replaceAllnl('\n','<br>');
            
            var list = "<ul>";

            if(values.length != 0){ 

                for(i = 0; i< values.length; i++){
                    list += "<li>" + values[i] + "</li>";
                }
            
            }else{
                getLogDiv().innerHTML += "<li>None</li>";

            }

            getLogDiv().innerHTML += list + "</ul>";    
            getLogDiv().innerHTML += "<br><p>Press Space Bar or Click Continue button to get the next question</p><p>(In warning message, you need to click the continue or submit the answer for the next question)</p>";
            
            getLogDiv().classList.add("well");

            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Continue");
            b.classList.add("btn");
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");
            b.onclick = function(){
                getLogDiv().innerHTML = "";
                getLogDiv().className = "";
                cb();            
            };

            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(b);

            document.body.onkeyup = function(e){
                if(e.keyCode == 32 && getLogDiv().style.display == 'block'
                    && (document.getElementById("questionDiv").style.display == 'none' || document.getElementById("questionDiv").innerHTML == "") 
                    && document.getElementById("prevDiv").style.display == 'none'){
                    getLogDiv().innerHTML = "";
                    getLogDiv().className = "";
                    cb();   
                }
            };
        },
        /*This is an action message function for numeric questions*/
        Numeric: function(/* string */ name, /* number */ value, /* function */ cb) {
            if(document.getElementById("questionDiv").innerHTML == ""){
                document.getElementById("questionDiv").style.display = "none";
                getLogDiv().style.display = "block";
            }            
            holder.addMsg(name + " = " + value + "\n");
            getLogDiv().innerHTML += name.replaceAllnl('\n','<br>') + " = " + value + "\n";
            getLogDiv().innerHTML += "<br><br><p>Press Space Bar or Click Continue button to get the next question</p><p>(In warning message, you need to click the continue or submit the answer for the next question)</p>";
            getLogDiv().classList.add("well");

            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Continue");
            b.classList.add("btn");
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");
            b.onclick = function(){
                getLogDiv().innerHTML = "";
                getLogDiv().className = "";
                cb();            
            };

            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(b);

            document.body.onkeyup = function(e){
                if(e.keyCode == 32 && getLogDiv().style.display == 'block'
                    && (document.getElementById("questionDiv").style.display == 'none' || document.getElementById("questionDiv").innerHTML == "") 
                    && document.getElementById("prevDiv").style.display == 'none'){
                    getLogDiv().innerHTML = "";
                    getLogDiv().className = "";
                    cb();   
                }
            };
       },
       /*This is an action message function for the general action or result*/
        Message: function(/* string */ message, /* function */ cb) {
            if(document.getElementById("questionDiv").innerHTML == ""){
                document.getElementById("questionDiv").style.display = "none";
                getLogDiv().style.display = "block";
            }

            if(getLogDiv().innerHTML != ""){
                if(document.getElementById("cbtn") != null){
                    document.getElementById("cbtn").remove();
                }
            }
                        
            holder.addMsg(message + "\n");
            getLogDiv().classList.add("well");
            getLogDiv().innerHTML += message.replaceAllnl('\n', '<br>') + "\n";
            getLogDiv().innerHTML += "<br><br><p>Press Space Bar or Click Continue button to get the next question</p><p>(In warning message, you need to click the continue or submit the answer for the next question)</p>";
            
            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Continue");
            b.setAttribute("id", "cbtn");
            b.classList.add("btn");
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");
            b.onclick = function(){
                getLogDiv().innerHTML = "";
                getLogDiv().className = "";
                cb();            
            };

            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(document.createElement("br"));            
            getLogDiv().appendChild(b);

            document.body.onkeyup = function(e){
                if(e.keyCode == 32 && getLogDiv().style.display == 'block'
                    && (document.getElementById("questionDiv").style.display == 'none' || document.getElementById("questionDiv").innerHTML == "") 
                    && document.getElementById("prevDiv").style.display == 'none'){
                    getLogDiv().innerHTML = "";
                    getLogDiv().className = "";
                    cb();   
                }
            };
        },
        /*This is an action message function for the last message*/
        Finish: function(){
            if(document.getElementById("questionDiv").innerHTML == ""){
                document.getElementById("questionDiv").style.display = "none";
                getLogDiv().style.display = "block";
            }            
            holder.addMsg("\n*************************Finished***************************");
//            console.log(holder.getMsg());
            getLogDiv().classList.add("well");
            getLogDiv().innerHTML += "<p>Thank you for the Using our System</p>";
            getLogDiv().innerHTML += "<p>Press Stop button to go back</p>";


            var n = document.createElement("input");
            n.setAttribute("type", "button");
            n.setAttribute("value", "Next Case");
            n.classList.add("btn");
            n.classList.add("btn-lg");
            n.classList.add("btn-primary");
            n.onclick = function(){
                window.location = document.referrer;
            };

            getLogDiv().appendChild(document.createElement("br"));            
  
            var s = document.createElement("span");
            s.innerHTML = ' ';

            var stop = document.createElement("input");
            stop.setAttribute("type", "button");
            stop.setAttribute("value", "Stop");
            stop.classList.add("btn");
            stop.classList.add("btn-lg");
            stop.classList.add("btn-primary");
            stop.onclick = function(){
                //download text file or redirect to somewhere else
                window.location = "../app.html";
            };

            var s2 = document.createElement("span");
            s2.innerHTML = ' ';

            var download = document.createElement("input");
            download.setAttribute("type", "button");
            download.setAttribute("value", "Download File");
            download.classList.add("btn");
            download.classList.add("btn-lg");
            download.classList.add("btn-primary");
            download.onclick = function(){
                //download text file or redirect to somewhere else
                holder.writeToTextFile();
            };
    

            getLogDiv().appendChild(n);
            getLogDiv().appendChild(s);            
            getLogDiv().appendChild(stop);  
            getLogDiv().appendChild(s2);            
            getLogDiv().appendChild(download);               

            document.body.onkeyup = function(e){
                
            };
        }
    };
})();
