function upload(json, id){
    //asummes the json uploaded is in engine format
    localStorage.setItem("ExpertJSON" , JSON.stringify(json));
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


function readSingleFile(evt) {

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
            upload(JSON.parse(contents));
            window.location.href = 'expert.html';
          } else {
            alert("Please select a json file!!");
          }
      }
      fr.readAsText(file);
    } else {
      alert("Failed to load file");
    }
}    
   
