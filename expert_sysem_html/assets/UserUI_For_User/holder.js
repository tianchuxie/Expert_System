var SV = 10000, TFV = 20000, MULTV = 30000, REALV = 40000, INTV = 50000;

function EntireQ () {
	this.questions = new Array();
	this.intro = true;
	this.msg = "";	
}

EntireQ.prototype = {

	print:function(){
	console.log(this.questions);
	},
	insert:function(q, content, valuesLen, type){
		this.questions.push(new EachQ(q, content, valuesLen, type));
		return;
	},
	writeToTextFile:function(){
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
	clean:function(){
		this.questions = new Array();
	},
	display:function(){

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
				
				li.innerHTML = links;
				ul.appendChild(li);
			}

			sidebar.appendChild(ul);

		}

	},
	showPrev:function(num){
//		var questionDiv = document.getElementById("questionDiv");
//		console.log(questionDiv);
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
					//console.log(this.questions[num].getAnsString());								
				}else if(this.questions[num].getType() == TFV){
					//console.log(this.questions[num].getAnsString());								
					if(this.questions[num].getAns() == 0){
						document.getElementById("TFV0").checked = true;
					}else{
						document.getElementById("TFV1").checked = true;	
					}
				}else if(this.questions[num].getType() == MULTV){
					var ansArr = this.questions[num].getAns();
					//console.log(this.questions[num].getAnsString());								
					for(i = 0; i < ansArr.length; i++){
						var id = "MULTV"+ansArr[i];
						document.getElementById(id).checked = true;
					}
				}else if(this.questions[num].getType() == REALV){
					//console.log(this.questions[num].getAnsString());								
					var real = document.getElementById("REALV");
					real.value = this.questions[num].getAns();
				}else{//int value
					//console.log(this.questions[num].getAnsString());									
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
	insertAndDisplay:function(q, content, valuesLen, type){
		this.insert(q, content, valuesLen, type);
		this.display();
	},
	getLast:function(){
		return this.questions[this.questions.length - 1];
	},
	setNoIntro:function(){
		this.intro = false;
	},
	changeView:function(num){
		
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
	addMsg: function(msg){
		this.msg += msg;
	},
	getMsg: function(){
		return this.msg;
	}
}

String.prototype.replaceAllnl = function(target, replacement) {
	return this.split(target).join(replacement);
};

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
