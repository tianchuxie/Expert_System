

function sendToUserUIFromApp() { 
	var formHTML = '	<form id="sendForm" action="UserUI_For_Expert/expert.html" method="GET">'
+'    <input type="hidden" id="jsonString" name="jsonString" />'
+'    <input type="submit" />'
+'	</form>'

	$("#hiddenJSON").append(formHTML);
	
	//document.getElementById("jsonString").value = JSON.stringify(expertToEngineJson(expertJSON));
	
	document.getElementById("jsonString").value = '';
	console.log(JSON.parse(document.getElementById("jsonString").value));
	document.getElementById("sendForm").submit();

	
}
function sendData(data) {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  // We turn the data object into an array of URL encoded key value pairs.
  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  // We combine the pairs into a single string and replace all encoded spaces to 
  // the plus character to match the behaviour of the web browser form submit.
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  // We define what will happen if the data is successfully sent
  XHR.addEventListener('load', function(event) {
    alert('Yeah! Data sent and response loaded.');
  });

  // We define what will happen in case of error
  XHR.addEventListener('error', function(event) {
    alert('Oups! Something goes wrong.');
  });

  // We setup our request
  XHR.open('POST', 'http://ucommbieber.unl.edu/CORS/cors.php');

  // We add the required HTTP header to handle a form data POST request
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  XHR.setRequestHeader('Content-Length', urlEncodedData.length);

  // And finally, We send our data.
  XHR.send(urlEncodedData);
}




function sendToUserLocalS() { 
  window.localStorage.setItem('acsJSON', JSON.stringify(acs));
// 	window.localStorage.setItem('acsJSON', JSON.stringify({"certification":"authors: glenn lundy and james reggia (1980)     ***this is an experimental system***     ***that is not for use in practice***","identifiers":[{"name":"sex","question":"What is your sex?","values":["male","female"]},{"name":"age","question":"How old are you?"},{"name":"currently sexually active","question":"Are you currently sexually active?"},{"name":"family history","question":"What is your family history?","values":["familial polyposis","breast cancer","colon or rectal cancer"]},{"name":"past medical history","question":"What is your past medical history?","values":["breast cancer","colon or rectal cancer","polyps","ulcerative colitis","infertility","failure of ovulation","abnormal uterine bleeding","estrogen therapy","gardner's syndrome"]},{"name":"past sexual history","question":"What is your past sexual history?","values":["multiple sexual partners","first intercourse before age eighteen"]},{"name":"heavy smoker","question":"Are you a heavy smoker?"},{"name":"obesity","question":"Do you have obesity?"},{"name":"chronic exposure to asbestos or other lung carcinogens","question":"Do you have chronic exposure to asbestos or other lung carcinogens?"},{"name":"negative proctosigmoidoscopy annually times two","question":"Have you had two negative proctosigmoidoscopy annually?"},{"name":"negative pap smear annually times two","question":"Have you had two negative pap smears annually?"},{"name":"previous negative mammogram","question":"Have you had a negative mammogram?"},{"name":"cancers at an increased risk","question":"ERROR: SHOULD NOT SEE THIS","values":["breast cancer","cervical cancer","colon or rectal cancer","endometrial cancer","lung cancer"]},{"name":"american cancer society recommendations","question":"ERROR: SHOULD NOT SEE THIS","values":["proctosigmoidoscopy every three to five years","proctosigmoidoscopy annually","reevaluate patient with this program in two years","stool guaiac annually","digital rectal exam annually","breast self-examination monthly","breast exam by physician every three years","breast exam by physician annually","baseline mammography","mammography annually","evaluation by personal physician about mammography","pap test every three years","pap test annually","pap test at menopause","pelvic examination every three years","pelvic examination annually","pelvic examination at menopause","prostate and testicle exam every three years","prostate and testicle exam annually","-thyroid -lymphatic -skin and -oral exam annually","-thyroid -lymphatic -skin and -oral exam every three years","examination of ovaries every three years","examination of ovaries annually","endometrial biopsy at menopause","endometrial biopsy","end exposure to lung carcinogens","unacceptable patient description"]}],"attributes":[{"type":0,"identifier":0},{"type":4,"identifier":1,"ranges":[{"lower":{"value":12,"inc":true},"upper":{"value":100,"inc":false}}]},{"type":1,"identifier":2},{"type":2,"identifier":3},{"type":2,"identifier":4},{"type":2,"identifier":5},{"type":1,"identifier":6},{"type":1,"identifier":7},{"type":1,"identifier":8},{"type":1,"identifier":9},{"type":1,"identifier":10},{"type":1,"identifier":11},{"type":2,"identifier":12},{"type":2,"identifier":13}],"rules":[{"name":"risk1","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":4,"relation":100,"values":[[4,5,6,7]]},{"identifier":7,"relation":100,"value":true}]],"consequents":[{"identifier":12,"values":[3]}],"commands":[]},{"name":"risk2","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":5,"relation":100,"values":[[0,1]]}]],"consequents":[{"identifier":12,"values":[1]}],"commands":[]},{"name":"risk3","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":3,"relation":100,"values":[[1]]},{"identifier":4,"relation":100,"values":[[0]]}]],"consequents":[{"identifier":12,"values":[0]}],"commands":[]},{"name":"risk4","antecedents":[[{"identifier":1,"relation":204,"value":20}],[{"identifier":3,"relation":100,"values":[[2,0]]},{"identifier":4,"relation":100,"values":[[2,8,3,1]]}]],"consequents":[{"identifier":12,"values":[2]}],"commands":[]},{"name":"risk5","antecedents":[[{"identifier":1,"relation":204,"value":40}],[{"identifier":6,"relation":100,"value":true},{"identifier":8,"relation":100,"value":true}]],"consequents":[{"identifier":12,"values":[4]}],"commands":[]},{"name":"error1","antecedents":[[{"identifier":0,"relation":100,"values":[[0]]}],[{"identifier":4,"relation":100,"values":[[5,6,7]]}]],"consequents":[{"identifier":13,"values":[26]}],"commands":[{"type":431,"message":" *** warning ***  recommendations invalidated by nonsense description of a male patient with a past history of either failure of ovulation, abnormal uterine bleeding, or estrogen therapy."}]},{"name":"screen1","antecedents":[[{"identifier":1,"relation":204,"value":50}],[{"identifier":9,"relation":100,"value":true}],[{"identifier":12,"relation":101,"values":[[2]]}]],"consequents":[{"identifier":13,"values":[0]}],"commands":[]},{"name":"screen2","antecedents":[[{"identifier":1,"relation":204,"value":50}],[{"identifier":9,"relation":100,"value":false}],[{"identifier":12,"relation":101,"values":[[2]]}]],"consequents":[{"identifier":13,"values":[1,2]}],"commands":[]},{"name":"screen3","antecedents":[[{"identifier":1,"relation":204,"value":50}],[{"identifier":12,"relation":100,"values":[[2]]}]],"consequents":[{"identifier":13,"values":[1]}],"commands":[]},{"name":"screen4","antecedents":[[{"identifier":1,"relation":204,"value":50}]],"consequents":[{"identifier":13,"values":[3]}],"commands":[]},{"name":"screen5","antecedents":[[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[4]}],"commands":[]},{"name":"screen6","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":205,"value":65}],[{"identifier":12,"relation":101,"values":[[1]]}],[{"identifier":10,"relation":100,"value":true}]],"consequents":[{"identifier":13,"values":[11]}],"commands":[]},{"name":"screen7","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":205,"value":65}],[{"identifier":12,"relation":101,"values":[[1]]}],[{"identifier":10,"relation":100,"value":true}]],"consequents":[{"identifier":13,"values":[12,2]}],"commands":[]},{"name":"screen9","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":203,"value":20}],[{"identifier":2,"relation":100,"value":true}],[{"identifier":12,"relation":101,"values":[[1]]}],[{"identifier":10,"relation":100,"value":true}]],"consequents":[{"identifier":13,"values":[11]}],"commands":[]},{"name":"screen10","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":203,"value":20}],[{"identifier":2,"relation":100,"value":true}],[{"identifier":12,"relation":101,"values":[[1]]}],[{"identifier":10,"relation":100,"value":false}]],"consequents":[{"identifier":13,"values":[12,2]}],"commands":[]},{"name":"screen12","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":12,"relation":100,"values":[[1]]}]],"consequents":[{"identifier":13,"values":[12,15]}],"commands":[]},{"name":"screen13","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":203,"value":40}],[{"identifier":12,"relation":101,"values":[[1]]}]],"consequents":[{"identifier":13,"values":[14]}],"commands":[]},{"name":"screen14","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[15]}],"commands":[]},{"name":"screen15","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":205,"value":40}],[{"identifier":12,"relation":101,"values":[[0]]}]],"consequents":[{"identifier":13,"values":[6]}],"commands":[]},{"name":"screen16","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[7]}],"commands":[]},{"name":"screen17","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":205,"value":40}],[{"identifier":12,"relation":100,"values":[[0]]}]],"consequents":[{"identifier":13,"values":[7]}],"commands":[]},{"name":"screen18","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}]],"consequents":[{"identifier":13,"values":[5]}],"commands":[]},{"name":"screen19","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":202,"value":50}]],"consequents":[{"identifier":13,"values":[9]}],"commands":[]},{"name":"screen20","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":35}],[{"identifier":1,"relation":205,"value":50}],[{"identifier":11,"relation":100,"value":false}]],"consequents":[{"identifier":13,"values":[8]}],"commands":[]},{"name":"screen21","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":35}],[{"identifier":12,"relation":100,"values":[[0]]}]],"consequents":[{"identifier":13,"values":[10]}],"commands":[]},{"name":"screen22","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":202,"value":40}],[{"identifier":1,"relation":205,"value":50}],[{"identifier":11,"relation":100,"value":true}],[{"identifier":12,"relation":101,"values":[[0]]}]],"consequents":[{"identifier":13,"values":[10]}],"commands":[]},{"name":"screen23","antecedents":[[{"identifier":12,"relation":100,"values":[[4]]}]],"consequents":[{"identifier":13,"values":[25]}],"commands":[]},{"name":"screen24","antecedents":[[{"identifier":0,"relation":100,"values":[[0]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":203,"value":40}]],"consequents":[{"identifier":13,"values":[17,20]}],"commands":[]},{"name":"screen25","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":203,"value":40}]],"consequents":[{"identifier":13,"values":[21,20]}],"commands":[]},{"name":"screen26","antecedents":[[{"identifier":0,"relation":100,"values":[[0]]}],[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[18,19]}],"commands":[]},{"name":"screen27","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[22,19]}],"commands":[]},{"name":"screen28","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":40}],[{"identifier":12,"relation":100,"values":[[3]]}]],"consequents":[{"identifier":13,"values":[23,16,13]}],"commands":[]}],"actions":[{"type":431,"message":"     this decision-support system will assess an individual for cancer risk and generate recommendations for appropriate screening tests. it is only for use with asymptomatic people and its suggestions are subject to the physician's judgement in every case.  the recommendations, which only apply to screening for early cancer and not to screening for the detection of other diseases, are based on the latest american cancer society recommendations described in             the cancer related health checkup            american cancer society, feb. 8, 1980  note: this is an experimental system that has not been         approved for use in practice!  type 'continue.' to begin"},{"type":431,"message":" ok - let's begin by determining if the individual in question is at increased risk for any of the common types of cancer. "},{"type":422,"identifier":12},{"type":431,"message":" ok - at this point we can say that this person is at increased risk for the following types of cancer:"},{"type":417,"identifier":12},{"type":431,"message":" now let's determine what the american cancer society recommends as screening tests for this individual . . ."},{"type":422,"identifier":13},{"type":431,"message":" ok - the american cancer society recommends that this individual be screened for cancer as follows:"},{"type":417,"identifier":13},{"type":431,"message":" note that routine chest xray and sputum cytology for early detection of lung cancer are specifically excluded from these recommendations.  thanks for using this system. type 'next case.' if you want to repeat the above with another person, or 'stop.' if you are finished."}]}));
	window.location.href = 'UserUI_For_Expert/expert.html';
		
}


function sendToExpertLocalS() { 
  window.localStorage.setItem('acsJSON', JSON.stringify((JSON.parse(JSON.stringify(acs)))));
// 	window.localStorage.setItem('acsJSON', JSON.stringify((JSON.parse(JSON.stringify({"certification":"authors: glenn lundy and james reggia (1980)     ***this is an experimental system***     ***that is not for use in practice***","identifiers":[{"name":"sex","question":"What is your sex?","values":["male","female"]},{"name":"age","question":"How old are you?"},{"name":"currently sexually active","question":"Are you currently sexually active?"},{"name":"family history","question":"What is your family history?","values":["familial polyposis","breast cancer","colon or rectal cancer"]},{"name":"past medical history","question":"What is your past medical history?","values":["breast cancer","colon or rectal cancer","polyps","ulcerative colitis","infertility","failure of ovulation","abnormal uterine bleeding","estrogen therapy","gardner's syndrome"]},{"name":"past sexual history","question":"What is your past sexual history?","values":["multiple sexual partners","first intercourse before age eighteen"]},{"name":"heavy smoker","question":"Are you a heavy smoker?"},{"name":"obesity","question":"Do you have obesity?"},{"name":"chronic exposure to asbestos or other lung carcinogens","question":"Do you have chronic exposure to asbestos or other lung carcinogens?"},{"name":"negative proctosigmoidoscopy annually times two","question":"Have you had two negative proctosigmoidoscopy annually?"},{"name":"negative pap smear annually times two","question":"Have you had two negative pap smears annually?"},{"name":"previous negative mammogram","question":"Have you had a negative mammogram?"},{"name":"cancers at an increased risk","question":"ERROR: SHOULD NOT SEE THIS","values":["breast cancer","cervical cancer","colon or rectal cancer","endometrial cancer","lung cancer"]},{"name":"american cancer society recommendations","question":"ERROR: SHOULD NOT SEE THIS","values":["proctosigmoidoscopy every three to five years","proctosigmoidoscopy annually","reevaluate patient with this program in two years","stool guaiac annually","digital rectal exam annually","breast self-examination monthly","breast exam by physician every three years","breast exam by physician annually","baseline mammography","mammography annually","evaluation by personal physician about mammography","pap test every three years","pap test annually","pap test at menopause","pelvic examination every three years","pelvic examination annually","pelvic examination at menopause","prostate and testicle exam every three years","prostate and testicle exam annually","-thyroid -lymphatic -skin and -oral exam annually","-thyroid -lymphatic -skin and -oral exam every three years","examination of ovaries every three years","examination of ovaries annually","endometrial biopsy at menopause","endometrial biopsy","end exposure to lung carcinogens","unacceptable patient description"]}],"attributes":[{"type":0,"identifier":0},{"type":4,"identifier":1,"ranges":[{"lower":{"value":12,"inc":true},"upper":{"value":100,"inc":false}}]},{"type":1,"identifier":2},{"type":2,"identifier":3},{"type":2,"identifier":4},{"type":2,"identifier":5},{"type":1,"identifier":6},{"type":1,"identifier":7},{"type":1,"identifier":8},{"type":1,"identifier":9},{"type":1,"identifier":10},{"type":1,"identifier":11},{"type":2,"identifier":12},{"type":2,"identifier":13}],"rules":[{"name":"risk1","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":4,"relation":100,"values":[[4,5,6,7]]},{"identifier":7,"relation":100,"value":true}]],"consequents":[{"identifier":12,"values":[3]}],"commands":[]},{"name":"risk2","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":5,"relation":100,"values":[[0,1]]}]],"consequents":[{"identifier":12,"values":[1]}],"commands":[]},{"name":"risk3","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":3,"relation":100,"values":[[1]]},{"identifier":4,"relation":100,"values":[[0]]}]],"consequents":[{"identifier":12,"values":[0]}],"commands":[]},{"name":"risk4","antecedents":[[{"identifier":1,"relation":204,"value":20}],[{"identifier":3,"relation":100,"values":[[2,0]]},{"identifier":4,"relation":100,"values":[[2,8,3,1]]}]],"consequents":[{"identifier":12,"values":[2]}],"commands":[]},{"name":"risk5","antecedents":[[{"identifier":1,"relation":204,"value":40}],[{"identifier":6,"relation":100,"value":true},{"identifier":8,"relation":100,"value":true}]],"consequents":[{"identifier":12,"values":[4]}],"commands":[]},{"name":"error1","antecedents":[[{"identifier":0,"relation":100,"values":[[0]]}],[{"identifier":4,"relation":100,"values":[[5,6,7]]}]],"consequents":[{"identifier":13,"values":[26]}],"commands":[{"type":431,"message":" *** warning ***  recommendations invalidated by nonsense description of a male patient with a past history of either failure of ovulation, abnormal uterine bleeding, or estrogen therapy."}]},{"name":"screen1","antecedents":[[{"identifier":1,"relation":204,"value":50}],[{"identifier":9,"relation":100,"value":true}],[{"identifier":12,"relation":101,"values":[[2]]}]],"consequents":[{"identifier":13,"values":[0]}],"commands":[]},{"name":"screen2","antecedents":[[{"identifier":1,"relation":204,"value":50}],[{"identifier":9,"relation":100,"value":false}],[{"identifier":12,"relation":101,"values":[[2]]}]],"consequents":[{"identifier":13,"values":[1,2]}],"commands":[]},{"name":"screen3","antecedents":[[{"identifier":1,"relation":204,"value":50}],[{"identifier":12,"relation":100,"values":[[2]]}]],"consequents":[{"identifier":13,"values":[1]}],"commands":[]},{"name":"screen4","antecedents":[[{"identifier":1,"relation":204,"value":50}]],"consequents":[{"identifier":13,"values":[3]}],"commands":[]},{"name":"screen5","antecedents":[[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[4]}],"commands":[]},{"name":"screen6","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":205,"value":65}],[{"identifier":12,"relation":101,"values":[[1]]}],[{"identifier":10,"relation":100,"value":true}]],"consequents":[{"identifier":13,"values":[11]}],"commands":[]},{"name":"screen7","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":205,"value":65}],[{"identifier":12,"relation":101,"values":[[1]]}],[{"identifier":10,"relation":100,"value":true}]],"consequents":[{"identifier":13,"values":[12,2]}],"commands":[]},{"name":"screen9","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":203,"value":20}],[{"identifier":2,"relation":100,"value":true}],[{"identifier":12,"relation":101,"values":[[1]]}],[{"identifier":10,"relation":100,"value":true}]],"consequents":[{"identifier":13,"values":[11]}],"commands":[]},{"name":"screen10","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":203,"value":20}],[{"identifier":2,"relation":100,"value":true}],[{"identifier":12,"relation":101,"values":[[1]]}],[{"identifier":10,"relation":100,"value":false}]],"consequents":[{"identifier":13,"values":[12,2]}],"commands":[]},{"name":"screen12","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":12,"relation":100,"values":[[1]]}]],"consequents":[{"identifier":13,"values":[12,15]}],"commands":[]},{"name":"screen13","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":203,"value":40}],[{"identifier":12,"relation":101,"values":[[1]]}]],"consequents":[{"identifier":13,"values":[14]}],"commands":[]},{"name":"screen14","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[15]}],"commands":[]},{"name":"screen15","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":205,"value":40}],[{"identifier":12,"relation":101,"values":[[0]]}]],"consequents":[{"identifier":13,"values":[6]}],"commands":[]},{"name":"screen16","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[7]}],"commands":[]},{"name":"screen17","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":205,"value":40}],[{"identifier":12,"relation":100,"values":[[0]]}]],"consequents":[{"identifier":13,"values":[7]}],"commands":[]},{"name":"screen18","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}]],"consequents":[{"identifier":13,"values":[5]}],"commands":[]},{"name":"screen19","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":202,"value":50}]],"consequents":[{"identifier":13,"values":[9]}],"commands":[]},{"name":"screen20","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":35}],[{"identifier":1,"relation":205,"value":50}],[{"identifier":11,"relation":100,"value":false}]],"consequents":[{"identifier":13,"values":[8]}],"commands":[]},{"name":"screen21","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":35}],[{"identifier":12,"relation":100,"values":[[0]]}]],"consequents":[{"identifier":13,"values":[10]}],"commands":[]},{"name":"screen22","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":202,"value":40}],[{"identifier":1,"relation":205,"value":50}],[{"identifier":11,"relation":100,"value":true}],[{"identifier":12,"relation":101,"values":[[0]]}]],"consequents":[{"identifier":13,"values":[10]}],"commands":[]},{"name":"screen23","antecedents":[[{"identifier":12,"relation":100,"values":[[4]]}]],"consequents":[{"identifier":13,"values":[25]}],"commands":[]},{"name":"screen24","antecedents":[[{"identifier":0,"relation":100,"values":[[0]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":203,"value":40}]],"consequents":[{"identifier":13,"values":[17,20]}],"commands":[]},{"name":"screen25","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":20}],[{"identifier":1,"relation":203,"value":40}]],"consequents":[{"identifier":13,"values":[21,20]}],"commands":[]},{"name":"screen26","antecedents":[[{"identifier":0,"relation":100,"values":[[0]]}],[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[18,19]}],"commands":[]},{"name":"screen27","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":40}]],"consequents":[{"identifier":13,"values":[22,19]}],"commands":[]},{"name":"screen28","antecedents":[[{"identifier":0,"relation":100,"values":[[1]]}],[{"identifier":1,"relation":204,"value":40}],[{"identifier":12,"relation":100,"values":[[3]]}]],"consequents":[{"identifier":13,"values":[23,16,13]}],"commands":[]}],"actions":[{"type":431,"message":"     this decision-support system will assess an individual for cancer risk and generate recommendations for appropriate screening tests. it is only for use with asymptomatic people and its suggestions are subject to the physician's judgement in every case.  the recommendations, which only apply to screening for early cancer and not to screening for the detection of other diseases, are based on the latest american cancer society recommendations described in             the cancer related health checkup            american cancer society, feb. 8, 1980  note: this is an experimental system that has not been         approved for use in practice!  type 'continue.' to begin"},{"type":431,"message":" ok - let's begin by determining if the individual in question is at increased risk for any of the common types of cancer. "},{"type":422,"identifier":12},{"type":431,"message":" ok - at this point we can say that this person is at increased risk for the following types of cancer:"},{"type":417,"identifier":12},{"type":431,"message":" now let's determine what the american cancer society recommends as screening tests for this individual . . ."},{"type":422,"identifier":13},{"type":431,"message":" ok - the american cancer society recommends that this individual be screened for cancer as follows:"},{"type":417,"identifier":13},{"type":431,"message":" note that routine chest xray and sputum cytology for early detection of lung cancer are specifically excluded from these recommendations.  thanks for using this system. type 'next case.' if you want to repeat the above with another person, or 'stop.' if you are finished."}]})))));
	window.location.href = 'expert_UI.html';
		
}

function clearStartFresh() { 
  window.localStorage.clear();
  window.location.href = 'expert_UI.html';
  // window.localStorage.removeItem("acsJSON");
}
// function uploadToExpert(json){
  
//     var engineJSON = engineToExpertJson(json);
    
    
    
//     console.log("json uploaded saved to storage Expert");
//     // window.localStorage.setItem("ExpertJSON" , JSON.stringify(engineToExpertJson(JSON.parse(JSON.stringify(json)))));
//     window.localStorage.setItem("ExpertJSON" , JSON.stringify(engineJSON));
//     console.log("json uploaded saved to storage Expert local");
//     window.location.href = 'expert_UI.html';
    
// }
// function uploadToUser(json){
//     //asummes the json uploaded is in engine format
//     window.localStorage.setItem("ExpertJSON" , JSON.stringify(json));
//     console.log("json uploaded saved to storage User");
//     window.location.href = 'UserUI_For_Expert/expert.html';
    
// }

function upload(json){
    //asummes the json uploaded is in engine format
    window.localStorage.setItem("ExpertJSON" , JSON.stringify(json));
    console.log("json uploaded saved to storage in expert engine");
    
    
}


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
} 
//ADD To check if is an actual engine file or not


function readSingleFile(evt,str) {

    //Retrieve the first (and only!) File from the FileList object
    var input = document.getElementById(evt);
    if (!input)
      throw "Could not find the input element.";
    var file = input.files[0];
    if (!file)
      // throw "Please select a file before clicking 'Load'";
      alert("Please select a file before clicking on Interface");
    var fr = new FileReader();
    if (fr){
      console.log("Sanity Testing");
      fr.onload = function(e) { 
  	      var contents = e.target.result;
          // alert( "Got the file.n" 
          //       +"name: " + file.name + "\n"
          //       +"type: " + file.type + "\n"
          // );
          if(IsJsonString(contents)){
            // alert("Got a JSon!!");
            console.log("Hello World" + str);
            if (str == "expert"){
              upload(JSON.parse(contents));
              window.location.href = 'expert_UI.html';
            } else if (str == "user"){
              upload(JSON.parse(contents));
              window.location.href = 'UserUI_For_Expert/expert.html';
            }
          } else {
            alert("Please select a json file!!");
          }
      }
      fr.readAsText(file);
    } else {
      alert("Failed to load file");
    }
}    
   
  