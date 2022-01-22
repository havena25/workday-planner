$(function() {});

// Moment variables 

var today = moment().format("dddd, Do MMMM hh:mm a");

var currentHour = moment().format("H A");

// Current day function for header

$("#today").text(today);


// Variables for each hour of the work day

var scheduleDay = [
	{ time: "9 AM", event: "" },
	{ time: "10 AM", event: "" },
	{ time: "11 AM", event: "" },
	{ time: "12 PM", event: "" },
	{ time: "1 PM", event: "" },
	{ time: "2 PM", event: "" },
	{ time: "3 PM", event: "" },
	{ time: "4 PM", event: "" },
	{ time: "5 PM", event: "" },
	{ time: "6 PM", event: "" }
];

// Adds local storage to check previous entries to planner

var checkPrevious = JSON.parse(localStorage.getItem("dayPlanner"));
	if (checkPrevious !== null) {
	scheduleDay = checkPrevious;
}

// Functions for planner to be built

scheduleDay.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColour = colourMe(timeLabel);

	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColour +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';



	$(".container").append(row);
});

// Function to add different colours to past, present and future hours

function colourMe(time) {
	var planNow = moment(currentHour, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

// Save button local storage and functions

$(".saveBtn").on("click", function(event) {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);


	scheduleDay[blockID].event = userEntry;

	localStorage.setItem("dayPlanner", JSON.stringify(scheduleDay));
});


