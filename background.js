chrome.browserAction.onClicked.addListener(function(tab) {   
	if(window.location.href.indexOf("https://intranet.appviewx.in/Login.asp")> -1){
		if(document.getElementById("txtLoginName").length && document.getElementById("txtLoginName").length === 1){
        document.getElementById("txtLoginName").value = "balaji.p";
        document.getElementById("txtLoginPassword").value = "appviewx@12";
         document.getElementById("submitbtn").click();
    	} 
	}

  window.open("https://intranet.appviewx.in/LMS/MySwipeDetails.aspx",'_blank');  
});