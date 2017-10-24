var Prompt = (function() {
    var questionDiv;
    var qd = function() {
        if (!questionDiv)
            questionDiv = document.getElementById("questionDiv");
        return questionDiv;
    };
    
    return {
        //Single value signifies a radio button that only allows one value to be chosen
        SingleValue: function(/* string */ question, /* Array<string> */ possible, /* function */ cb) {
            //html generated dynamically
            qd().style.display = 'block';
            qd().innerHTML = "";
            questionDiv.classList.add("row-offset-10");
            
            var div = document.createElement("div");
            div.classList.add("col-lg-12");

            var divQ = document.createElement("div");
            var divA = document.createElement("div");

            divQ.classList.add("well");
            divA.classList.add("well"); 
            divA.id = "answerChoices"           
            
            var p = document.createElement("p");
            p.innerHTML = question;

            divQ.appendChild(p);
            div.appendChild(divQ);

            //creating radio buttons and filling them out with the possible answer choices
            var setName = "temp" + Math.floor(Math.random() * 1000000);
            var rs = [];
            for (var i = 0; i < possible.length; i++) {
                var r = document.createElement("input");
                r.setAttribute("type", "radio");
                r.setAttribute("name", setName);
                r.setAttribute("value", possible[i]);
                r.setAttribute("id", "SV" + i);
                divA.appendChild(r);
                rs.push(r);
                divA.appendChild(document.createTextNode(" " + possible[i]));
                divA.appendChild(document.createElement("br"));
            }

            div.appendChild(divA);

            //Submit button generated dynamically
            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Submit");
            b.setAttribute("id", "submitbtn");
            var numChecked = 0;
            b.onclick = function() {

                if(document.getElementById("logDiv").style.display != "none"){
                    if(document.getElementById("cbtn") != null){
                        document.getElementById("cbtn").remove();
                    }
                }
                
                for (var i = 0; i < rs.length; i++){
                    if (rs[i].checked) {
                        numChecked = numChecked + 1;
                        var v = rs[i].value;
                        if (possible.indexOf(v) == -1)
                            throw "Invalid value.";
                        holder.getLast().setAns(i, v);
                        holder.setNoIntro();
                        questionDiv.innerHTML = "";
                        cb(i);
                        return;
                    }
                    //Validation to ensure that the user has entered a value
                    if(i == rs.length-1 && numChecked == 0){
                        alert("You must select a value to answer the question");
                    }
                }
            };
            b.classList.add("btn");
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");

            //reset button generated dynamically
            var resetButton = document.createElement("button");
            resetButton.setAttribute("type", "reset");
            resetButton.setAttribute("value", "Reset");
            resetButton.setAttribute("id", "resetbtn");
            resetButton.classList.add("btn")
            resetButton.classList.add("btn-lg");
            resetButton.classList.add("btn-primary");
            resetButton.classList.add("reset-btn");
            resetButton.innerHTML = 'Reset';
            //when reset button is clicked, resets all the answer choices to nothing being selected
            resetButton.onclick = function() {
                
                var named = document.getElementById("answerChoices"); 
                var tags = named.getElementsByTagName("input");
                for (var i = 0; i< tags.length; i = i + 1) {
                    tags[i].checked = false;
                }

                
            };

            div.appendChild(resetButton);

            var sp = document.createElement("span")
            sp.innerHTML = ' ';
            div.appendChild(sp);
            div.appendChild(b);            

            questionDiv.appendChild(div);
            holder.insertAndDisplay(p.innerHTML, questionDiv.innerHTML, rs.length, SV);
        },
        //This class signifies a question that only allows yes or no as the answer options
        YesNo: function(/* string */ question, /* function */ cb) { // NOTE: the possible values for this are only YES and NO
            //html generated dynamically
            qd().style.display = 'block';
            qd().innerHTML = "";

            questionDiv.classList.add("row-offset-10");
            
            var div = document.createElement("div");
            div.classList.add("col-lg-12");

            var divQ = document.createElement("div");
            var divA = document.createElement("div");

            divQ.classList.add("well");
            divA.classList.add("well");
            divA.id = "answerChoices"

            var p = document.createElement("p");
            p.innerHTML = question;

            divQ.appendChild(p);
            div.appendChild(divQ);

            var setName = "temp" + Math.floor(Math.random() * 1000000);
            
            //radio buttons generated dynamically
            var r0 = document.createElement("input");
            r0.setAttribute("type", "radio");
            r0.setAttribute("name", setName);
            r0.setAttribute("value", "PRESENT");
            r0.setAttribute("id", "TFV0");

            divA.appendChild(r0);
            divA.appendChild(document.createTextNode(" Yes"));
            divA.appendChild(document.createElement("br"));
            var r1 = document.createElement("input");
            r1.setAttribute("type", "radio");
            r1.setAttribute("name", setName);
            r1.setAttribute("value", "ABSENT");
            r1.setAttribute("id", "TFV1");
 
            divA.appendChild(r1);
            divA.appendChild(document.createTextNode(" No"));
            divA.appendChild(document.createElement("br"));
            div.appendChild(divA);
            
            //submit button generated dynamically.
            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Submit");
            b.setAttribute("id", "submitbtn");

            b.onclick = function() {
                if(document.getElementById("logDiv").style.display != "none"){
                    if(document.getElementById("cbtn") != null){
                        document.getElementById("cbtn").remove();
                    }
                }

                holder.setNoIntro();
                
                if (r0.checked){
                    holder.getLast().setAns(0, "Yes");
                    questionDiv.innerHTML = "";
                    cb(true);
                }else if (r1.checked){
                    holder.getLast().setAns(1, "No");
                    questionDiv.innerHTML = "";
                    cb(false);
                }else{
                    //validation to make sure that the user enters a value
                    alert("You must select a value to answer the question");
                }
            };

            b.classList.add("btn")
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");

            //reset button generated dynamically
            var resetButton = document.createElement("button");
            resetButton.setAttribute("type", "reset");
            resetButton.setAttribute("value", "Reset");
            resetButton.setAttribute("id", "resetbtn");
            resetButton.classList.add("btn")
            resetButton.classList.add("btn-lg");
            resetButton.classList.add("btn-primary");
            resetButton.classList.add("reset-btn");
            resetButton.innerHTML = 'Reset';
            //when reset button is clicked, resets all the answer choices to nothing being selected
            resetButton.onclick = function() {
                
                var named = document.getElementById("answerChoices"); 
                var tags = named.getElementsByTagName("input");
                for (var i = 0; i< tags.length; i = i + 1) {
                    tags[i].checked = false;
                }

                
            };

            div.appendChild(resetButton);
            var sp = document.createElement("span")
            sp.innerHTML = ' ';
            div.appendChild(sp);

            console.log("here");
            div.appendChild(b);

            questionDiv.appendChild(div);
            holder.insertAndDisplay(p.innerHTML, questionDiv.innerHTML, 2, TFV);            
        },
        //A type of question that allows the user to select none or multiple values as input
        MultipleValue: function(/* string */ question, /* Array<string> */ possible, /* function */ cb) {
            //html generated dynamically
            qd().style.display = 'block';
            qd().innerHTML = "";

            questionDiv.classList.add("row-offset-10");
            
            var div = document.createElement("div");
            div.classList.add("col-lg-12");

            var divQ = document.createElement("div");
            var divA = document.createElement("div");

            divQ.classList.add("well");
            divA.classList.add("well");
            divA.id = "answerChoices"

            var p = document.createElement("p");
            p.innerHTML = question;

            divQ.appendChild(p);
            div.appendChild(divQ);

            var cs = [];
            for (var i = 0; i < possible.length; i++) {
                var c = document.createElement("input");
                c.setAttribute("type", "checkbox");
                c.setAttribute("value", possible[i]);
                c.setAttribute("id", "MULTV"+i);
                divA.appendChild(c);
                cs.push(c);
                divA.appendChild(document.createTextNode(" " + possible[i]));
                divA.appendChild(document.createElement("br"));
            }

            div.appendChild(divA);
            //Submit button generated dynamically
            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Submit");
            b.setAttribute("id", "submitbtn");
            var numChecked = 0;
            b.onclick = function() {
                if(document.getElementById("logDiv").style.display != "none"){
                    if(document.getElementById("cbtn") != null){
                        document.getElementById("cbtn").remove();
                    }
                }
                var values = [];
                var values_string = [];
                for (var i = 0; i < cs.length; i++){
                    if (cs[i].checked) {
                        numChecked = numChecked + 1;
                        var v = cs[i].value;
                        if (possible.indexOf(v) == -1)
                            throw "Invalid value.";
                        values.push(i);
                        values_string.push(v);
                    }
                }
                //No validation needed for multiple values because system allows the user to select none
                questionDiv.innerHTML = "";
                holder.getLast().setAns(values, values_string.toString());
                holder.setNoIntro();                
                cb(values);
                
               
                return;
            };

            b.classList.add("btn")
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");

            //reset button generated dynamically
            var resetButton = document.createElement("button");
            resetButton.setAttribute("type", "reset");
            resetButton.setAttribute("value", "Reset");
            resetButton.setAttribute("id", "resetbtn");
            resetButton.classList.add("btn")
            resetButton.classList.add("btn-lg");
            resetButton.classList.add("btn-primary");
            resetButton.classList.add("reset-btn");
            resetButton.innerHTML = 'Reset';
            //when reset button is clicked, resets all the answer choices to nothing being selected
            resetButton.onclick = function() {
                
                var named = document.getElementById("answerChoices"); 
                var tags = named.getElementsByTagName("input");
                for (var i = 0; i< tags.length; i = i + 1) {
                    tags[i].checked = false;
                }

                
            };


            div.appendChild(resetButton);
            var sp = document.createElement("span")
            sp.innerHTML = ' ';
            div.appendChild(sp);

            div.appendChild(b);

            questionDiv.appendChild(div);
            holder.insertAndDisplay(p.innerHTML, questionDiv.innerHTML, cs.length, MULTV);
        },
        //A type of question that takes in a floating point input
        Real: function(/* string */ question, /* Array<RealRange> */ ranges, /* function */ cb) {
            //html generated dynamically
            qd().style.display = 'block';
            qd().innerHTML = "";

            questionDiv.classList.add("row-offset-10");
            
            var div = document.createElement("div");
            div.classList.add("col-lg-12");

            var divQ = document.createElement("div");
            var divA = document.createElement("div");

            divQ.classList.add("well");
            divA.classList.add("well");
            divA.id = "answerChoices"

            var p = document.createElement("p");
            p.innerHTML = question;

            divQ.appendChild(p);
            div.appendChild(divQ);
            
            var c = document.createElement("input");
            c.setAttribute("type", "number");
            c.setAttribute("step", 0.001);
            c.setAttribute("id", "REALV");
            var min = ranges[0].lower.value, max = ranges[0].upper.value;
            for (var i = 1; i < ranges.length; i++) {
                min = Math.min(min, ranges[i].lower.value);
                max = Math.max(max, ranges[i].upper.value);
            }
            c.setAttribute("min", min);
            c.setAttribute("max", max);
            
            divA.appendChild(c);
            divA.appendChild(document.createElement("br"));
            div.appendChild(divA);

            //Submit button generated dynamically
            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Submit");
            b.setAttribute("id", "submitbtn");
            b.onclick = function() {
                if(document.getElementById("logDiv").style.display != "none"){
                    if(document.getElementById("cbtn") != null){
                        document.getElementById("cbtn").remove();
                    }
                }
                var v = c.value;
                for (var i = 0; i < ranges.length; i++){
                    //Validation to ensure that the user has entered a value in range
                    if(v < min || v > max){
                        alert("Please enter a number in range");
                    }
                    if(v == null){
                        alert("You must input a value");
                    }
                    if (ranges[i].inRange(v)) {
                        holder.getLast().setAns(v, v);
                        holder.setNoIntro(); 
                        questionDiv.innerHTML = "";
                        cb(v);
                        return;
                    }
                }
                throw "Illegal value '" + v + "'.";
            };

            b.classList.add("btn")
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");

            //reset button generated dynamically
            var resetButton = document.createElement("button");
            resetButton.setAttribute("type", "reset");
            resetButton.setAttribute("value", "Reset");
            resetButton.setAttribute("id", "resetbtn");
            resetButton.classList.add("btn")
            resetButton.classList.add("btn-lg");
            resetButton.classList.add("btn-primary");
            resetButton.classList.add("reset-btn");
            resetButton.innerHTML = 'Reset';
            //when reset button is clicked, resets all the answer choices to nothing being selected
            resetButton.onclick = function() {
                
                var named = document.getElementById("answerChoices"); 
                var tags = named.getElementsByTagName("input");
                for (var i = 0; i< tags.length; i = i + 1) {
                    tags[i].value = "";
                }

                
            };

            div.appendChild(resetButton);
            var sp = document.createElement("span")
            sp.innerHTML = ' ';
            div.appendChild(sp);

            div.appendChild(b);

            questionDiv.appendChild(div);
            holder.insertAndDisplay(p.innerHTML, questionDiv.innerHTML, 1, REALV);
        },
        //A type of question that takes in an integer as the input
        Int: function(/* string */ question, /* Array<IntRange> */ ranges, /* function */ cb) {
            //html generated dynamically
            qd().style.display = 'block';
            qd().innerHTML = "";

            questionDiv.classList.add("row-offset-10");
            
            var div = document.createElement("div");
            div.classList.add("col-lg-12");

            var divQ = document.createElement("div");
            var divA = document.createElement("div");
            divA.id = "answerChoices"

            divQ.classList.add("well");
            divA.classList.add("well");

            var p = document.createElement("p");
            p.innerHTML = question;

            divQ.appendChild(p);
            div.appendChild(divQ);

            var c = document.createElement("input");
            c.setAttribute("type", "number");
            c.setAttribute("step", 1);
            c.setAttribute("id", "INTV"); 
            var min = ranges[0].lower.value, max = ranges[0].upper.value;
            for (var i = 1; i < ranges.length; i++) {
                min = Math.min(min, ranges[i].lower.value);
                max = Math.max(max, ranges[i].upper.value);
            }
            c.setAttribute("min", min);
            c.setAttribute("max", max);

            divA.appendChild(c);
            divA.appendChild(document.createElement("br"));
            div.appendChild(divA);

            //Submit button generated dynamically
            var b = document.createElement("input");
            b.setAttribute("type", "button");
            b.setAttribute("value", "Submit");
            b.setAttribute("id", "submitbtn");
            b.onclick = function() {
                if(document.getElementById("logDiv").style.display != "none"){
                    if(document.getElementById("cbtn") != null){
                        document.getElementById("cbtn").remove();
                    }
                }
                var v = new Number(c.value) + 0;
                for (var i = 0; i < ranges.length; i++){
                    //Validation to ensure that the user has entered a value
                    if(v < min || v > max){
                        alert("Please enter a number in range");
                    }
                    if(v == null){
                        alert("You must input a value");
                    }
                    if (ranges[i].inRange(v)) {
                        holder.getLast().setAns(v, v);
                        holder.setNoIntro();  
                        questionDiv.innerHTML = "";
                        cb(v);
                        return;
                    }
                }
                throw "Illegal value '" + v + "'.";
            };

            b.classList.add("btn")
            b.classList.add("btn-lg");
            b.classList.add("btn-primary");

            //reset button generated dynamically
            var resetButton = document.createElement("button");
            resetButton.setAttribute("type", "reset");
            resetButton.setAttribute("value", "Reset");
            resetButton.setAttribute("id", "resetbtn");
            resetButton.classList.add("btn")
            resetButton.classList.add("btn-lg");
            resetButton.classList.add("btn-primary");
            resetButton.classList.add("reset-btn");
            resetButton.innerHTML = 'Reset';
            //when reset button is clicked, resets all the answer choices to nothing being selected
            resetButton.onclick = function() {
                
                var named = document.getElementById("answerChoices"); 
                var tags = named.getElementsByTagName("input");
                for (var i = 0; i< tags.length; i = i + 1) {
                    tags[i].value = "";
                }

                
            };

            div.appendChild(resetButton);
            var sp = document.createElement("span")
            sp.innerHTML = ' ';
            div.appendChild(sp);

            div.appendChild(b);            

            questionDiv.appendChild(div);
            holder.insertAndDisplay(p.innerHTML, questionDiv.innerHTML, 1, INTV);
        }
    };
})();

// NOTE: if you want me to include validator functions to validate the input, it would be easy to write
