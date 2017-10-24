//Data structure inits	
	var expertJSON = {};
    expertJSON.identifiers = [];
    expertJSON.attributes = [];
    expertJSON.rules = [];
    expertJSON.actions = [];
    expertJSON.description = {};
	
	//global counters used to add/delete/collect/measure the antecedents
	//and consequences in rule addition and display
    var antecedentCounter = 0;
    var consequenceCounter = 0;
    //global used to diplay and collect the multiple values in multival and single val types
    var attribValsCounter = 0;
    var andsOrsList = [];
    //global used to hold an action placement in the list while editing
    var actionPlaceHolder = -1;
    
//String extension to parse incoming URLs
	String.prototype.replaceAll = function(s, r) {
	    var index, str = this;
	    while ((index = str.indexOf(s)) != -1)
	        str = str.substring(0, index) + r + str.substr(index + s.length, str.length);
	    return str;
	};
	//formats url string into a usable text string
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
	}
		//updates css to show current tab depending on what form the user is sent to
	function changeTab(str){
		
		if (str=="rule"){
			$("#tab3").click();
		} else if (str=="attr"){
			$("#tab2").click();
		} else if (str=="action"){
			$("#tab4").click();
		} else if (str=="summary"){
			$("#tab5").click();
		} else {
			$("#tab1").click();
		}
		
		actionPlaceHolder = -1;

		
	}

//Group of functions to load JSON data from local storage
	//saves the system description to the expertJSON object
	function saveSystemInfo() {
		if ($("#newSystemName").val() == "" || $("#newExpertName").val() == "") {
			alert("System must have Name and Expert Name");
			return;
		}
		expertJSON.description["SystemName"] = $("#newSystemName").val();
		expertJSON.description["ExpertName"] = $("#newExpertName").val();
		expertJSON.description["SystemDesc"] = $("#newSystemDescription").val();
		changeTab('attr');
		
		
	}
	//resaves the system description to the expertJSON object
	function updateDescription() {
		if (!("description" in expertJSON)) {
			expertJSON.description = {};
		}
		$("#newSystemName").val(expertJSON.description["SystemName"]); 
		$("#newExpertName").val(expertJSON.description["ExpertName"]);
		$("#newSystemDescription").val(expertJSON.description["SystemDesc"]); 
	}
	//loads the json string from the url and saves in local object
	function loadFromParam() {
		var urlJSON = parseQuery("jsonString");
		if (urlJSON == undefined) {
			return null;
		} else {
			expertJSON = engineToExpertJson(JSON.parse(urlJSON));
			$("#showJSON").html(JSON.stringify(expertJSON));
			redoSummary();
		}
	}
	//sets the JSON object in window.localStorage and forwards the page to user UI
	function sendToUserUILocal() { 
	
	// window.localStorage.setItem("kbSentExpert" , JSON.stringify(expertJSON));
	
	window.localStorage.setItem("ExpertJSON" , JSON.stringify(expertToEngineJson(expertJSON)));
    	console.log('retrievedObject: ',  window.localStorage.getItem("ExpertJSON"));
    	
	// var flagACS = window.localStorage.getItem("acsJSON");
	
    
 //   if (flagACS === null) {
 //   	window.localStorage.setItem("ExpertJSON" , JSON.stringify(expertToEngineJson(expertJSON)));
 //   	console.log('retrievedObject: ',  window.localStorage.getItem("ExpertJSON"));
    	
 //   } else {
 //   	//should be able to grab ACS from userui;
 //   }
	window.location.href = 'UserUI_For_Expert/expert.html';

}
	//saves expertJSON in a textfile and downlads to user computer
function writeToTextFile(){
	console.log('retrievedObject: ',  expertJSON);
	var jsonString = JSON.stringify(expertToEngineJson(expertJSON));
	var MIME_TYPE = "text/plain";
	var blob = new Blob([jsonString], {type: MIME_TYPE});
	saveAs(blob, "expert.json");
	console.log('retrievedObjectAfter: ',  expertJSON);
	
	// if(dontFinishCascade){
	// 	alert("There are rules that need to be modified!!")
	// } else {
	// 	var jsonString = JSON.stringify(expertToEngineJson(expertJSON));
	// 	const MIME_TYPE = 'text/plain';
	// 	var blob = new Blob([jsonString], {type: MIME_TYPE});
	// 	saveAs(blob, "expert.json");
	// }
	// window.location.href = 'app.html';
}
	//sends the JSON object to userui via url string
	function sendToUserUI() { 
	var formHTML = ''
+	'<form id="sendForm" action="UserUI_For_Expert/expert.html" method="GET">'
 +   '<input type="hidden" id="jsonString" name="jsonString" />'
  +  '<input type="submit" />'
+	'</form>';
	
//	$("#hiddenJSON").append(formHTML);
	
	document.getElementById("jsonString").value = JSON.stringify(expertToEngineJson(expertJSON));

	console.log(JSON.parse(document.getElementById("jsonString").value));
	document.getElementById("sendForm").submit();

	
}

//debugging functions tied to temp debugging buttons
	function trial () {
		expertJSON = JSON.parse('{"identifiers":[],"attributes":[{"type":2,"identifier":{"name":"sex","question":"","values":["female","male"]}},{"type":4,"identifier":{"name":"age","question":""},"ranges":[{"lower":{"value":20,"inc":true},"upper":{"value":20,"inc":true}}]},{"type":2,"identifier":{"name":"past medical history","question":"whatevs","values":["gardner\'s syndrome","estrogen therapy","abnormal uterine bleeding","failure of ovulation","infertility","ulcerative colitis","polyps","colon or rectal cancer","breast cancer"]}},{"type":1,"identifier":{"name":"obesity","question":"do you have obesity"}},{"type":2,"identifier":{"name":"cancers at an increased risk","question":"trees","values":["lung cancer","endometrial cancer","colon or rectal cancer","cervical cancer","breast cancer"]}}],"rules":[],"actions":[]}');
		$("#showJSON2").append('{"name":"risk1","antecedents":[[{"identifier":{"name":"sex","question":"What is your sex?","values":["male","female"]},"relation":100,"values":[[1]]}],[{"identifier":{"name":"age","question":"How old are you?"},"relation":204,"value":20}],[{"identifier":{"name":"past medical history","question":"What is your past medical history?","values":["breast cancer","colon or rectal cancer","polyps","ulcerative colitis","infertility","failure of ovulation","abnormal uterine bleeding","estrogen therapy","gardner\'s syndrome"]},"relation":100,"values":[[4,5,6,7]]},{"identifier":{"name":"obesity","question":"Do you have obesity?"},"relation":100,"value":true}]],'
		+ '"consequents":[{"identifier":{"name":"cancers at an increased risk","question":"ERROR: SHOULD NOT SEE THIS","values":["breast cancer","cervical cancer","colon or rectal cancer","endometrial cancer","lung cancer"]},"values":[2,3]}],"commands":[]}'
	);
		
		fillRule(JSON.parse(
			'{"name":"risk1","antecedents":[[{"identifier":{"name":"sex","question":"What is your sex?","values":["male","female"]},"relation":100,"values":[[1]]}],[{"identifier":{"name":"age","question":"How old are you?"},"relation":204,"value":20}],[{"identifier":{"name":"past medical history","question":"What is your past medical history?","values":["breast cancer","colon or rectal cancer","polyps","ulcerative colitis","infertility","failure of ovulation","abnormal uterine bleeding","estrogen therapy","gardner\'s syndrome"]},"relation":100,"values":[[4,5,6,7]]},{"identifier":{"name":"obesity","question":"Do you have obesity?"},"relation":100,"value":true}]],'
	
			+'"consequents":[{"identifier":{"name":"cancers at an increased risk","question":"ERROR: SHOULD NOT SEE THIS","values":["breast cancer","cervical cancer","colon or rectal cancer","endometrial cancer","lung cancer"]},"values":[2,3]}],"commands":[]}'))
	}
	function produceTest() {

	$("#showJSON2").html(JSON.stringify(expertJSON, null, "  "));
}

//Group of functions to present Rules for editing
	//takes a rule object from JSON object and loads values into the
	//make rule screen for editing.
	function fillRule(theRule) {
		$("#antiHolder").html(antiHTML);
		$("#consHolder").html(consHTML);
		$("#addRuleName").val(theRule.name);
		
		antecedentCounter = 0;
	    consequenceCounter = 0;
	    
		//anti is list of lists
	
		//these are the ANDS
		for (var antiCount = 0; antiCount < theRule.antecedents.length; antiCount++) {
			andsOrsList.push('AND');
			processInnerList(theRule.antecedents[antiCount]);
			andsOrsList.pop();
		}
		
		for(var prefixCount = 0; prefixCount < andsOrsList.length; prefixCount++){
			if (prefixCount != 0) {
				$("#antiSelect" + prefixCount).val(andsOrsList[prefixCount]);
			}
		}
		andsOrsList = [];
		
		for (var conCount = 0; conCount < theRule.consequents.length; conCount++) {
			processConList(theRule.consequents[conCount]);
			
		}
		
		if (theRule.commands.length > 0) {
			for (var commer = 0; commer < theRule.commands.length; commer++) {
				processCommands(theRule.commands[commer]);
			}
		}
		
		if (consequenceCounter == -1) {
				consequenceCounter = 0;
		}
		if (antecedentCounter == -1) {
				antecedentCounter = 0;
		}
	}
	//takes the command values from the JSON object and loads into the rule screen for editing
	function processCommands(command) {
		if (command.type == 417) {
			addRuleDisplay();
			$("#ruleActionAttribValue").val(command.identifier.name);
		} else if (command.type = 431) {
			//message
			addRuleMessage();
			$("#ruleTextArea").val(command.message);
		}
	}
	//sends consequences to be split up by value and loaded into rule screen for editing
	function processConList(conItem) {
	
			if (conItem.values != null || conItem.value != null) {
				processConsMultipleValues(conItem);
			} else {
				//unchecked Code
				if (antecedentCounter != 0) {
					if (antecedentCounter == -1) {
						antecedentCounter = 0;
						addAnti2();
					} else {
						addAnti2();	
					}
					
				} else {
					updateSpecificAntiRuleAttrib(antecedentCounter);	
				}
		
				var checker2 = antiList[tempCount].value;
				
				if ((checker2 == true) || (checker2 == false)) {
					
					$("#antiAttrib" + antecedentCounter).val(antiList[tempCount].identifier.name);
					updateAntiAttribVal(antecedentCounter);
					$("#antiAttribType" + antecedentCounter).val(relationFinder(antiList[tempCount].relation));
					if (checker2) {
						$("#antiAttribValue" + antecedentCounter).val("true");					
					} else {
						$("#antiAttribValue" + antecedentCounter).val("true");		
					}
					
	
					$("#antiValHolder" + antecedentCounter).empty();
					$("#antiValHolder" + antecedentCounter).html('<input type="text" id="antiAttribValue' + antecedentCounter + '"/>');
					
	
	
					$("#antiAttrib" + antecedentCounter).val(antiList[tempCount].identifier.name);
				
					$("#antiAttribType" + antecedentCounter).val(relationFinder(antiList[tempCount].relation));
					$("#antiAttribValue" + antecedentCounter).val(antiList[tempCount].value);	
				}
	
			}
	}
	//loads each consequence on a seperate line in the rule screen
	//checks for type and loads different html for values (textbox vs checklist)
	function processConsMultipleValues(oneIden) {
		//checks if bool
		if (oneIden.value != null) {
			if (consequenceCounter != 0) {
						if (consequenceCounter == -1) {
							consequenceCounter = 0;
							addCons();
						} else {
							addCons();	
						}
						
					} else {
						updateSpecificConsRuleAttrib(consequenceCounter);	
					}
					$("#consAttribType" + consequenceCounter).val(oneIden.identifier.name);
				updateConsAttribVal(consequenceCounter);
				var newThing = oneIden.value;
	
				if(typeof(newThing) === "boolean"){
	
					if (newThing) {
						$("#consAttribValue" + consequenceCounter).val('true');
					} else {
						$("#consAttribValue" + consequenceCounter).val('false');
					}
				} else {
					if (getAttribType(oneIden.identifier.name) == 0) {
	
						var singleVal = oneIden.identifier.values[oneIden.value];
						$("#consAttribValue" + consequenceCounter).val(singleVal);
	
					} else {
						$("#consAttribValue" + consequenceCounter).val(newThing);	
					}
					
				}	
				
				
				if(consequenceCounter == 0) {
					consequenceCounter= -1;
				}
					
					
					
					
		} else {
			for (var finalCount = 0; finalCount<oneIden.values.length; finalCount++) {
		
					if (consequenceCounter != 0) {
						if (consequenceCounter == -1) {
							consequenceCounter = 0;
							addCons();
						} else {
							addCons();	
						}
						
					} else {
						updateSpecificConsRuleAttrib(consequenceCounter);	
					}
					
				
				
				$("#consAttribType" + consequenceCounter).val(oneIden.identifier.name);
				updateConsAttribVal(consequenceCounter);
				var newThing = oneIden.identifier.values[oneIden.values[finalCount]];
				$("#consAttribValue" + consequenceCounter).val(newThing);
				
				if(consequenceCounter == 0) {
					consequenceCounter= -1;
				}
				
			}
		}
		
	
	}

	//a wrapper function that updates the summary based on current expertJSON object
	function fillJSON() {
	//	expertJSON = JSON.parse('{"identifiers":[],"attributes":[{"type":2,"identifier":{"name":"sex","question":"What is your sex?","values":["male","female"]}},{"type":4,"identifier":{"name":"age","question":"How old are you"},"ranges":[{"lower":{"value":12,"inc":true},"upper":{"value":100,"inc":true}}]},{"type":1,"identifier":{"name":"currently sexually active","question":"Are you currently sexually active?"}},{"type":2,"identifier":{"name":"family history","question":"What is your family history?","values":["breast cancer","colon or rectal cancer","polyps","ulcerative colitis","infertility","failure of ovulation","abnormal uterine bleeding","estrogen therapy","gardner\'s syndrome"]}},{"type":2,"identifier":{"name":"past sexual history","question":"What is your past sexual history?","values":["multiple sexual partners","first intercourse before age eighteen"]}}],"rules":[],"actions":[{"type":431,"message":" this decision-support system will assess an individual for cancer risk and generate recommendations for appropriate screening tests. it is only for use with asymptomatic peopleand its suggestions are subject to the physician\'s judgement in every case. the recommendations, which only apply to screening for early cancer and not to screening for the detection of other diseases, are based on the latest american cancer society recommendations described in the cancer related health checkup american cancer society, feb. 8, 1980 note: this is an experimental system that has not been approved for use in practice! type 'continue.' to begin"},{"type":431,"message":"ok - let\'s begin by determining if the individual inquestion is at increased risk for any of the commontypes of cancer. "}]}');
		redoSummary();
	}
	//iterates over the inner layer of antecedents (ORS) and either
	//loads them on the rule screen or passes to processMultipleValues
	//for several values to be presented
	function processInnerList(antiList) {
	for (var tempCount = 0; tempCount < antiList.length; tempCount++) {
		if (antecedentCounter != 0 && (antiList[(tempCount+1)] != null)) {
			$("#antiSelect" + antecedentCounter).val("OR");
		}
		if (antiList[tempCount].values != null) {
			processMultipleValues(antiList[tempCount]);

		} else {
			andsOrsList.push('OR');
			if (antecedentCounter != 0) {
				if (antecedentCounter == -1) {
					antecedentCounter = 0;
					addAnti2();
				} else {
					addAnti2();	
				}
				
			} else {
				updateSpecificAntiRuleAttrib(antecedentCounter);	
			}
	
			var checker2 = antiList[tempCount].value;
			
			if ((checker2 == true) || (checker2 == false)) {
				
				$("#antiAttrib" + antecedentCounter).val(antiList[tempCount].identifier.name);
				updateAntiAttribVal(antecedentCounter);
				$("#antiAttribType" + antecedentCounter).val(relationFinder(antiList[tempCount].relation));
				if (checker2) {
					$("#antiAttribValue" + antecedentCounter).val("true");					
				} else {
					$("#antiAttribValue" + antecedentCounter).val("true");		
				}
				if(antecedentCounter == 0) {
					antecedentCounter= -1;
				}
				
			} else {
				
				$("#antiValHolder" + antecedentCounter).empty();

				$("#antiValHolder" + antecedentCounter).html('<input type="text" id="antiAttribValue' + antecedentCounter + '"/>');	
				$("#antiAttrib" + antecedentCounter).val(antiList[tempCount].identifier.name);
			
				$("#antiAttribType" + antecedentCounter).val(relationFinder(antiList[tempCount].relation));
				$("#antiAttribValue" + antecedentCounter).val(antiList[tempCount].value);	
				if(antecedentCounter == 0) {
					antecedentCounter= -1;
				}
			}

		}
		
	}
	
}
	//iterates through all of the values in the antecedent and displays
	//them on seperate lines
	function processMultipleValues(oneIden) {
	for (var finalCount = 0; finalCount<oneIden.values[0].length; finalCount++) {
		var valChecker = oneIden.values[0][(finalCount+1)];
		if (antecedentCounter != 0 && ( valChecker != null)) {
			$("#antiSelect" + antecedentCounter).val("OR");
		}
			if (antecedentCounter != 0) {
				if (antecedentCounter == -1) {
					antecedentCounter = 0;
					addAnti2();
				} else {
					addAnti2();	
				}
				
			} else {
				updateSpecificAntiRuleAttrib(antecedentCounter);	
			}
			
		
		
		$("#antiAttrib" + antecedentCounter).val(oneIden.identifier.name);
		updateAntiAttribVal(antecedentCounter);
		$("#antiAttribType" + antecedentCounter).val(relationFinder(oneIden.relation));

		var newThing = oneIden.identifier.values[oneIden.values[0][finalCount]];
		$("#antiAttribValue" + antecedentCounter).val(newThing);
		
		andsOrsList.push('OR');
		if(antecedentCounter == 0) {
			antecedentCounter= -1;
		}
		
	}
}
	
//Group of functions to get string list of antecedents out of rule
	//lists used for passing the string version of antecedents to summary functions
	var stringAndOrsList = [];
	var stringAntiList = [];
	//creates a string of all antecedents in order to be used in the summary area
	function createAntiString(theRule) {
		stringAntiList = [];
		stringAndOrsList = [];
		//these are the ANDS
		for (var antiCount = 0; antiCount < theRule.antecedents.length; antiCount++) {
			stringAndOrsList.push('AND');
			stringProcessInnerList(theRule.antecedents[antiCount]);
			stringAndOrsList.pop();
		}
		
		var finalList = []
		//need to add in ands
		for (var kk = 0; kk < stringAntiList.length; kk++) {
			if (kk==0) {
				finalList.push(stringAntiList[kk]);
			} else {
				finalList.push(stringAndOrsList[kk]);
				finalList.push(stringAntiList[kk]);
			}
		}
		
		stringAntiList = [];
		stringAndOrsList = [];
		return finalList;
	
	}
	//adds all antecedents in each inner OR list to a string array
	function stringProcessInnerList(antiList) {
		for (var tempCount = 0; tempCount < antiList.length; tempCount++) {

		if (antiList[tempCount].values != null) {
			stringProcessMultipleValues(antiList[tempCount]);

		} else {
			stringAndOrsList.push('OR');
			var checker2 = antiList[tempCount].value;
			
			if ((checker2 == true) || (checker2 == false)) {
				
				var name = antiList[tempCount].identifier.name;
				var relation = relationFinder(antiList[tempCount].relation);
				if (checker2) {
					var val = "true";					
				} else {
					var val = "true";		
				}
				stringAntiList.push(name + " " + relation + " " + val);
				
			} else {
				
				var name = antiList[tempCount].identifier.name;
			
				var relation = relationFinder(antiList[tempCount].relation);
				var val = antiList[tempCount].value;	
				
				stringAntiList.push(name + " " + relation + " " + val);

			}

		}
		
	}
	}
	//for antecedent with multiple values, adds each individually to string array
	function stringProcessMultipleValues(oneIden) {
	for (var finalCount = 0; finalCount<oneIden.values[0].length; finalCount++) {
		var name = oneIden.identifier.name;
		var relation = relationFinder(oneIden.relation);
		var val = oneIden.identifier.values[oneIden.values[0][finalCount]];
		
		stringAntiList.push(name + " " + relation + " " + val);
		
		stringAndOrsList.push('OR');
	}
}
	

//Helper methods to identify objects
	//returns the string version of relation object based on json formatted code
	function relationFinder(code) {
		if (code == 200 ||  code == 100) {
			return '=';
		} else if ( code == 201 ||  code == 101) {
			return '≠';
		} else if ( code == 202) {
			return '>';
		} else if ( code == 203) {
			return '<';
		} else if ( code == 204) {
			return '≥';
		} else if ( code == 205) {
			return '≤';
	}
	}
	//returns an int signifying the attribute type
	function getAttribType(attribName) {
		for (var e = 0; e < expertJSON.attributes.length; e++) {
			if (attribName == expertJSON.attributes[e].identifier.name) {
				return expertJSON.attributes[e].type;
			}
		}
		return null;
	}
	//iterates through the attributes list and returns first object 
	//that matches parameter name of attribute
	function findAttrib(attribName) {
    for (var listCount = 0; listCount < expertJSON.attributes.length; listCount++) {
        if (expertJSON.attributes[listCount].identifier.name == attribName) {
            return expertJSON.attributes[listCount];
        }        
    }
    return null;
}

//Adding new items to data structure
	//adds attribute to JSON object, passes to sub functions for each type of attribute
	function addAttrib() {
		if (checkForAttribErrors()) {
			return;
		}
	    var attriberType = $("#addAttribType").val();
	    if (attriberType == 'Multi') {
	        if (findAttrib($("#addAttribName").val()) == null) {
	        	addMultiValueAttr($("#addAttribName").val(), $("#addAttribPrompt").val(), collectMulAttribVals())
	    	}
	        $("#addAttribName").val("");
	        $("#addAttribPrompt").val("");
	        $("#addAttribValues").val("");
	        $("#showJSON").html(JSON.stringify(expertJSON));
	    } else if (attriberType == 'Single') {
	        if (findAttrib($("#addAttribName").val()) == null) {	
	        	addSingleValueAttr($("#addAttribName").val(), $("#addAttribPrompt").val(), collectMulAttribVals())
	    	}
	        $("#addAttribName").val("");
	        $("#addAttribPrompt").val("");
	        $("#addAttribValues").val("");
	        $("#showJSON").html(JSON.stringify(expertJSON));
	    } else if (attriberType == 'Bool') {
	    	if (findAttrib($("#addAttribName").val()) == null) {
	    		addBoolAttr($("#addAttribName").val(), $("#addAttribPrompt").val());
	    	}
	    	$("#addAttribName").val("");
	        $("#addAttribPrompt").val("");
	        $("#showJSON").html(JSON.stringify(expertJSON));
	    } else if (attriberType == 'Numeric') {
	    	//if decimal checked
	    	console.log($("#cDec").val());
	    	if ($("#cDec").prop('checked')) {
	   	    	if (findAttrib($("#addAttribName").val()) == null) {
	   	    		addRealAttr($("#addAttribName").val(), $("#addAttribPrompt").val(), $("#newMinNumericalValues").val() , $("#c1").prop('checked'), $("#newMaxNumericalValues").val(), $("#c2").prop('checked'));
		    	}
		    	$("#addAttribName").val(""); 
		    	$("#addAttribPrompt").val(""); 
		    	$("#newMinNumericalValues").val("");
		    	$("#c1").prop('checked', false);
		    	$("#newMaxNumericalValues").val(""); 
		    	$("#c2").prop('checked', false);
		    	$("#cDec").prop('checked', false);
		    	$("#showJSON").html(JSON.stringify(expertJSON));
	    	} else {
		    	if (findAttrib($("#addAttribName").val()) == null) {
		    		addNumericalAttr($("#addAttribName").val(), $("#addAttribPrompt").val(), $("#newMinNumericalValues").val() , $("#c1").prop('checked'), $("#newMaxNumericalValues").val(), $("#c2").prop('checked'));
		    	}
		    	$("#addAttribName").val(""); 
		    	$("#addAttribPrompt").val(""); 
		    	$("#newMinNumericalValues").val("");
		    	$("#c1").prop('checked', false);
		    	$("#newMaxNumericalValues").val(""); 
		    	$("#c2").prop('checked', false);
		    	$("#showJSON").html(JSON.stringify(expertJSON));
	    	}	
	    }
	    updateRuleAttrib();
	    updateActionAttribs();	
	    	
		redoSummary();
	}
	//adds action to JSON
	function addAction() {
		
		// changeTab('action');
		var actionSelector = $("#actionSelect").val();
		if (actionSelector == 'Display Message') {
			var texter = $("#actionText").val();
			var newItem = {};
			newItem.type = 431;
			//numbers here are char in line length
			//MAGIC NUMBER
			//newItem.lines = texter.match(/.{1,60}/g);
			newItem.message = texter;
			if (newItem.message != "") {
				if (actionPlaceHolder != -1) {
					expertJSON.actions.splice(actionPlaceHolder, 0, newItem);	
					actionPlaceHolder = -1;
				} else {
					expertJSON.actions.push(newItem);	
				}
			}
			
			$("#actionText").val("");
		} else if (actionSelector == 'Display Attribute') {
			var selecter = $("#actionAttribSelect").val();
			var newItem = {};
			newItem.type = 417;
			if (selecter != "Pick Attribute") {
				newItem.identifier = findAttrib(selecter).identifier;
				updateActionAttribs();
				if (actionPlaceHolder != -1) {
					expertJSON.actions.splice(actionPlaceHolder, 0, newItem);	
					actionPlaceHolder = -1;
				} else {
					expertJSON.actions.push(newItem);	
				}
			}
	
		}
		else if (actionSelector == 'Obtain Attribute') {
			var selecter = $("#actionAttribSelect").val();
			var newItem = {};
			newItem.type = 422;
			if (selecter != "Pick Attribute") {
				newItem.identifier = findAttrib(selecter).identifier;
				updateActionAttribs();
				if (actionPlaceHolder != -1) {
					expertJSON.actions.splice(actionPlaceHolder, 0, newItem);	
					actionPlaceHolder = -1;
				} else {
					expertJSON.actions.push(newItem);	
				}
			}
		}
		$("#showJSON").html(JSON.stringify(expertJSON));
		redoSummary();
	}
	//adds rule to JSON, relies on collectAnti and collectCons to parse main rule contents into JSON format
	function addRule() {
	if (checkForRuleErrors()) {
		return;
	}
	var antiList = collectAnti();
	var conList = collectCons();
	var ruleName = $("#addRuleName").val();
	var newItem = {};
	newItem.name = ruleName;
	newItem.antecedents = antiList;
	newItem.consequents = conList;
	newItem.commands = [];
	$("#addRuleName").val("");

	if ($("#ruleActionAttribValue").length) {
		var ruleActionSelector = $("#ruleActionAttribValue").val();
		if (ruleActionSelector == 'Pick Value of Attribute') {
			// nothing happens
		} else {
			var selecter = $("#ruleActionAttribValue").val();
			console.log(selecter);
			var newComm = {};
			newComm.type = 417;
			newComm.identifier = findAttrib(selecter).identifier;
			updateRuleAttrib();
			newItem.commands.push(newComm);
		}
	}
	
	if ($("#ruleTextArea").length) {
		var texter = $("#ruleTextArea").val();
			if (texter != "") {
				var newComm = {};
				newComm.type = 431;
				newComm.message = texter;
				newItem.commands.push(newComm);
				$("#ruleTextArea").val("");	
			}	
	}
	
	
	
	
	if (newItem.antecedents.length != 0 && newItem.consequents.length != 0 && ruleName != "") {
		expertJSON.rules.push(newItem);
	}
	updateRuleAttrib();
	$("#showJSON").html(JSON.stringify(expertJSON));
	$("#ruleDisplayArea").html("");
	$("#ruleMessageArea").html("");
	redoSummary();
} 

//Add Attrib supporting Items
	//parses and adds a bool type attribute to JSON object
	function addBoolAttr(name, question) {
		var newAtt = {};
	    newAtt.type = 1;
	    var identer = {};
	    identer.name = name;
	    identer.question = question;
	    newAtt.identifier = identer;
		if (name != "") {
			expertJSON.attributes.push(newAtt);	
		}
		
	    return true;
	}
	//parses and adds an integer type attribute to JSON object
	function addNumericalAttr(name, question, minVal, minIncl, maxVal, maxIncl) {
	    //{"type":4,"identifier":{"name":"age","question":"How old are you?"},"ranges":[{"lower":{"value":12,"inc":true},"upper":{"value":100,"inc":false}}]}
	    var newAtt = {};
	    newAtt.type = 4;
	    var identer = {};
	    identer.name = name;
	    identer.question = question;
	    newAtt.identifier = identer;
	    newAtt.ranges = [];
	    newAtt.ranges.push({});
	    newAtt.ranges[0].lower = {};
	    newAtt.ranges[0].upper = {};
	    newAtt.ranges[0].lower.value = parseInt(minVal);
	    newAtt.ranges[0].upper.value = parseInt(maxVal);
	    newAtt.ranges[0].lower.inc = minIncl;
	    newAtt.ranges[0].upper.inc = maxIncl;
	    
	    if (name != "") {
			expertJSON.attributes.push(newAtt);	
		}
	    return true;
	    
	}
	//parses and adds an float type attribute to JSON object
	function addRealAttr(name, question, minVal, minIncl, maxVal, maxIncl) {
	    //{"type":4,"identifier":{"name":"age","question":"How old are you?"},"ranges":[{"lower":{"value":12,"inc":true},"upper":{"value":100,"inc":false}}]}
	    var newAtt = {};
	    newAtt.type = 3;
	    var identer = {};
	    identer.name = name;
	    identer.question = question;
	    newAtt.identifier = identer;
	    newAtt.ranges = [];
	    newAtt.ranges.push({});
	    newAtt.ranges[0].lower = {};
	    newAtt.ranges[0].upper = {};
	    newAtt.ranges[0].lower.value = parseFloat(minVal);
	    newAtt.ranges[0].upper.value = parseFloat(maxVal);
	    newAtt.ranges[0].lower.inc = minIncl;
	    newAtt.ranges[0].upper.inc = maxIncl;
	    
	    if (name != "") {
			expertJSON.attributes.push(newAtt);	
		}
	    return true;
	    
	}
	//parses and adds a multi value type attribute to JSON object
	function addMultiValueAttr(name, question, valuesList) {
	    var newAtt = {};
	    newAtt.type = 2;
	    var identer = {};
	    identer.name = name;
	    identer.question = question;
	    identer.values = valuesList;
	    newAtt.identifier = identer;
		if (name !="" && valuesList.length!=0) {
			expertJSON.attributes.push(newAtt);
		}
	    
	    return true;
	}
	//parses and adds an single value type attribute to JSON object
	function addSingleValueAttr(name, question, valuesList) {
	    var newAtt = {};
	    newAtt.type = 0;
	    var identer = {};
	    identer.name = name;
	    identer.question = question;
	    identer.values = valuesList;
	    newAtt.identifier = identer;
		if (name !="" && valuesList.length!=0) {
			expertJSON.attributes.push(newAtt);
		}
	    
	    return true;
	}
	//for single and multi val attributes, adds another space for an attribute value to be entered
	function addAttribValSpace() {
		attribValsCounter++;
		$("#mulAttribVals").append('<input type="text" id="addAttribValue' + attribValsCounter + '"/>')
	
	}
	//collects all values entered for single or multi val attributes and returns them in a list
	function collectMulAttribVals() {
		var attVals = [];
	    while (attribValsCounter >= 0) {
	    	var valVal = "#addAttribValue" + attribValsCounter;
	    	if ($(valVal).length) {
		        var theValVal = $(valVal).val();
		        if (theValVal != "") {
		        	attVals.push(theValVal);    		
		        }
	    	}
	    	attribValsCounter--;
	    }
	
		var originalValList = '<input type="text" id="addAttribValue0"/>';
		$("#mulAttribVals").html(originalValList);    
		attribValsCounter = 0;
		attVals.reverse();
	   	return attVals;
	}
	//updates the html to display the properly formatted form depending on drop down selection
	function changeAttribForm() {
	    var attribType = $("#addAttribType").val();
	    var tempName = $("#addAttribName").val();
	    console.log(attribType);
	    if (attribType == 'Single') {
	        $('#mainAttribSection').html(singleValueHtml);
	    } else if (attribType == 'Multi') {
	         $('#mainAttribSection').html(multiValueHtml);
	    } else if (attribType == 'Numeric') {
	        $('#mainAttribSection').html(numValueHtml);
	    } else if (attribType == 'Bool') {
	    	$('#mainAttribSection').html(boolValueHtml);
	    }
	    $("#addAttribName").val(tempName);
	}
	//links to button onclick
	function addAttribWrap() {
        addMultiValueAttr($('#newAttribute').val(), $('#newAttributePrompt').val(), collectAttrVals());
        $('#newAttribute').val(""); 
        $('#newAttributePrompt').val("");
    }

//Add rule Supporting Items
    //adds a new antecedent row to rule screen
	function addAnti() {
    	
    	if ($("#antiSelect" + (antecedentCounter + 1)).val() == "") {
    		return false;
    	}
    	
        antecedentCounter++;
        var newHTML = '<div class="head col span_3_of_8 accent">'
+'						<select id="antiAttrib' + antecedentCounter + '" onchange="updateAntiAttribVal(' + antecedentCounter + ')">'
+'		                    <option>Pick Attribute</option>'
+'		                    <option>sex</option>'
+'		                    <option>american cancer society recommendations</option>'
+'		                    <option>past sexual history</option>'
+'		                </select>'
+'					</div>'
+'					<div class="head col span_1_of_8 ifSpace accent">'
+'					    <select id="antiAttribType' + antecedentCounter + '">'
+'		                    <option>= </option>'
+'		                    <option>&ne; </option>'
+'		                    <option>&lt; </option>'
+'		                    <option>&gt; </option>'
+'		                    <option>&le; </option>'
+'		                    <option>&ge; </option>'
+'		                </select>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<div id="antiValHolder' + antecedentCounter + '">'
+'						    <select id="antiAttribValue' + antecedentCounter + '">'
+'			                    <option>Pick Value of Attribute</option>'
+'			                </select>'
+'			            </div>    '
+'					</div>'
        $("#sectionGroup" + antecedentCounter).append(newHTML);
        
        var newSelecterHtml = '<div class="section group" id="sectionGroup' + (antecedentCounter + 1) + '">'
+'					<div class="head col span_1_of_8 ifSpace">'
+'					    <select id="antiSelect' + (antecedentCounter + 1) + '" onchange="addAnti()">'
+'					    	<option></option>'
+'					    	<option>AND</option>'
+'					    	<option>OR</option>'
+'					    </select>'
+'					</div>'
					
+'				</div>'
				
		$("#antiHolder").append(newSelecterHtml);
		updateSpecificAntiRuleAttrib(antecedentCounter);
        
    } 
	//same as addAnti but it is needed to bypass blank value option for rule editing 
	//(removed the null check at start of addAnti)
	function addAnti2() {

        antecedentCounter++;
        var newHTML = '<div class="head col span_3_of_8 accent">'
+'						<select id="antiAttrib' + antecedentCounter + '" onchange="updateAntiAttribVal(' + antecedentCounter + ')">'
+'		                    <option>Pick Attribute</option>'
+'		                    <option>sex</option>'
+'		                    <option>american cancer society recommendations</option>'
+'		                    <option>past sexual history</option>'
+'		                </select>'
+'					</div>'
+'					<div class="head col span_1_of_8 ifSpace accent">'
+'					    <select id="antiAttribType' + antecedentCounter + '">'
+'		                    <option>= </option>'
+'		                    <option>&ne; </option>'
+'		                    <option>&lt; </option>'
+'		                    <option>&gt; </option>'
+'		                    <option>&le; </option>'
+'		                    <option>&ge; </option>'
+'		                </select>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<div id="antiValHolder' + antecedentCounter + '">'
+'						    <select id="antiAttribValue' + antecedentCounter + '">'
+'			                    <option>Pick Value of Attribute</option>'
+'			                </select>'
+'			            </div> '   
+'					</div>'
        $("#sectionGroup" + antecedentCounter).append(newHTML);
        
        var newSelecterHtml = '<div class="section group" id="sectionGroup' + (antecedentCounter + 1) + '">'
+'					<div class="head col span_1_of_8 ifSpace">'
+'					    <select id="antiSelect' + (antecedentCounter + 1) + '" onchange="addAnti()">'
+'					    	<option></option>'
+'					    	<option>AND</option>'
+'					    	<option>OR</option>'
+'					    </select>'
+'					</div>'
					
+'				</div>'
				
		$("#antiHolder").append(newSelecterHtml);
		updateSpecificAntiRuleAttrib(antecedentCounter);
        
    }    
    //adds a new consequence row to rule screen
	function addCons() {
        consequenceCounter++;
        var newHTML = '<div class="section group">'
		+'			<div class="head col noMargin span_1_of_8 ifSpace">'
		+'					<h3>And</h3>'
		+'				</div>'
		+'				<div class="head col span_3_of_8 accent">'
		+'					<select id="consAttribType' + consequenceCounter + '" onchange="updateConsAttribVal(' + consequenceCounter + ')">'
		+'	                    <option>Pick Attribute</option>'
		+'	                    <option>At risk</option>'
		+'	                    <option>american cancer society recommendations</option>'
		+'	                    <option>past sexual history</option>'
		+'	                </select>'
		+'				</div>'
		+'				<div class="head col span_1_of_8 ifSpace">'
		+'				    <h3>=</h3>'
		+'				</div>'
		+'				<div class="head col span_3_of_8 accent">'
		+'					<div id="consValHolder' + consequenceCounter + '">'
		+'				    <select id="consAttribValue' + consequenceCounter + '">'
		+'	                    <option>Pick Value of Attribute</option>'
		+'	                </select>'
		+'	                </div>'
		+'				</div>'
		+'			</div>'
        $("#consHolder").append(newHTML);
        updateSpecificConsRuleAttrib(consequenceCounter);
    }
    //placeholder to be called upon a change in the add action section of the rules screen
	function ruleActionChange() {
	//("#ruleTextArea").val("");
	}    
	//returns the JSON formatted code for a relation depending on relation text and type of identifier relation is for
	function symbolToRelation(attribObj, symbol) {
		//if is numeric
		console.log("type" +attribObj.type);
		if (attribObj.type == 3 || attribObj.type == 4) {
			if (symbol == '=') {
				return 200;
			} else if (symbol == '≠') {
				return 201;
			} else if (symbol == '>') {
				return 202;
			} else if (symbol == '<') {
				return 203;
			} else if (symbol == '≥') {
				return 204;
			} else if (symbol == '≤') {
				return 205;
			}
		} else {
			if (symbol == '=') {
				return 100;
			} else {
				return 101;
			}
		}
	}
    //produces List of all antecedents in forms ready for json
	function collectAnti() {
        //"antecedents":[[{"identifier":{"name":"sex","question":"What is your sex?",
        // "values":["male","female"]},"relation":100,"values":[[1]]}],[{"identifier":
        // {"name":"age","question":"How old are you?"},"relation":204,"value":20}],
        // [{"identifier":{"name":"past sexual history","question":"What is your past sexual history?",
        // "values":["multiple sexual partners","first intercourse before age eighteen"]},"relation":100,
        // "values":[[0,1]]}]]
        var antis = [];
        while (antecedentCounter >= 0) {
            var newItem = [];
            newItem.push({});
            var idName = "#antiAttrib" + antecedentCounter
            var attribName = $(idName).val();
            
            if (attribName == "Pick Attribute") {
            	antecedentCounter--;
            	continue;
            }
            var attribObj = findAttrib(attribName).identifier;
            newItem[0].identifier = attribObj;
            
            var idRelation = $("#antiAttribType" + antecedentCounter).val();
            //need to understand relation types??
            newItem[0].relation = symbolToRelation(findAttrib(attribName), idRelation);
            
            var currSelect = $("#antiSelect" + antecedentCounter).val();
            
            //if ident contains values, then match , otherwise place
            //Need to modify to accept multiple values
            var idName2 = "#antiAttribValue" + antecedentCounter;
            var resultVal = $(idName2).val();
            
            if ("values" in attribObj) {
                var valList = newItem[0].identifier.values;
                var hitList = [];
                var hitCounter = 0;
                while (hitCounter < valList.length) {
                    if (valList[hitCounter] == resultVal) {
                        hitList.push(hitCounter);
                    }
                    hitCounter++;
                }
                newItem[0].values = [];
                                        
                newItem[0].values.push(hitList);
            } else {
            	if (resultVal == 'true' || resultVal == 'false') {
            		if (resultVal == 'true') {
            			newItem[0].value = true;
            		} else if (resultVal == 'false') {
            			newItem[0].value = false;	
            		}
            		
            	} else {
            		newItem[0].value = parseInt(resultVal);
            	}
                    
            }
            
            antis.push(newItem);
            antis.push(currSelect);
            
            
            antecedentCounter--;
        }
        
        antecedentCounter = 0;
    	
    	antis.reverse();
    	$("#antiHolder").html(antiHTML);	
        var antis2 = [];
        var tempAnti = [];
        for (var tt = 0; tt < antis.length; tt++) {
        	if ((tt % 2) == 0) {
        		if (antis[tt] == 'AND') {
        			antis2.push(tempAnti);
        			tempAnti = [];
        		}
        	} else {
        		tempAnti.push(antis[tt][0]);
        	}
        }
        antis2.push(tempAnti);
        
        
        antis3 = consolidateMultipleVals(antis2);
        //$("#showJSON2").html(antis3);
        return antis3;
    }  
    //iterates through a list of antecedents and combines all entries of same name with 
    //differing values into a single object with same name and multiple values in a single array
	function consolidateMultipleVals(antiList) {
    	var finalList = [];
    	for (var tt=0; tt < antiList.length; tt++) {
    		var tempList = antiList[tt];
    		var nameValues = {};
    		for (var ert=0;ert<tempList.length;ert++) {
    			if ("values" in tempList[ert]) {
	    			if (tempList[ert].identifier.name in nameValues) {
	    				var namer = tempList[ert].identifier.name;
	    				nameValues[namer].push(tempList[ert].values[0][0]);
	    			} else {
	    				var namer = tempList[ert].identifier.name;
	    				nameValues[namer] = [];
	    				nameValues[namer].push(tempList[ert].values[0][0]);
	    			}
    			}	
    		}
    		
    		for (var bbb=0;bbb<tempList.length;bbb++) {
    			if (tempList[bbb].identifier.name in nameValues) {
    				var namer2 = tempList[bbb].identifier.name;
					tempList[bbb].values[0] = nameValues[namer2];
    			}
    		}
    		
    		var seenList = [];
    		var newTempList = [];
    		for (var ccc=0;ccc<tempList.length;ccc++) {
    			console.log(seenList);
    			console.log(tempList[ccc].identifier.name);
    			if (seenList.indexOf(tempList[ccc].identifier.name) != -1) {
    				
    			} else {
    				seenList.push(tempList[ccc].identifier.name);
    				newTempList.push(tempList[ccc]);
    			}
    		}
    		
    		
    		finalList.push(newTempList);
    	}
    	return finalList;
    	
    }
    //iterates through a list of consequences and combines all entries of same name with 
    //differing values into a single object with same name and multiple values in a single array
	function consolidateConsMultipleVals(consList) {


    		var tempList = consList;
    		var nameValues = {};
    		for (var ert=0;ert<tempList.length;ert++) {
    			if ("values" in tempList[ert]) {
	    			if (tempList[ert].identifier.name in nameValues) {
	    				var namer = tempList[ert].identifier.name;
	    				nameValues[namer].push(tempList[ert].values[0]);
	    			} else {
	    				var namer = tempList[ert].identifier.name;
	    				nameValues[namer] = [];
	    				nameValues[namer].push(tempList[ert].values[0]);
	    			}
    			}	
    		}
    		
    		for (var bbb=0;bbb<tempList.length;bbb++) {
    			if (tempList[bbb].identifier.name in nameValues) {
    				var namer2 = tempList[bbb].identifier.name;
					tempList[bbb].values = nameValues[namer2];
    			}
    		}
    		
    		var seenList = [];
    		var newTempList = [];
    		for (var ccc=0;ccc<tempList.length;ccc++) {
    			console.log(seenList);
    			console.log(tempList[ccc].identifier.name);
    			if (seenList.indexOf(tempList[ccc].identifier.name) != -1) {
    				
    			} else {
    				seenList.push(tempList[ccc].identifier.name);
    				newTempList.push(tempList[ccc]);
    			}
    		}
    		
    	newTempList.reverse();
    	return newTempList;
    	
    }
	//produces List of all consequences in forms ready for json
	function collectCons() {
	    //    "consequents":[{"identifier":{"name":"cancers at an increased risk","question":"ERROR: SHOULD NOT SEE THIS",
	    //    "values":["breast cancer","cervical cancer","colon or rectal cancer","endometrial cancer","lung cancer"]},"values":[3]}]
	        var cons = [];
	        while (consequenceCounter >= 0) {
	            var newItem = [];
	            newItem.push({});
	            var idName = "#consAttribType" + consequenceCounter
	            var attribName = $(idName).val();
	            var attribObj = findAttrib(attribName).identifier;
	            newItem[0].identifier = attribObj;
	            
	            //need to understand relation types??
	            //newItem[0].relation = 100;
	            
	            
	            //if ident contains values, then match , otherwise place
	            //Need to modify to accept multiple values
	            var idName2 = "#consAttribValue" + consequenceCounter;
	            var resultVal = $(idName2).val();
	            if ("values" in attribObj) {
	                var valList = newItem[0].identifier.values;
	                var hitList = [];
	                var hitCounter = 0;
	                while (hitCounter < valList.length) {
	                    if (valList[hitCounter] == resultVal) {
	                        hitList.push(hitCounter);
	                    }
	                    hitCounter++;
	                }
	                //newItem[0].values = [];
	                if (getAttribType(attribName) == 0 && hitList.length == 1) {
	                	newItem[0].value = hitList[0];
	                } else {
	                	newItem[0].values = (hitList);	
	                }
	                
	            }  else {
	            	if (resultVal == 'true' || resultVal == 'false') {
	            		if (resultVal == 'true') {
	            			newItem[0].value = true;
	            		} else {
	            			newItem[0].value = false;
	            		}
	            	} else {
	            		newItem[0].value = parseInt(resultVal);
	            	}
	                    
	            }
	            
	           
	            
	            //changed to return only single list.  
	            //need to test for code dropoff
	            
	            cons.push(newItem[0]);
	            
	            consequenceCounter--;
	        }
	        
	        consequenceCounter = 0;
	        $("#consHolder").html(consHTML);
	        
	        var cons2 = consolidateConsMultipleVals(cons);
	
	        cons2.reverse();
	        return cons2;
	    }     
	//DEPRECATED - produces list of comma seperated values from attrib values textbox
	function collectAttrVals(){
	        var lister = $("#newAttributeValues").val().split(",");
	        $("#newAttributeValues").val("");
	        return lister;
	    }
	//updates the attributes lists in rule section to match current set of attributes
	function updateRuleAttrib() {
		var attribsList = collectAttribNames();
		console.log(attribsList);
		var antiAttribCounter = 0;
		var consAttribCounter = 0;
		while (antiAttribCounter <= antecedentCounter) {
	
			$("#antiAttrib" + antiAttribCounter).empty();
			$("#antiAttrib" + antiAttribCounter).append('<option>Pick Attribute</option>');
			
			$("#consAttribType" + antiAttribCounter).empty();
			
			attribsList.forEach(function (attriber) {
				$("#antiAttrib" + antiAttribCounter).append('<option value="'+ attriber + '">' + attriber + '</option>');
			});
			antiAttribCounter++;
		}
		while (consAttribCounter <= consequenceCounter) {
			
			$("#consAttribType" + consAttribCounter).empty();
			$("#consAttribType" + consAttribCounter).append('<option>Pick Attribute</option>');		
			
			attribsList.forEach(function (attriber) {
				$("#consAttribType" + consAttribCounter).append('<option value="'+ attriber + '">' + attriber + '</option>');
			});
			consAttribCounter++;
		}
		if ($("#ruleActionAttribValue").length){
			updateRuleDisplayAttrib();
		}
	
	
	}
	//updates the display attribute drop down in rule screen to match list of current attributes
	function updateRuleDisplayAttrib(){
			$("#ruleActionAttribValue").empty();
			$("#ruleActionAttribValue").append('<option>Pick Value of Attribute</option>');		
			var attribsList = collectAttribNames();
			attribsList.forEach(function (attriber) {
				$("#ruleActionAttribValue").append('<option value="'+ attriber + '">' + attriber + '</option>');
			});
	}
	//takes in a row # and updates the values dropdown for list of attributes in antecedent
	function updateSpecificAntiRuleAttrib(lineNum) {
		var attribsList = collectAttribNames();
	
			$("#antiAttrib" + lineNum).empty();
			$("#antiAttrib" + lineNum).append('<option>Pick Attribute</option>');
			
			attribsList.forEach(function (attriber) {
				$("#antiAttrib" + lineNum).append('<option value="' + attriber + '">' + attriber + '</option>');
			});
	}
	//takes in a row # and updates the values dropdown for list of attributes in consequence
	function updateSpecificConsRuleAttrib(lineNum) {
		var attribsList = collectAttribNames();
	
			$("#consAttribType" + lineNum).empty();
			$("#consAttribType" + lineNum).append('<option>Pick Attribute</option>');
			
			attribsList.forEach(function (attriber) {
				$("#consAttribType" + lineNum).append('<option value="' + attriber + '">' + attriber + '</option>');
			});
	}
	//takes in a row # and updates the values dropdown for antecedents depending on which value is selected
	function updateAntiAttribVal(lineNum) {
		//need to remove less than for multi/singlevals
		var tempAttribName = $("#antiAttrib" + lineNum).val();
		var attribVals = getAttributeValues(tempAttribName);
		var attribTyper = getAttribType(tempAttribName);
		if (attribTyper == 0 || attribTyper == 1 || attribTyper == 2) {
			$("#antiAttribType" + lineNum).html("");
			$("#antiAttribType" + lineNum).html('<option selected="selected">= </option>'
			            						+ '<option>&ne; </option>');
		} else {
			$("#antiAttribType" + lineNum).html("");
			$("#antiAttribType" + lineNum).html('<option>= </option>'
				                   + '<option>&ne; </option>'
				                   + '<option>&lt; </option>'
				                   + '<option>&gt; </option>'
				                   + '<option>&le; </option>'
				                   + '<option>&ge; </option>');
		}
		
		if (attribVals == null) {
			$("#antiValHolder" + lineNum).html('<input type="text" id="antiAttribValue' + lineNum + '">');
		} else {
			$("#antiValHolder" + lineNum).html('<select id="antiAttribValue' + lineNum + '"></select>');
			$("#antiAttribValue" + lineNum).empty()
			$("#antiAttribValue" + lineNum).append(' <option>Pick Value of Attribute</option>');
			attribVals.forEach(function (attriber) {
				$("#antiAttribValue" + lineNum).append(' <option value="' + attriber +'">' + attriber + '</option>');
			});	
		}
	
	}
	//takes in a row # and updates the values dropdown for consequences depending on which value is selected	
	function updateConsAttribVal(lineNum) {
		var tempAttribName = $("#consAttribType" + lineNum).val();
		var attribVals = getAttributeValues(tempAttribName);
		if (attribVals == null) {
			$("#consValHolder" + lineNum).html('<input type="text" id="consAttribValue' + lineNum + '">');
		} else {
			$("#consValHolder" + lineNum).html('<select id="consAttribValue' + lineNum + '"></select>');
			$("#consAttribValue" + lineNum).empty()
			$("#consAttribValue" + lineNum).append(' <option>Pick Value of Attribute</option>');
			attribVals.forEach(function (attriber) {
				$("#consAttribValue" + lineNum).append(' <option value="' + attriber + '">' + attriber + '</option>');
			});
		}	
	}
	//returns a list of the names of all attributes in JSON object, (used for dropdowns)
	function collectAttribNames() {
		var tempAttribs = []
		for (var listCount = 0; listCount < expertJSON.attributes.length; listCount++) {
	       	tempAttribs.push(expertJSON.attributes[listCount].identifier.name);
	    }
	    return tempAttribs;
	}
	//returns a list of all attribute object in the JSON object
	function collectAttribs() {
			var tempAttribs = []
		for (var listCount = 0; listCount < expertJSON.attributes.length; listCount++) {
	       	tempAttribs.push(expertJSON.attributes[listCount]);
	    }
	    return tempAttribs;
	}
	//returns the possible values for an attribute based on name
	function getAttributeValues(name) {
		var atter = findAttrib(name);
		if (atter.type == 1) {
			return [true, false];
		} else if (atter.type == 2 || atter.type == 0) {
			return atter.identifier.values;
		}
	}
	//updates the dropdown list on the actions screen to the current set of attributes
	function updateActionAttribs() {
		var attribsList = collectAttribNames();
			$("#actionAttribSelect").empty();
			$("#actionAttribSelect").append('<option>Pick Attribute</option>');
			attribsList.forEach(function (attriber) {
				$("#actionAttribSelect").append('<option>' + attriber + '</option>');
			});
	}
	//changes the display html of the actions page depending on which dropdown selection is made
	function updateActions() {
		var actionType = $("#actionSelect").val();
		if (actionType == 'Display Message') {
			$("#actionArea").html('<div class="head col span_6_of_8 ifSpace"><textarea id="actionText" cols="40" rows="5" ></textarea></div>');
		} else if (actionType == 'Display Attribute') {
			$("#actionArea").html('<div class="head col span_6_of_8 ifSpace"><select id="actionAttribSelect"></select></div>');	
			updateActionAttribs();
		} else if (actionType == 'Obtain Attribute') {
			$("#actionArea").html('<div class="head col span_6_of_8 ifSpace"><select id="actionAttribSelect"></select></div>');	
			updateActionAttribs();
		}	
	}
	//adds a message area to the rule screen for message commands to be entered
	function addRuleMessage(){
	$("#ruleMessageArea").html("");
	$("#ruleMessageArea").html(ruleMessagehtml);
	
}
	//adds a dropdown box full of attributes for display attribute command
	function addRuleDisplay(){
	$("#ruleDisplayArea").html("");
	$("#ruleDisplayArea").html(ruleDisplayhtml);
	updateRuleDisplayAttrib();
}

//Error checking for different areas
	//checks attribute in attribute screen for errors
	//and returns true if error found
	function checkForAttribErrors(){
	//checks for same name
	if ($("#addAttribName").val() == "") {
		alert("Attribute requires name");
		return true;
	}
	if (findAttrib($("#addAttribName").val()) != null) {
		alert("Attributes can not have same name");
		return true;
	}
	if ($("#addAttribPrompt").val() == "") {
		var confirmResponse = confirm("Are you sure you want to have no question for this attribute");
		return !confirmResponse;
	}

	if ($("#addAttribType").val() == 'Multi' || $("#addAttribType").val() == 'Single') {
		if ($("#addAttribValue0").val() == "") {
			alert("Attributes must contain one value");
			return true;
		} 
	}

	if ($("#addAttribType").val() == 'Numeric') {
		if ($("#newMinNumericalValues").val() == "" || $("#newMaxNumericalValues").val() == "") {
			alert("Attributes must have Minimum and Maximum Values");
			return true;
		}

		if (isNaN(parseInt($("#newMinNumericalValues").val())) || isNaN(parseInt($("#newMaxNumericalValues").val()))) {
			alert("Values must be numeric");
			return true;
		}

		if (!($("#cDec").prop('checked'))) {
			if ($("#newMinNumericalValues").val().indexOf(".") != -1 || $("#newMaxNumericalValues").val().indexOf(".") != -1) {
				alert("Decimal values require decimal checkbox to be checked");
				return true;
			}
		}
		var minNum = parseInt($("#newMinNumericalValues").val());
		var maxNum = parseInt($("#newMaxNumericalValues").val());
		if(minNum > maxNum){
			alert("Minimum is greater than Maximum. Please make minimum less than maximum");
			return true;
		}

	}
	return false;
}
	//checks rule in rule screen for errors
	//and returns true if error is found
	function checkForRuleErrors() {
	if ($("#addRuleName").val() == "") {
		alert("Rule requires name");
		return true;
	}
	for (var ruleNum = 0; ruleNum < expertJSON.rules.length; ruleNum++) {
		if ($("#addRuleName").val() == expertJSON.rules[ruleNum].name) {
			alert("Rules can not have same name");
			return true;
		}
	}

	if ($("#antiAttribValue0").val() == 'Pick Value of Attribute' || $("#consAttribValue0").val() == 'Pick Value of Attribute') {
		alert("First Row of each column must be filled in for all rules");
		return true;
	}
	for (var aCount = 0; aCount<=antecedentCounter; aCount++) {
		if ($("#antiAttrib" + aCount).val() != 'Pick Attribute' && $("#antiAttribValue" + aCount).val() == 'Pick Value of Attribute') {
			alert("All attributes in rules require values");
			return true;
		}
		var temp = $("#antiAttribType").val();
		if ($("#antiAttrib" + aCount).val() != 'Pick Attribute' && typeof($("#antiAttribType" + aCount).val()) == 'undefined') {
			alert("All antecedents need equivalence operators");
			return true;	
		}
		
		
	}
	for (var cCount = 0; cCount<=consequenceCounter; cCount++) {
		if ($("#consAttribType" + aCount).val() != 'Pick Attribute' && $("#consAttribValue" + aCount).val() == 'Pick Value of Attribute') {
			alert("All attributes in rules require values");
			return true;
		}
	}

	return false;
}
	//DEPRECATED - checks if two attributes in list have same name
	function checkSameNameAttrib(){
	var lengther = expertJSON.attributes.length - 1;
	var name = expertJSON.attributes[lengther].identifier.name;

	for (var k=0; k < expertJSON.attributes.length - 1; k++) {
		if (name== expertJSON.attributes[k].identifier.name) {
			return true;
		}
	}
	return false;
}

//functions used to format json between engine and expertui versions
	//converts a JSON object in the engine syntax to the expert syntax
	function engineToExpertJson(engineJson) {
	    
	    for(var i = 0; i < engineJson.attributes.length; i++) {
	        var identifierID = engineJson.attributes[i].identifier;
	        engineJson.attributes[i].identifier = engineJson.identifiers[identifierID];
	    }
	    
	    for (var j = 0; j < engineJson.rules.length; j++) {
	        for (var antcount = 0; antcount < engineJson.rules[j].antecedents.length; antcount++) {
	            for (var innerAnt = 0; innerAnt < engineJson.rules[j].antecedents[antcount].length; innerAnt++) {
	                var identifierID3 = engineJson.rules[j].antecedents[antcount][innerAnt].identifier;
	                engineJson.rules[j].antecedents[antcount][innerAnt].identifier = engineJson.identifiers[identifierID3];
	            }
	        }
	        
	        for (var concount = 0; concount < engineJson.rules[j].consequents.length; concount++) {
	            //for (var innerCon = 0; innerCon < engineJson.rules[j].consequents[concount].length; innerCon++) {
	                var identifierID4 = engineJson.rules[j].consequents[concount].identifier;
	                engineJson.rules[j].consequents[concount].identifier = engineJson.identifiers[identifierID4];
	            //}
	        }
	        
	    }
	    
	    //example of antecedent structure
	    
	    // {"name":"risk3","antecedents":[
	    //     [{"identifier":0,"relation":100,"values":[[1]]}],
	    //     [{"identifier":1,"relation":204,"value":20}],
	    //     [{"identifier":3,"relation":100,"values":[[1]]},{"identifier":4,"relation":100,"values":[[0]]}]
	    //     ],
	    //     "consequents":[{"identifier":12,"values":[0]}]
	    
	    for(var k = 0; k < engineJson.actions.length; k++) {
	        if (engineJson.actions[k].type == 422 || engineJson.actions[k].type == 417) {
	            var identifierID2 = engineJson.actions[k].identifier;
	            engineJson.actions[k].identifier = engineJson.identifiers[identifierID2];
	        }
	    }
	    
	    engineJson.identifiers = [];
	    return engineJson;
	    
	}
	//converts a JSON object in the expert syntax to the engine syntax
	function expertToEngineJson(expertJsonLocal) {

		var expertJsonLocal = JSON.parse(JSON.stringify(expertJsonLocal))
	    
	    expertJsonLocal.identifiers = [];
	    
	    for(var i = 0; i < expertJsonLocal.attributes.length; i++) {
	        if (identContains(expertJsonLocal.attributes[i].identifier.name, expertJsonLocal.identifiers)) {
	            expertJsonLocal.attributes[i].identifier = indexIdent(expertJsonLocal.attributes[i].identifier.name, expertJsonLocal.identifiers);
	        } else {
	            expertJsonLocal.identifiers.push( expertJsonLocal.attributes[i].identifier);
	            expertJsonLocal.attributes[i].identifier = indexIdent(expertJsonLocal.attributes[i].identifier.name, expertJsonLocal.identifiers);
	        }
	    }
	    
	    for (var j = 0; j < expertJsonLocal.rules.length; j++) {
	        for (var antcount = 0; antcount < expertJsonLocal.rules[j].antecedents.length; antcount++) {
	            for (var innerAnt = 0; innerAnt < expertJsonLocal.rules[j].antecedents[antcount].length; innerAnt++) {
	                if (identContains(expertJsonLocal.rules[j].antecedents[antcount][innerAnt].identifier.name, expertJsonLocal.identifiers)) {
	                    expertJsonLocal.rules[j].antecedents[antcount][innerAnt].identifier = indexIdent(expertJsonLocal.rules[j].antecedents[antcount][innerAnt].identifier.name, expertJsonLocal.identifiers);
	                } else {
	                    expertJsonLocal.identifiers.push( expertJsonLocal.rules[j].antecedents[antcount][innerAnt].identifier);
	                    expertJsonLocal.rules[j].antecedents[antcount][innerAnt].identifier = indexIdent(expertJsonLocal.rules[j].antecedents[antcount][innerAnt].identifier.name, expertJsonLocal.identifiers);
	                }
	            }
	        }
	        
	        for (var concount = 0; concount < expertJsonLocal.rules[j].consequents.length; concount++) {
	            //for (var innerCon = 0; innerCon < expertJsonLocal.rules[j].consequents[concount].length; innerCon++) {
	                if (identContains(expertJsonLocal.rules[j].consequents[concount].identifier.name, expertJsonLocal.identifiers)) {
	                    expertJsonLocal.rules[j].consequents[concount].identifier = indexIdent(expertJsonLocal.rules[j].consequents[concount].identifier.name, expertJsonLocal.identifiers);
	                } else {
	                    expertJsonLocal.identifiers.push( expertJsonLocal.rules[j].consequents[concount][innerCon].identifier);
	                    expertJsonLocal.rules[j].consequents[concount].identifier = indexIdent(expertJsonLocal.rules[j].consequents[concount].identifier.name, expertJsonLocal.identifiers);
	                }
	            //}
	        }
	        
	    }
	    
	    for(var k = 0; k < expertJsonLocal.actions.length; k++) {
	        if (expertJsonLocal.actions[k].type == 422 || expertJsonLocal.actions[k].type == 417) {
	            if (identContains(expertJsonLocal.actions[k].identifier.name, expertJsonLocal.identifiers)) {
	                expertJsonLocal.actions[k].identifier = indexIdent(expertJsonLocal.actions[k].identifier.name, expertJsonLocal.identifiers);
	            } else {
	                expertJsonLocal.identifiers.push( expertJsonLocal.actions[k].identifier);
	                expertJsonLocal.actions[k].identifier = indexIdent(expertJsonLocal.actions[k].identifier.name, expertJsonLocal.identifiers);
	            }
	        }
	    }
	    
	    return expertJsonLocal
	}
	//checks a list of identifiers to see if a name is contained in any of them
	function identContains(name, identList) {
	    for (var ident = 0; ident < identList.length; ident++) {
	        if (identList[ident].name == name) {
	            return true;
	        }
	    }
	    return false;
	}
	//returns the index of an identifier in expertJSON.attributes if the identifier matches name
	function indexIdent(name, identList) {
	    for (var ident = 0; ident < identList.length; ident++) {
	        if (identList[ident].name == name) {
	            return ident;
	        }
	    }
	    return -1;
	}
	

//Variables below are all html snippits used for loading
//and updating the page

var ruleMessagehtml = '<div class="head col span_8_of_8 ifSpace accent">'
+'						<h3>Add messsage</h3>'
+'						<textarea id="ruleTextArea"></textarea>'
+'					</div>';

var ruleDisplayhtml = '<div class="col noMargin span_3_of_8 ifSpace">'
+'					</div>'
+'					<div class="head col span_2_of_8 ifSpace">'
+'						<h3>Display</h3>'
+'						<!--<span><h3>Display</h3></span>-->'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'					    <select id="ruleActionAttribValue" onchange="ruleActionChange()">'
+'		                    <option>Pick Value of Attribute</option>'

+'		                </select>'
+'					</div>';


var singleValueHtml = '<section class="col span_8_of_8">'
+'			<div class="col span_6_of_8">'
+'				<h2>Atributes Area</h2>'
+'			</div>'
+'			<div class="col span_2_of_8">'
+'			</div>'
+'		</section>'
+'		<div class="section group">'
+'			<div class="col span_4_of_8">'
+'				<div class="section group">'
+'					<div class="head col span_3_of_8 ifSpace">'
+'					    <h3>Attribute Name</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<input type="text" id="addAttribName"/>'
+'					</div>'
+'					<div class="col span_2_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="produceJSON()"/>-->'
+'					</div>'
+'				</div>'
+'				<div class="section group">'
+'					<div class="head col span_3_of_8 ifSpace">'
+'					    <h3>Attribute Type</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<select id="addAttribType" onchange="changeAttribForm()">'
+'		                    <option>Multi</option>'
+'		                    <option selected="selected">Single</option>'
+'		                    <option>Numeric</option>'
+'		                    <option>Bool</option>'
+'		                </select>'
+'					</div>'
+'					<div class="col span_2_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="produceJSON()"/>-->'
+'					</div>'
+'				</div>'
+'				<!--this depends on the attribute type selected-->'
+'				<div class="section group">'
+'					<!--CREATE RULE BUTTON-->'
+'					<div class="col span_3_of_8">'
+'						<input class="button" type="button" value="Create" onclick="addAttrib()"/>'
+'					</div>'
+'					<div class="col span_5_of_8"></div>'
+'				</div>'
+'			</div>'
+'			<div class="col span_4_of_8">'
+'				<div class="section group">'
+'					<div class="head col span_2_of_8 ifSpace">'
+'					    <h3>Question</h3>'
+'					</div>'
+'					<div class="head col span_5_of_8 accent">'
+'						 <input type="text" id="addAttribPrompt"/>'
+'					</div>'
+'					<div class="col noMargin span_1_of_8">'
+'					</div>'
+'				</div>'
+'				<div class="section group">'
+'					<div class="head col span_2_of_8 ifSpace">'
+'					    <h3>Possible Values</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent" id="mulAttribVals">'
+'						<input type="text" id="addAttribValue0"/>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent ifSpace">'
+'					    <input class="button" type="button" value="Add Value" onclick="addAttribValSpace()"/>'
+'					</div>'
+'					<div class="col span_3_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="produceJSON()"/>-->'
+'					</div>'
+'				</div>'

+'			</div>'
+'		</div>';


var multiValueHtml = '<section class="col span_8_of_8">'
+'			<div class="col span_6_of_8">'
+'				<h2>Atributes Area</h2>'
+'			</div>'
+'			<div class="col span_2_of_8">'
+'			</div>'
+'		</section>'
+'		<div class="section group">'
+'			<div class="col span_4_of_8">'
+'				<div class="section group">'
+'					<div class="head col span_3_of_8 ifSpace">'
+'					    <h3>Attribute Name</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<input type="text" id="addAttribName"/>'
+'					</div>'
+'					<div class="col span_2_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="produceJSON()"/>-->'
+'					</div>'
+'				</div>'
+'				<div class="section group">'
+'					<div class="head col span_3_of_8 ifSpace">'
+'					    <h3>Attribute Type</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<select id="addAttribType" onchange="changeAttribForm()">'
+'		                    <option selected="selected">Multi</option>'
+'		                    <option>Single</option>'
+'		                    <option>Numeric</option>'
+'		                    <option>Bool</option>'
+'		                </select>'
+'					</div>'
+'					<div class="col span_2_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="produceJSON()"/>-->'
+'					</div>'
+'				</div>'
+'				<!--this depends on the attribute type selected-->'
+'				<div class="section group">'
+'					<!--CREATE RULE BUTTON-->'
+'					<div class="col span_3_of_8">'
+'						<input class="button" type="button" value="Create" onclick="addAttrib()"/>'
+'					</div>'
+'					<div class="col span_5_of_8"></div>'
+'				</div>'
+'			</div>'
+'			<div class="col span_4_of_8">'
+'				<div class="section group">'
+'					<div class="head col span_2_of_8 ifSpace">'
+'					    <h3>Question</h3>'
+'					</div>'
+'					<div class="head col span_5_of_8 accent">'
+'						 <input type="text" id="addAttribPrompt"/>'
+'					</div>'
+'					<div class="col noMargin span_1_of_8">'
+'					</div>'
+'				</div>'
+'				<div class="section group">'
+'					<div class="head col span_2_of_8 ifSpace">'
+'					    <h3>Multiple Values</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent" id="mulAttribVals">'
+'						<input type="text" id="addAttribValue0"/>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent ifSpace">'
+'					    <input class="button" type="button" value="Add Value" onclick="addAttribValSpace()"/>'
+'					</div>'
+'					<div class="col span_3_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="produceJSON()"/>-->'
+'					</div>'
+'				</div>'
			
+'			</div>'
+'		</div>';
		
var numValueHtml = '<section class="col span_8_of_8">'
+'			<div class="col span_6_of_8">'
+'				<h2>Atributes Area</h2>'
+'			</div>'
+'			<div class="col span_2_of_8">'
+'			</div>'
+'		</section>'
+'		<div class="section group">'
+'			<div class="col span_4_of_8">'
+'				<div class="section group">'
+'					<div class="head col span_3_of_8 ifSpace">'
+'					    <h3>Attribute Name</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<input type="text" id="addAttribName"/>'
+'					</div>'
+'					<div class="col span_2_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="addAttrib()"/>-->'
+'					</div>'
+'				</div>'
+'				<div class="section group">'
+'					<div class="head col span_3_of_8 ifSpace">'
+'					    <h3>Attribute Type</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<select id="addAttribType" onchange="changeAttribForm()">'
+'		                    <option>Multi</option>'
+'		                    <option>Single</option>'
+'		                    <option selected="selected">Numeric</option>'
+'		                    <option>Bool</option>'
+'		                </select>'
+'					</div>'
+'					<div class="col span_2_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="produceJSON()"/>-->'
+'					</div>'
+'				</div>'
+'				<!--this depends on the attribute type selected-->'
+'				<div class="section group">'
+'					<!--CREATE RULE BUTTON-->'
+'					<div class="col span_3_of_8">'
+'						<input class="button" type="button" value="Create" onclick="addAttrib()"/>'
+'					</div>'
+'					<div class="col span_5_of_8"></div>'
+'				</div>'
+'			</div>'
+'			<div class="col span_4_of_8">'
+'				<div class="section group">'
+'					<div class="head col span_2_of_8 ifSpace">'
+'					    <h3>Question</h3>'
+'					</div>'
+'					<div class="head col span_5_of_8 accent">'
+'						 <input type="text" id="addAttribPrompt"/>'
+'					</div>'
+'					<div class="col noMargin span_1_of_8">'
+'					</div>'
+'				</div>'
+'				<div id="numRang" class="section group">'
+'					<div class="col span_2_of_8 ifSpace">'
+'					   '
+'					</div>'
+'					<div class="col span_6_of_8 accent ifSpace">'
+'						<div class="section group">'
+'							<div class="col span_4_of_8 accent ifSpace">'
+'								<h3>Numerical Range</h3>'
+'							</div>'
+'							<div class="col span_4_of_8 accent ifSpace">'
+'								<input type="checkbox" id="cDec" name="decimal" />'
+'								<label for="c1">Decimal</p></label>'
+'							</div>'
+'						</div>'
+'						<div class="section group">'
+'							<div class="col span_4_of_8 accent ifSpace">'
+'								<p>Min Value</p>'
+'								<input id="newMinNumericalValues" type="text" />'
+'								<input type="checkbox" id="c1" name="inclusive" />'
+'								<label for="c1"><span></span>Inclusive</label>'
+'							</div>'
+'							<div class="col span_4_of_8 accent ifSpace">'
+'								<p>Max Value</p>'
+'								<input id="newMaxNumericalValues" type="text" />'
+'								<input type="checkbox" id="c2" name="inclusive" />'
+'								<label for="c1"><span></span>Inclusive</label>'
+'							</div>'
+'						</div>'
+'					</div>'
+'				</div>'
+'			</div>'
+'		</div>';		
		
var boolValueHtml = '<section class="col span_8_of_8">'
+'			<div class="col span_6_of_8">'
+'				<h2>Atributes Area</h2>'
+'			</div>'
+'			<div class="col span_2_of_8">'
+'			</div>'
+'		</section>'
+'		<div class="section group">'
+'			<div class="col span_4_of_8">'
+'				<div class="section group">'
+'					<div class="head col span_3_of_8 ifSpace">'
+'					    <h3>Attribute Name</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<input type="text" id="addAttribName"/>'
+'					</div>'
+'					<div class="col span_2_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="produceJSON()"/>-->'
+'					</div>'
+'				</div>'
+'				<div class="section group">'
+'					<div class="head col span_3_of_8 ifSpace">'
+'					    <h3>Attribute Type</h3>'
+'					</div>'
+'					<div class="head col span_3_of_8 accent">'
+'						<select id="addAttribType" onchange="changeAttribForm()">'
+'		                    <option>Multi</option>'
+'		                    <option >Single</option>'
+'		                    <option>Numeric</option>'
+'		                    <option selected="selected">Bool</option>'
+'		                </select>'
+'					</div>'
+'					<div class="col span_2_of_8 accent">'
+'					    <!--<input class="button" type="button" value="Create Rule" onclick="addAttrib()"/>-->'
+'					</div>'
+'				</div>'
+'				<!--this depends on the attribute type selected-->'
+'				<div class="section group">'
+'					<!--CREATE RULE BUTTON-->'
+'					<div class="col span_3_of_8">'
+'						<input class="button" type="button" value="Create" onclick="addAttrib()"/>'
+'					</div>'
+'					<div class="col span_5_of_8"></div>'
+'				</div>'
+'			</div>'
+'			<div class="col span_4_of_8">'
+'				<div class="section group">'
+'					<div class="head col span_2_of_8 ifSpace">'
+'					    <h3>Question</h3>'
+'					</div>'
+'					<div class="head col span_5_of_8 accent">'
+'						 <input type="text" id="addAttribPrompt"/>'
+'					</div>'
+'					<div class="col noMargin span_1_of_8">'
+'					</div>'
+'				</div>'
+'			</div>'
+'		</div>';	
		

var antiHTML = '<div class="section group" id="sectionGroup0">'
+'						<div id="antiSelect0" class="head col span_1_of_8 ifSpace">'
+'						    <h3>IF</h3>'
+'						</div>'
+'						<div class="head col span_3_of_8 accent">'
+'							<select id="antiAttrib0" onchange="updateAntiAttribVal(0)">'
+'			                    <option>Pick Attribute</option>'
+'			                </select>'
+'						</div>'
+'						<div class="head col span_1_of_8 ifSpace accent">'
+'						    <select id="antiAttribType0">'
+'			                    <option>= </option>'
+'			                    <option>&ne; </option>'
+'			                    <option>&lt; </option>'
+'			                    <option>&gt; </option>'
+'			                    <option>&le; </option>'
+'			                    <option>&ge; </option>'
+'			                </select>'
+'						</div>'
+'						<div class="head col span_3_of_8 accent">'
+'							<div id="antiValHolder0">'
+'							    <select id="antiAttribValue0">'
+'				                    <option>Pick Value of Attribute</option>'
+'				                </select>'
+'			                </div>'
+'						</div>'
+'					</div>'
+'					<div class="section group" id="sectionGroup1">'
+'						<div class="head col span_1_of_8 ifSpace">'
+'						    <select id="antiSelect1" onchange="addAnti()">'
+'						    	<option></option>'
+'						    	<option>AND</option>'
+'						    	<option>OR</option>'
+'						    </select>'
+'						</div>'
+'					</div>'
					

var oldantiHTML = '<div class="section group" id="sectionGroup0">'
+'						<div id="antiSelect0" class="head col span_1_of_8 ifSpace">'
+'						    <h3>IF</h3>'
+'						</div>'
+'						<div class="head col span_3_of_8 accent">'
+'							<select id="antiAttrib0" onchange="updateAntiAttribVal(0)">'
+'			                    <option>Pick Attribute</option>'
+'			                </select>'
+'						</div>'
+'						<div class="head col span_1_of_8 ifSpace accent">'
+'						    <select id="antiAttribType0">'
+'			                    <option>= </option>'
+'			                    <option>&ne; </option>'
+'			                    <option>&lt; </option>'
+'			                    <option>&gt; </option>'
+'			                    <option>&le; </option>'
+'			                    <option>&ge; </option>'
+'			                </select>'
+'						</div>'
+'						<div class="head col span_3_of_8 accent">'
+'						    <select id="antiAttribValue0">'
+'			                    <option>Pick Value of Attribute</option>'
+'			                    <option>head</option>'
+'			                    <option>Numeric</option>'
+'			                    <option>Bool</option>'
+'			                </select>'
+'						</div>'
+'					</div>'
+'					<div class="section group" id="sectionGroup1">'
+'						<div class="head col span_1_of_8 ifSpace">'
+'						    <select id="antiSelect1" onchange="addAnti()">'
+'						    	<option></option>'
+'						    	<option>AND</option>'
+'						    	<option>OR</option>'
+'						    </select>'
+'						</div>'
						
+'					</div>';
					
var consHTML = '<div class="section group">'
+'						<div class="head col noMargin span_1_of_8 ifSpace">'
+'							<h3>Then</h3>'
+'						</div>'
+'						<div class="head col span_3_of_8 accent">'

+'							<select id="consAttribType0" onchange="updateConsAttribVal(0)">'
+'			                    <option>Pick Attribute</option>'
+'			                </select>'
			                
+'						</div>'
+'						<div class="head col span_1_of_8 ifSpace">'
+'						    <h3>=</h3>'
+'						</div>'
+'						<div class="head col span_3_of_8 accent">'
+'						<div id="consValHolder0">'
+'						    <select id="consAttribValue0">'
+'			                    <option>Pick Value of Attribute</option>'
+'			                </select>'
+'			                </div>'
+'						</div>'
+'					</div>';					