var appvision_ext;
if(window.location.href === "https://intranet.appviewx.in/Login.aspx"){
	var name, password;
	name = document.getElementById("txtLoginName").value = "balaji.p";
	password = document.getElementById("txtLoginPassword").value = "appviewx@123";
	document.getElementsById("btnLogIn").click();
}

setTimeout(function() {  
    var values = [];
    var duplicate = [];
    var wfhVal = [];
    var WFH = [];
    var Leave = [];
    var AD = [];
    var HLeave = [];
    var bgColor;
    var hoursLabel;
    var laggedHours;
debugger;
    //Swip in days count will be stored in values array.
    $(".grdwfa").find("tr").each(function() { values.push($(this).find("td:nth-child(2)").html()); })
    //leave days count will be stored in duplicate array.
    for (var i = 0; i < values.length; i++) { 
        debugger
        var duplicateContent = "&nbsp;"; 
        var currentvalue = "";
        currentvalue = values[i]; 
        currentvalue === duplicateContent ? duplicate.push(currentvalue) : null; }

    //WFH days count will be stored in wfhVal array.
    $(".grdwfa").find("tr").each(function() { wfhVal.push($(this).find("td:nth-child(7)").html()); })
    //WFH days count will be stored in WFH array.
    for (var i = 0; i < wfhVal.length; i++) { 
        var wfhCurrentvalue = "";
        wfhCurrentvalue = wfhVal[i]; 
        if(wfhCurrentvalue === "WFH"){
            WFH.push(wfhCurrentvalue);
        }        
        else if (wfhCurrentvalue === "Leave") {
            Leave.push(wfhCurrentvalue);
        }
        else if (wfhCurrentvalue === "Auto-Deduct") {
            AD.push(wfhCurrentvalue);
        }
        else if (wfhCurrentvalue === "Leave(H)") {
            HLeave.push(wfhCurrentvalue);
        }
         else if (wfhCurrentvalue === "Auto-Deduct(H)") {
            HLeave.push(wfhCurrentvalue);
        }
    }

    var wfhDays = WFH.length;
    var Leave = Leave.length;
    var AD = AD.length;
    var HLeave = HLeave.length / 2 ;
    var presented = values.length;

    var presentDays = presented - duplicate.length - 1;
        presentDays = presentDays + wfhDays - HLeave;

    var totalHours = document.getElementById('MainContent_lblTotalHours').textContent;
    totalHours = totalHours.split(" ")[0];

    var totalDays = document.getElementById('MainContent_lblWorkingDays').textContent;
    totalDays = totalDays.split(" ")[0];
    
    
    // var leaveDays = document.getElementById('MainContent_lblLeaveDays').textContent;
    // leaveDays = leaveDays.split(" ")[0];
    debugger;
    var leaveDays = Leave + HLeave + AD;
    var requiredHours = (totalDays - leaveDays) * 8;

    var requiredPresentHours = presentDays * 8;

    var sortedHours = requiredHours - totalHours;

    var num = sortedHours / (totalDays - presentDays);

    //var num = sortedHours;

    //var metExpectedHours = sortedHours / num;
    var metExpectedHours = ('0' + Math.floor(num) % 24).slice(-2) + ':' + ((num % 1) * 60 + '0').slice(0, 2); 

    sortedHours >= 0 ? bgColor = "crimson" : bgColor = "green";
    sortedHours >= 0 ? hoursLabel = "Lack hours for this month*: " : hoursLabel = "Above expected hours for this month: ";

    var style = `background: none; color: ${bgColor}; padding: 5px; font-weight: bold;`;
    
    //get current month 
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var date = new Date();
    var currentMonth = month[date.getMonth()];
    var selectedValue = $("#MainContent_ddlSwipeMonth option:selected").text();
    var selectedMonth = selectedValue.split(",")[0];    
    currentMonth === selectedMonth ? laggHours = metExpectedHours : laggHours = "0";    
    var netData = $($(".grdwfa").find("tr")[1]).find("td")[5].textContent;
    var spliceHours;
    var spliceMints;
    if(netData.length === 7){ 
        spliceHours = netData.slice(0,1);
        spliceMints = netData.slice(2,4);
    }
    else if(netData.length === 8){
        spliceHours = netData.slice(0,2);
        spliceMints = netData.slice(3,5);
    }
    var netHours = spliceHours.concat(`.${spliceMints}`);
    var perDayHours = "08.00";
    var neededHrsDec = perDayHours - netHours;
    var neededHours = ('0' + Math.floor(neededHrsDec) % 24).slice(-2) + ':' + ((neededHrsDec % 1) * 60 + '0').slice(0, 2);
    currentMonth === selectedMonth ? neededHours = neededHours : neededHours = "0";
    var requiredHoursStyles;
    var requiredHoursBG;
    spliceHours<8 ? requiredHoursBG = "crimson" : requiredHoursBG= "green";
    var requiredHoursStyles = `background: none; color: ${requiredHoursBG}; padding: 5px; font-weight: bold;`;

    //Till now sorted hours for presented days
    var presentedDaysTotalHours = presentDays*8;
    var  presentedSortHours = totalHours - presentedDaysTotalHours;
    var presentedSortHoursBG;
    presentedSortHours < 0 ? presentedSortHoursBG="crimson" : presentedSortHoursBG = "green";
    var presentedSortHoursStyles = `background: none; color: ${presentedSortHoursBG}; padding: 5px; font-weight: bold;`;
    var presentedSortHoursText;
    presentedSortHours < 0 ? presentedSortHoursText="lagged" : presentedSortHoursText="overtime";

    console.groupCollapsed();
    console.log("Expected Hours:" + requiredHours + ":00:00");
    console.log("Total Swiped Hours:" + totalHours + ":00:00");
    console.log("%c" + hoursLabel + sortedHours + "hrs", style);
    console.log("Required Swipe Hours:" + laggHours + "hrs");
    //console.log(lastOutTime);
    console.groupEnd();

    $("#header").append("\
        <div style='right: 0; background: #fff; color: #333; padding: 10px 10px 0 10px;font-size: 1em; line-height:30px;'> \
        <div style='margin-bottom:5px; padding-left: 5px; display: inline;'>Total number of days present:" + presentDays + ".</div> \
        <div style='margin-bottom:5px; padding-left: 5px; display: inline;'> Expected hours for this month : " + requiredHours + " hrs.</div> \
        <div style='margin-bottom:5px; padding-left: 5px; display: inline;'></div> \
        <div style='margin-bottom:5px; padding-left: 5px; display: inline;'>Swiped hours for this month* : " + totalHours + " hrs.</div> \
        <div style ='display: inline;padding-left: 15px;" + style + "'>" + hoursLabel + sortedHours + " hrs.</div> \
        <div style='margin-bottom:5px; padding-left: 15px; display: inline;" + requiredHoursStyles + "'>Expected hours for today*  : " + neededHours + " hrs to match.</div> \
        <div style='margin-bottom:5px; padding-left: 5px; display: inline;" + presentedSortHoursStyles + "'>Deviation until today* : " + presentedSortHours +" hours "+ presentedSortHoursText +".</div> \
        <div style='margin:12px 0 0 0; padding-left: 5px;display: inline;'>Expected swipe hours from tomorrow: " + laggHours + "hrs only.</div> \
        <div style='padding-left: 5px;background: none;font-style: italic;text-align: right;font-size: 11px;'>note: * is based on your last swipe out</div>\
        </div>")    
}, 1500);