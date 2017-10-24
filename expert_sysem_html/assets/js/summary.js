//Running under the assumption that expertJSON variable found in jsonMethods.js
//will be available to this class

//Use the index of the arrays to id which ones they are


var attrCounter = 0;
var actionCounter = 0;
var ruleCounter = 0;
var rulesDependantOnAttr = [];
var actionsDependantOnAttr = [];
var editFlag = 0;

//Sets the JSON to an arbitrary JSON to be used for debugging purposes
//Then fills the summary with the JSON so that the user actually sees something
//that isn't a painful JSON file
function testFill(){
    expertJSON = JSON.parse('{"identifiers":[],"attributes":[{"type":2,"identifier":{"name":"sex","question":"","values":["female","male"]}},{"type":4,"identifier":{"name":"age","question":""},"ranges":[{"lower":{"value":20,"inc":true},"upper":{"value":20,"inc":true}}]},{"type":2,"identifier":{"name":"past medical history","question":"whatevs","values":["gardner\'s syndrome","estrogen therapy","abnormal uterine bleeding","failure of ovulation","infertility","ulcerative colitis","polyps","colon or rectal cancer","breast cancer"]}},{"type":1,"identifier":{"name":"obesity","question":"do you have obesity"}},{"type":2,"identifier":{"name":"cancers at an increased risk","question":"trees","values":["lung cancer","endometrial cancer","colon or rectal cancer","cervical cancer","breast cancer"]}}],"rules":[{"name":"risk1","antecedents":[[{"identifier":{"name":"sex","question":"What is your sex?","values":["male","female"]},"relation":100,"values":[[1]]}],[{"identifier":{"name":"age","question":"How old are you?"},"relation":204,"value":20}],[{"identifier":{"name":"past medical history","question":"What is your past medical history?","values":["breast cancer","colon or rectal cancer","polyps","ulcerative colitis","infertility","failure of ovulation","abnormal uterine bleeding","estrogen therapy","gardner\'s syndrome"]},"relation":100,"values":[[4,5,6,7]]},{"identifier":{"name":"obesity","question":"Do you have obesity?"},"relation":100,"value":true}]],'

+'        "consequents":[{"identifier":{"name":"cancers at an increased risk","question":"ERROR: SHOULD NOT SEE THIS","values":["breast cancer","cervical cancer","colon or rectal cancer","endometrial cancer","lung cancer"]},"values":[2,3]}],"commands":[]}],"actions":[]}');
        
        fillSummary();
}
/*
Someone put this here and I'm afraid to delete. Just calls refresh
*/
function redoSummary() {
	refresh();
}
/*
Parses through the expertJSON calling the functions that will add the 
html to make the GUI for the use to easily see
*/
function fillSummary(){

    //Sets all counters to zero so that we start over all the time
    attrCounter = 0;
    actionCounter = 0;
    ruleCounter = 0;
    
    if (expertJSON == null){
        console.log('WHAT HAPPENs expertJSON IS NULL: ', expertJSON);
    } else {
        
        while(attrCounter < expertJSON.attributes.length){
            addAttributeToSummary();
        }
        while(actionCounter < expertJSON.actions.length){
            addActionToSummary();
        }
        while(ruleCounter < expertJSON.rules.length){
            parseRule();
        }
    }

}
/*
Refreshes the summary. Clears out the HTML child classes that hold the current 
summary and sets all counters to zero so that fillSummary can run
*/
function refresh(){

    $("#summarySection").empty();
    $("#summaryRuleSection").empty();
    $("#summaryActionSection").empty();
    
    attrCounter = 0;
    actionCounter = 0;
    ruleCounter = 0;
    fillSummary();
}
function addAttributeToSummary(){
    var attr = expertJSON.attributes[attrCounter];
    var type = attr["type"];
    if(type == 1){ //Boolean attribute
        parseBool(attr);
        
    }else if(type == 2){ //MultiValue attr
        parseMultiVal(attr, "Multiple Value Attribute");
        
    }else if(type == 3){ //Single attr
        parseNum(attr);
        
    }else if(type == 4){//Num attribute
        parseNum(attr);
    }else if(type == 0){
        parseSingleVal(attr, "Single Value Attribute");
    }else{ //Error
        
    }
    attrCounter++;
    saveToStorage();
    editFlag = 0;
}

function parseSingleVal(attr, type){
    var name = attr["identifier"]["name"];
    var question = attr["identifier"]["question"];
    var valArray = attr["identifier"]["values"];
    
    // console.log("Name " + name + " question " + question + " values " 
    //                 + valArray);
    
    var vals = "";
    for(var n = 0; n < valArray.length; n++){
        if(n + 1 < valArray.length){
            vals = vals.concat(valArray[n] + ", ");    
        }else{
            vals = vals.concat(valArray[n]);    
        }
    }
    var summarySection = '<div class="head section group" class="summary">'
+'                    <div class="col span_6_of_8" >'
+'                        Single Value Attribute <p>Name: ' + name + '</p><p> Question: ' + question + '</p><p>'
+'                        Values: ' + vals + '</p>'
+'                    </div>'
+ '                   <div class="col span_2_of_8">'
+ '                       <a onClick="editAttribute('+ attrCounter +');" href="#">edit</a> / <a  onClick="deleteAttribute('+ attrCounter +');" href="#">delete</a>'
+'                    </div>'
                    
+'                </div>';
    
    $("#summarySection").append(summarySection);
}

function parseMultiVal(attr, type){
    console.log("multi val name " + JSON.stringify(attr));
    var name = attr["identifier"]["name"];
    var question = attr["identifier"]["question"];
    var valArray = attr["identifier"]["values"];
    
    // console.log("Name " + name + " question " + question + " values " 
    //                 + valArray);
    
    var vals = "";
    for(var n = 0; n < valArray.length; n++){
        if(n + 1 < valArray.length){
            vals = vals.concat(valArray[n] + ", ");    
        }else{
            vals = vals.concat(valArray[n]);    
        }
    }
    var summarySection = '<div class="head section group" class="summary">'
+'					<div class="col span_6_of_8" >'
+'						Multiple Value Attribute <p>Name: ' + name + '</p><p> Question: ' + question + '</p><p>'
+'					    Values: </p><p>' + vals + '</p>'
+'					</div>'
+'					<div class="col span_2_of_8">'
+'						<a onClick="editAttribute('+ attrCounter +');" href="#">edit</a> / <a  onClick="deleteAttribute('+ attrCounter +');" href="#">delete</a>'
+'					</div>'
					
+'				</div>';
    
    $("#summarySection").append(summarySection);
}
function parseNum(attr){
    var name = attr["identifier"]["name"];
    var question = attr["identifier"]["question"];
    var ranges = attr["ranges"];
    
    // console.log("Ranges " + ranges);
    
    var vals = "";
    for(var n in ranges){
        var currObj = ranges[n];
        vals = vals.concat(currObj["lower"]["value"] + " -> " + currObj["upper"]["value"]);
        //vals.concat("Hello");
        
    }
    var summarySection = '<div class="head section group id="summary">'
+'					<div class="col span_6_of_8" >'
+'						Numeric Value Attribute <p>Name: ' + name + '</p><p> Question: ' + question + '</p><p>'
+'					    Range: </p><p>' + vals + '</p>'
+'					</div>'
+'					<div class="col span_2_of_8">'
+'						<a onClick="editAttribute('+ attrCounter +');" href="#">edit</a> / <a  onClick="deleteAttribute('+ attrCounter +');" href="#">delete</a>'
+'					</div>'
					
+'				</div>';
    
    $("#summarySection").append(summarySection);  
}
function parseBool(attr){
    var name = attr["identifier"]["name"];
    var question = attr["identifier"]["question"];
    var ranges = attr["ranges"];
    
    // console.log("Ranges " + ranges);
    
    var vals = "";
    var summarySection = '<div class="head section group" id="summary' + attrCounter  + '">'
    
+'					<div class="col span_6_of_8">'
+'						Boolean Attribute <p>Name: ' + name + '</p><p> Question: ' + question + '</p>'
+'					</div>'
+'					<div class="col span_2_of_8">'
+'						<a onClick="editAttribute('+ attrCounter +');" href="#">edit</a> / <a  onClick="deleteAttribute('+ attrCounter +');" href="#">delete</a>'
+'					</div>'
					
+'				</div>';
    
    $("#summarySection").append(summarySection);
}
function deleteAttribute(attrCount){
    findAttributeDependency(attrCount);
    if(rulesDependantOnAttr.length > 0){
        alert("The following rules are dependent on the attribute that you are trying to edit/delete. Please resolve all dependencies before continuing " + rulesDependantOnAttr.toString());
        rulesDependantOnAttr = []
        return;
    }
    if(actionsDependantOnAttr.length > 0){
        alert("The following actions are dependent on the attribute that you are trying to edit/delete. Please resolve all dependencies before continuing " + actionsDependantOnAttr.toString());
        actionsDependantOnAttr = []
        return;    
    }
    expertJSON.attributes.splice(attrCount, 1);
    //$("#summary" + attrCount).remove();
    attrCounter--;
    refresh();
    saveToStorage();
}
function editAttribute(attrCount){
    findAttributeDependency(attrCount);
    if(rulesDependantOnAttr.length > 0){
        alert("The following rules are dependent on the attribute that you are trying to edit/delete. Please resolve all dependencies before continuing " + rulesDependantOnAttr.toString());
        rulesDependantOnAttr = []
        return;
    }
    if(actionsDependantOnAttr.length > 0){
        alert("The following actions are dependent on the attribute that you are trying to edit/delete. Please resolve all dependencies before continuing " + actionsDependantOnAttr.toString());
        actionsDependantOnAttr = []
        return;    
    }
    if(editFlag === 1){
        alert("Please finish your current edit before starting a new one");
        return;
    }
    changeTab('attr');
    var curr = expertJSON.attributes[attrCount];
    var type = curr["type"];
    var name = curr["identifier"]["name"];
    var question = curr["identifier"]["question"];
    var valArray = curr["identifier"]["values"];
    
    if(type == 1){ //Boolean attribute
        $("#addAttribType").val("Bool").change();
        
    }else if(type == 2){ //MultiValue attr
        $("#addAttribType").val("Multi").change();
        var n = 0;
        $("#addAttribValue" + n).val(valArray[n]);
        
        for(n = 1; n < valArray.length; n++){
            addAttribValSpace();
            $("#addAttribValue" + n).val(valArray[n]);
        }
        
    }else if(type == 3){ //Real attr
        $("#addAttribType").val("Numeric").change();
        
        var min = curr["ranges"][0]["lower"]["value"];
        var max = curr["ranges"][0]["upper"]["value"];
        var minInc = curr["ranges"][0]["lower"]["inc"];
        var maxInc = curr["ranges"][0]["upper"]["inc"];

        if(minInc === true){
            $("#c1").prop("checked", true);
        }
        if(maxInc === true){
            $("#c2").prop("checked", true);
        }
        $("#cDec").prop("checked", true);
        
        $("#newMinNumericalValues").val(min);
        $("#newMaxNumericalValues").val(max);


        
    }else if(type == 0){ //Single attr
        $("#addAttribType").val("Single").change();
        var n = 0;
        $("#addAttribValue" + n).val(valArray[n]);
        
        for(n = 1; n < valArray.length; n++){
            addAttribValSpace();
            $("#addAttribValue" + n).val(valArray[n]);
        }
        
    }else if(type == 4){//Num attribute
        $("#addAttribType").val("Numeric").change();
        
        var min = curr["ranges"][0]["lower"]["value"];
        var max = curr["ranges"][0]["upper"]["value"];
        var minInc = curr["ranges"][0]["lower"]["inc"];
        var maxInc = curr["ranges"][0]["upper"]["inc"];

        if(minInc === true){
            $("#c1").prop("checked", true);
        }
        if(maxInc === true){
            $("#c2").prop("checked", true);
        }
        
        $("#newMinNumericalValues").val(min);
        $("#newMaxNumericalValues").val(max);
        
    }else{ //Error
        
    }
    $("#addAttribPrompt").val(question);
    $("#addAttribName").val(name);
    deleteAttribute(attrCount);
    editFlag = 1;
}
function addActionToSummary(){
    
    var currAction = expertJSON.actions[actionCounter];
    var type = currAction["type"];
    if(type == 431){
        parseActionMess(currAction);
    }
    else if(type == 417){
        parseActionAttribute(currAction);
    }else {
        parseObtAction(currAction);
    }

    actionCounter++;
    saveToStorage();
    editFlag = 0;
}
function parseActionMess(currAction){
    var lines = currAction["message"];
    //var lines = currAction["lines"][0];
    
    var summarySection = '<div class="head section group" class="summaryAction">'
+'					<div class="col span_6_of_8">'
+'						Message Action: <p>'+lines+'</p>'
+'					</div>'
+'					<div class="col span_2_of_8">'
+'						<a onClick="editAction('+ actionCounter +');" href="#">edit</a> / <a  onClick="deleteAction('+ actionCounter +');" href="#">delete</a>'
+'					</div>'
					
+'				</div>';
    
    $("#summaryActionSection").append(summarySection);
}
function parseActionAttribute(currAction){
    var attr =  currAction["identifier"]["name"];
    
    var summarySection = '<div class="head section group" class="summaryAction">'
    
+'					<div class="col span_6_of_8">'
+'						Attribute Action: <p>'+attr+'</p>'
+'					</div>'
+'					<div class="col span_2_of_8">'
+'						<a onClick="editAction('+ actionCounter +');" href="#">edit</a> / <a  onClick="deleteAction('+ actionCounter +');" href="#">delete</a>'
+'					</div>'
					
+'				</div>';
    
    $("#summaryActionSection").append(summarySection);
}
function parseObtAction(currAction){
    var attr =  currAction["identifier"]["name"];
    
    var summarySection = '<div class="head section group" class="summaryAction">'
    
+'                    <div class="col span_6_of_8">'
+'                       Obtain Action: <p>'+attr+'</p>'
+'                    </div>'
+'                    <div class="col span_2_of_8">'
+'                        <a onClick="editAction('+ actionCounter +');" href="#">edit</a> / <a  onClick="deleteAction('+ actionCounter +');" href="#">delete</a>'
+'                    </div>'
                    
+'                </div>';
    
    $("#summaryActionSection").append(summarySection);
}
function getActionLines(currAction){
    var lines = currAction["message"];
    //var lines = currAction["lines"][0];
    $("#actionSelect").val("Display Message").change();
}
function editAction(actionCount){
    
    if(editFlag === 1){
        alert("Please finish your current edit before starting a new one");
        return;
    }
    changeTab('action');
    var currObject = expertJSON.actions[actionCount];
    var type = currObject["type"];
    actionPlaceHolder = actionCount;
    
    if(type == 431){
        editMessAction(currObject);
    }else if(type == 417){
        editAttrAction(currObject);
    }else{
        editObtAction(currObject);
    }
    deleteAction(actionCount);
    refresh();
    editFlag = 1;
}
function deleteAction(actionCount){
    expertJSON.actions.splice(actionCount, 1);
    actionCounter--;
    $("#summaryAction" + actionCount).remove();
    refresh();
    saveToStorage();
}
function editAttrAction(currObject){
    $("#actionSelect").val("Display Attribute").change();
    $("#actionAttribSelect").val(currObject["identifier"]["name"]);
}
function editObtAction(currObject){
    $("#actionSelect").val("Obtain Attribute").change();
    $("#actionAttribSelect").val(currObject["identifier"]["name"]);   
}
function editMessAction(currObject){
    $("#actionSelect").val("Display Message").change();
    $("#actionText").val(currObject["message"]).change();
    //$("#actionText").val(currObject["lines"][0]).change();
}
function parseRule(){
    var newItem = expertJSON.rules[ruleCounter];
    console.log("json string " + JSON.stringify(newItem));
    var name = newItem["name"];
    var antecedents = newItem["antecedents"];
    var consequents = newItem["consequents"];
    var antiArr = [];
    var consArr = [];
    var tempStr = "";
    antiArr = createAntiString(newItem);
    for(var n = 0; n < antiArr.length; n++){
        tempStr = tempStr.concat(antiArr[n] + " ");
    }

    var consString = "";
    for(var n = 0; n < consequents.length; n++){
            var name = consequents[n]["identifier"]["name"];
            var valueArr = consequents[n]["values"];
            console.log("value Array " + valueArr);
            if(valueArr !== undefined){ //Multi Value
                for(var j = 0; j < valueArr.length; j++){
                    var valueIndex = valueArr[j];
                    var value = consequents[n]["identifier"]["values"][valueIndex];
                    consString = consString.concat(name + " = " + value); 
                }
                if(n + 1 < consequents.length){
                    consString = consString.concat(" and ");
                }
            }else if(consequents[n]["identifier"]["values"] !== undefined){ //Single value
                var valueIndex = consequents[n]["value"];
                var value = consequents[n]["identifier"]["values"][valueIndex];
                consString = consString.concat(name + " = " + value);
                if(n + 1 < consequents.length){
                    consString = consString.concat(" and ");
                }
            }else{ //Numeric and bool Value
                var value = consequents[n]["value"];
                consString = consString.concat(name + " = " + value);
                if(n + 1 < consequents.length){
                    consString = consString.concat(" and ");
                }
            }


            consArr.push(consString);
            consString = "";
    }

    var summarySection = '<div class=\"head section group\" id="summaryRule\">'
					+ '<div class="col span_6_of_8">'
					+ '	Rule: '+newItem["name"]
                    +'  <p>Antecedents: '+tempStr+'</p>'
                    +'   <p>Consequents: '+consArr.toString()+'</p>'
					+'</div>'
					+'<div class="col span_2_of_8">'
					+'	<a onClick="editRule('+ ruleCounter +');" href="#">edit</a> / <a  onClick="deleteRule('+ ruleCounter +');" href="#">delete</a>'
					+  '</div>'
					+'</div>';
    $("#summaryRuleSection").append(summarySection);
    ruleCounter++;
    saveToStorage();
    editFlag = 0;
}
function convertRelation(rel){
    if(rel == 100){
        return "equals";
    }else if(rel == 101){
        return "not equal to";
    }
    else if(rel == 200){
        return "=";
    }
    else if(rel == 201){
        return "!=";
    }
    else if(rel == 202){
        return ">";
    }
    else if(rel == 203){
        return "<";
    }
    else if(rel == 204){
        return ">=";
        
    }else if(rel == 205){
        return "<=";
    }
}
function deleteRule(ruleCount){
    expertJSON.rules.splice(ruleCount, 1);
    ruleCounter--;
    $("#summaryRule" + ruleCount).remove();
    refresh();
    saveToStorage();
}
function editRule(ruleCount){
    if(editFlag === 1){
        alert("Please finish your current edit before starting a new one");
        return;
    }
    changeTab('rule');
    fillRule(expertJSON.rules[ruleCount]);
    deleteRule(ruleCount);
    editFlag = 1;   
}
function findAttributeDependency(attrCount){
    var attr = expertJSON.attributes[attrCount];
    var name = attr["identifier"]["name"];
    var question = attr["identifier"]["question"];
    
    for(var n = 0; n < expertJSON.actions.length; n++){

        var currAction = expertJSON.actions[n];
        if(currAction["type"] !== 431){
            if(currAction["identifier"]["name"] === name){ 
                actionsDependantOnAttr.push(name);
            }    
        }
    }
    findValuedAttributeInRule(attr);
}
function findValuedAttributeInRule(attribute){
    var attrName = attribute["identifier"]["name"];
    var attrVal = attribute["identifier"]["values"];
    
    var rules = expertJSON.rules;
    for(var n = 0; n < rules.length; n++){
        var nameOfRule = rules[n]["name"];
        var antiAttr = rules[n]["antecedents"];
        if(!antecedentChecker(antiAttr, attrName)){
            rulesDependantOnAttr.push(nameOfRule);
            continue;//So that there are no duplicate rules in the rules dependent array
        }
        var consAttr = rules[n]["consequents"];
        if(!antecedentChecker(consAttr, attrName)){
            rulesDependantOnAttr.push(nameOfRule);
        }
    }   
}
function antecedentChecker(anti, attrName){
    console.log("anti " + JSON.stringify(anti));
    for(var n = 0; n < anti.length; n++){
        for(var j = 0; j < anti[n].length; j++){
            var currAnti = anti[n][j]["identifier"]["name"];
            if(currAnti === attrName){
                return false;
            }
        }
    }
    return true;
}
//If true, disable finish. If false, enable finish
//Actually, this is not needed. Talk to Jeffery
function dontFinishCascade(){
    for(var n = 0; n < expertJSON.attributes.length; n++){
        findAttributeDependency(n);
    }
    return rulesDependantOnAttr.length > 0 || actionsDependantOnAttr.length > 0;
}