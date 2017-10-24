//the below uses jQuery "on" http://api.jquery.com/on/ (jQuery 1.7 + required, otherwise use "delegate" or "live") so that any 
//<a class="fileDownload..."/> that is ever loaded into an Ajax site will automatically use jquery.fileDownload.js
//if you are using "on":
//you should generally be able to reduce the scope of the selector below "document" but it is used in this example so it
//works for possible dynamic manipulation in the entire DOM
 
//
// Simple rich user experience - jquery.fileDownload.js & jQuery UI Dialog
// uses the optional "options" argument
//
$(function() {
    $(document).on("click", "a.fileDownloadSimpleRichExperience", function() {
        $.fileDownload($(this).attr('href'), {
            preparingMessageHtml: "We are preparing your offline application, please wait...",
            failMessageHtml: "There was a problem generating your system, please try again."
        });
        return false; //this is critical to stop the click event which will trigger a normal file download!
    });
});