//
//Created By Mark Clarke
//---<@

$(document).ready(function() {
    var time = moment().format('MMMM Do YYYY h:mm:a');
    $("#time").append("<div>" + time + "</div>");
    })
  
  
  // Variable to store and loop through scheduler.
  var myDay = [
    {
        id: "0",
        hour: "9",
        time: 9,
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: 10,
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: 11,
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: 12,
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "1",
        time: 13,
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "2",
        time: 14,
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "3",
        time: 15,
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "4",
        time: 16,
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "5",
        time: 17,
        meridiem: "pm",
        reminder: ""
    },
    {
      id: "9",
      hour: "6",
      time: 18,
      meridiem: "pm",
      reminder: ""
  },
  {
    id: "10",
    hour: "7",
    time: 19,
    meridiem: "pm",
    reminder: ""
  },
  {
    id: "11",
    hour: "8",
    time: 20,
    meridiem: "pm",
    reminder: ""
  },
  {
    id: "12",
    hour: "9",
    time: 21,
    meridiem: "pm",
    reminder: ""
  }
    
  ]
  
  
  
  // Saves data to localStorage.
  function screenShow() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
  }
  
  // Sets any data in localStorage to the view.
  function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
  }
  
  // Sets any existing localStorage data to the view if it exists.
  function showPassStorage() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));
  
    if (storedDay) {
        myDay = storedDay;
    }
  
    
    screenShow();
  }
  
  
  
  // Creates the visuals for the scheduler body.
  myDay.forEach(function(thisHour) {
    // Creates timeblocks row.
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);
  
    // Creates time field.
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });
  
    // Creates schdeduler data.
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < parseInt(moment().format("H"))) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === parseInt(moment().format("H"))) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > parseInt(moment().format("H"))) {
        planData.attr({
            "class": "future"
        })
    }
  
    
    // Creates save button.
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
  })
  
  showPassStorage();
  
  
  // Saves data to be used in localStorage.
  $(".saveBtn").click( function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    showPassStorage();
    screenShow();
  })