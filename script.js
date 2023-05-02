// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  var timeSections = $(".time-block");
  function updateTime() {
    var currentHour = dayjs().format("H");
    for (var i = 1; i < timeSections.length; i++) {
      timeSections[i].classList.remove("past");     // These are the actual document elements 
      timeSections[i].classList.remove("present");  //  not jquery elements, so you have to use
      timeSections[i].classList.remove("future");   //  this notation
      sectionTime = timeSections[i].id;
      sectionTime = sectionTime.substring(5);
      if (sectionTime < currentHour) {
        timeSections[i].classList.add("past");
      } else if (sectionTime > currentHour) {
        timeSections[i].classList.add("future");
      } else {
        timeSections[i].classList.add("present");
      }
    }
    // For some reason the hour-9 row wasn't working in the for loop, so I readdress it directly
    //  the for loop now starts at i=1 so as to avoid redundancy
    var firstRow = $("#hour-9");
    firstRow.removeClass("past present future");
    if (currentHour < 9) {
      firstRow.addClass("future");
    } else if (currentHour > 9) {
      firstRow.addClass("past");
    } else {
      firstRow.addClass("present");
    }
  }
  updateTime();
  setRowColors = setInterval(updateTime, 1000)
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  currentDay = $("#currentDay");
  currentTime = $("#currentTime");
  currentDay.text(dayjs().format("MMM D, YYYY"));
  currentTime.text(dayjs().format("h:mm:s"));
  setDayAndTime = setInterval(function () {
    currentDay.text(dayjs().format("MMM D, YYYY"));
    currentTime.text(dayjs().format("h:mm:s"));
  }, 1000)
});
