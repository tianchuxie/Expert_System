/*
	This is a Javascript file that holds the questions and answers the user made.
*/

/* 	This is the constant variable to check the type of the question and answer */
var SV = 10000, TFV = 20000, MULTV = 30000, REALV = 40000, INTV = 50000;

/*	The class EntireQ has eachQ objects, and it will show the side bar and messages for each case. */
function EntireQ () {
	this.questions = new Array();
	this.intro = true;
	this.msg = "";	
}

/*	This is the functions included in EntireQ class, which are print, insert, writeToTextFile, clean, display, showPrev, insertAndDisplay, 
	getLast, setNoIntro, changeView, addMsg, and getMsg
*/
EntireQ.prototype = {

	print:function(){/*Just for a debugging purpose*/
	console.log(this.questions);
	},
	insert:function(q, content, valuesLen, type){/*Create EachQ object and put it to array*/
		this.questions.push(new EachQ(q, content, valuesLen, type));
		return;
	},
	writeToTextFile:function(){/*Write result to the text file and save it*/
        var textToWrite = "";
        const MIME_TYPE = 'text/plain';
        for(i = 0; i < this.questions.length; i++){
        	textToWrite += this.questions[i].getQ();
        	textToWrite += "\r\n";
        	textToWrite += this.questions[i].getAnsString();
        	textToWrite += "\r\n";
        }
        textToWrite += this.getMsg();

       var blob = new Blob([textToWrite], {
    		type: "text/plain;charset=utf-8;",
		});
        if(textToWrite != "")
			saveAs(blob, "result.txt");
	},
	clean:function(){/*Clean the array this class has*/
		this.questions = new Array();
	},
	display:function(){/*Display the sidebar*/

		var sidebar = document.getElementById("sidebar");
		var h1 = document.createElement("h1");
		sidebar.innerHTML = "";
//		console.log(this.questions);

		h1.classList.add("sidebarHeader");
		if(this.intro){
			h1.innerHTML = "Start It";
			sidebar.appendChild(h1);
			sidebar.appendChild(document.createElement("hr"));

			var h3 = document.createElement("h3");
			h3.classList.add("sidebarCont");
			h3.innerHTML = "No Questions";

		
			sidebar.appendChild(h3);
		}else{
			h1.innerHTML = "Questions";
			sidebar.appendChild(h1);
			sidebar.appendChild(document.createElement("hr"));
				
			var ul = document.createElement("ul");
			for(i = 0; i < this.questions.length; i++){
				var links = "";
				var li = document.createElement("li");

				links += '<a href="#" onclick="holder.showPrev(' + i + ');">';
				links += this.questions[i].getQ();
				links += '</a>';

				if(i == this.questions.length -1){
					links += '<br><button id="modifybtn" class="btn btn-xs btn-warning" onclick="window.location.href=\'../app.html\'">Modify</button>';
				}
				
				li.innerHTML = links;
				ul.appendChild(li);
			}

			sidebar.appendChild(ul);

		}

	},
	showPrev:function(num){/*shows previous questions and answers*/
		var node = document.getElementById('prevDiv');
		while (node.hasChildNodes()) {
		    node.removeChild(node.firstChild);
		}
		
		if(this.questions[num].getAns() != null){
			if(this.getLast() === this.questions[num]){
				document.getElementById('logDiv').style.display = 'none';
				document.getElementById('questionDiv').style.display = 'none';
				node.style.display = 'block';
				node.innerHTML = '<div class="well"><p>What would you like to check?</p><br><input type="button" value="Question" class="btn btn-lg btn-primary" onclick="holder.changeView(0)"></input> <input type="button" value="Message" class="btn btn-lg btn-primary" onclick="holder.changeView(1)"></input></div>'
			}else{
				document.getElementById('questionDiv').style.display = 'none';
				document.getElementById('logDiv').style.display = 'none';
				node.style.display = 'block';
				node.innerHTML = this.questions[num].getContent();
				document.getElementById("submitbtn").disabled = true;
				document.getElementById("resetbtn").disabled = true;

				if(this.questions[num].getType() == SV){
					document.getElementById("SV"+this.questions[num].getAns()).checked = true;
				}else if(this.questions[num].getType() == TFV){
					if(this.questions[num].getAns() == 0){
						document.getElementById("TFV0").checked = true;
					}else{
						document.getElementById("TFV1").checked = true;	
					}
				}else if(this.questions[num].getType() == MULTV){
					var ansArr = this.questions[num].getAns();
					for(i = 0; i < ansArr.length; i++){
						var id = "MULTV"+ansArr[i];
						document.getElementById(id).checked = true;
					}
				}else if(this.questions[num].getType() == REALV){
					var real = document.getElementById("REALV");
					real.value = this.questions[num].getAns();
				}else{//int value
					var intv = document.getElementById("INTV");
					intv.value = this.questions[num].getAns();
				}
			}
			
		}else{

			if(document.getElementById('questionDiv').innerHTML == ""){
				document.getElementById('questionDiv').style.display = 'none';
				document.getElementById('logDiv').style.display = 'block';
				node.style.display = 'none';

			}else{
				document.getElementById('questionDiv').style.display = 'block';
				document.getElementById('logDiv').style.display = 'none';
				node.style.display = 'none';

			}	

		}
	},
	insertAndDisplay:function(q, content, valuesLen, type){/*Insert and Display it*/
		this.insert(q, content, valuesLen, type);
		this.display();
	},
	getLast:function(){/*Get the last question in the array*/
		return this.questions[this.questions.length - 1];
	},
	setNoIntro:function(){/*Turn off the intro status*/
		this.intro = false;
	},
	changeView:function(num){/*Change views once the user click previous question in the sidebar */
		
		if(num == 0){

			document.getElementById('logDiv').style.display = 'none';
			document.getElementById('questionDiv').style.display = 'none';
			document.getElementById('prevDiv').style.display = 'block';	

			var node = document.getElementById('prevDiv');
			node.innerHTML = this.getLast().getContent();
			document.getElementById("submitbtn").disabled = true;
			document.getElementById("resetbtn").disabled = true;

			if(this.getLast().getType() == SV){
				document.getElementById("SV"+this.getLast().getAns()).checked = true;
					//console.log(this.questions[num].getAnsString());								
			}else if(this.getLast().getType() == TFV){
					//console.log(this.questions[num].getAnsString());								
				if(this.getLast().getAns() == 0){
					document.getElementById("TFV0").checked = true;
				}else{
					document.getElementById("TFV1").checked = true;	
				}
			}else if(this.getLast().getType() == MULTV){
				var ansArr = this.getLast().getAns();
					//console.log(this.questions[num].getAnsString());								
				for(i = 0; i < ansArr.length; i++){
					var id = "MULTV"+ansArr[i];
					document.getElementById(id).checked = true;
				}
			}else if(this.getLast().getType() == REALV){
					//console.log(this.questions[num].getAnsString());								
				var real = document.getElementById("REALV");
				real.value = this.getLast().getAns();
			}else{//int value
					//console.log(this.questions[num].getAnsString());									
				var intv = document.getElementById("INTV");
				intv.value = this.getLast().getAns();
			}
			
		}else{
			document.getElementById('logDiv').style.display = 'block';
			document.getElementById('questionDiv').style.display = 'none';
			document.getElementById('prevDiv').style.display = 'none';
		}
		
	},
	addMsg: function(msg){/*Add the messages*/
		this.msg += msg;
	},
	getMsg: function(){/*Returns the whole message*/
		return this.msg;
	}
}

/*	This is the function to replace all the target string to replacement*/
String.prototype.replaceAllnl = function(target, replacement) {
	return this.split(target).join(replacement);
};

/*	This is a class for the question and answer*/
function EachQ (q, content, valuesLen, type){
	this.q = q;
	this.content = content;
	this.type = type;
	this.ans = null;
	this.ansString = "";
	this.valuesLen = valuesLen;

	this.setAns = function(ans, ansString){
		this.ans = ans; 
		this.ansString = ansString;
	}
	this.getType = function(){
		return this.type;
	}
	this.getAns = function(){
		return this.ans;
	}
	this.getAnsString = function(){
		return this.ansString;
	}
	this.getQ = function(){
		return this.q;
	}
	this.getContent = function(){
		return this.content;
	}
	this.getVLen = function(){
		return this.valuesLen;
	}
}
