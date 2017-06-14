import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';
import './task.js';
import { ReactiveDict } from 'meteor/reactive-dict';


import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
   Meteor.subscribe('tasks');



   var items = document.getElementsByClassName("demo"),
       i, len;



  const countDownDate2 = new Date().getTime();
     // Update the count down every 1 second
  var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate2 - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.querySelector('.demo').innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // loop through all elements having class name ".my-class"
    for (i = 0, len = items.length; i < len; i++) {
        items[i].innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
    }

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      for (i = 0, len = items.length; i < len; i++) {
          items[i].innerHTML = "EXPIRED";
      }

    }
  }, 1000);
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
   return Tasks.find({}, { sort: { createdAt: -1 } });
 },
 incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },

});


Template.body.events({
  'submit .new-task'(event) {

    // Prevent default browser form submit
    event.preventDefault();

     //Get date

     //Get date
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    const date = target.date.value;
    const countDownDate = new Date(date).getTime();

  if(confirm("Do you want to add" + "  \"" + text + "\" , Due :   " + " " +date +" " + " to a new task ?"  ) ){
    // Insert a task into the collection
   Meteor.call('tasks.insert', text,date);
  // Meteor.call('tashs.insert',date);
  console.log(date);
  //test count down



// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.querySelector(".demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
  // test count down

    }
    else {
        return false
    }


    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
