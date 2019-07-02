var appvision_ext;
setTimeout(function() {    
    var values = [];
    var duplicate = [];
    var bgColor;
    var hoursLabel;
    var laggedHours;

    //Swip in days count will be stored in values array.
    $(".grdwfa").find("tr").each(function() { values.push($(this).find("td:nth-child(2)").html()); })

    //leave days count will be stored in duplicate array.
    for (var i = 0; i < values.length; i++) { 
        var duplicateContent = "&nbsp;"; 
        var currentvalue = "";
        currentvalue = values[i]; 
        currentvalue === duplicateContent ? duplicate.push(currentvalue) : null; }

    var presentDays = values.length - duplicate.length - 1;

    var totalHours = document.getElementById('MainContent_lblTotalHours').textContent;
    totalHours = totalHours.split(" ")[0];

    var totalDays = document.getElementById('MainContent_lblWorkingDays').textContent;
    totalDays = totalDays.split(" ")[0];

    var leaveDays = document.getElementById('MainContent_lblLeaveDays').textContent;
    leaveDays = leaveDays.split(" ")[0];

        
    var requiredHours = (totalDays - leaveDays) * 8;

    var sortedHours = requiredHours - totalHours;

    var num = sortedHours / (totalDays - presentDays);

    //var metExpectedHours = sortedHours / num;
    var metExpectedHours = ('0' + Math.floor(num) % 24).slice(-2) + ':' + ((num % 1) * 60 + '0').slice(0, 2); 

    sortedHours >= 0 ? bgColor = "crimson" : bgColor = "green";
    sortedHours >= 0 ? hoursLabel = "Total sorted hours for this month: " : hoursLabel = "Above expected hours for this month: ";

    var style = `background:${bgColor}; color: #fff; padding: 5px;`;
    
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
    currentMonth === selectedMonth ? laggHours = metExpectedHours : laggHours = "null";
    currentMonth === selectedMonth ? neededHours = neededHours : neededHours = "null";

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
    var requiredHoursStyles;
    var requiredHoursBG;
    spliceHours<8 ? requiredHoursBG = "crimson" : requiredHoursBG= "green";
    var requiredHoursStyles = `background:${requiredHoursBG}; color: #fff; padding: 5px;`;

    //Till now sorted hours for presented days
    var presentedDaysTotalHours = presentDays*8;
    var  presentedSortHours = totalHours - presentedDaysTotalHours;
    var presentedSortHoursBG;
    presentedSortHours < 0 ? presentedSortHoursBG="crimson" : presentedSortHoursBG = "green";
    var presentedSortHoursStyles = `background:${presentedSortHoursBG}; color: #fff; padding: 5px;`;
    var presentedSortHoursText;
    presentedSortHours < 0 ? presentedSortHoursText="lagged" : presentedSortHoursText="overtime";

    console.groupCollapsed();
    console.log("Expected Hours:" + requiredHours + ":00:00");
    console.log("Total Swiped Hours:" + totalHours + ":00:00");
    console.log("%c" + hoursLabel + sortedHours + "hrs", style);
    console.log("Required Swipe Hours:" + laggHours + "hrs");
    //console.log(lastOutTime);
    console.groupEnd();

    $("#header").append("<div style='right: 0; background: #f4f4f4; color: #333; padding: 10px;font-size: 1em; box-shadow:#d2d2d2 0px 3px 1px; line-height:30px;'> <div style='margin-bottom:5px; padding-left: 15px; display: inline;" + requiredHoursStyles + "'>For today you need  : " + neededHours + " hrs to match.</div> <div style='margin-bottom:5px; padding-left: 5px; display: inline; margin-left:3px;" + presentedSortHoursStyles + "'>Total present days:" + presentDays + ", Till EOD :"+ presentedSortHours +" hours "+ presentedSortHoursText +".</div> <div style='margin-bottom:5px; padding-left: 5px; display: inline;'>Total expected hours for this month : " + requiredHours + " hrs.</div> <div style='margin-bottom:5px; padding-left: 5px; display: inline;'>Total swiped : " + totalHours + " hrs</div> <div style ='display: inline;padding-left: 15px;" + style + "'> " + hoursLabel + sortedHours + " hrs </div> <div style='margin:12px 0 0 0; padding-left: 5px;display: inline;'>From tomorrow onwords you need to log: " + laggHours + "hrs only.</div></div>")
    
}, 500);
