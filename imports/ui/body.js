import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';
import './task.js';
import { ReactiveDict } from 'meteor/reactive-dict';


import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
   Meteor.subscribe('tasks');
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


    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    const date = target.date.value;


  if(confirm("Do you want to add" + "  \"" + text + "\" , Due :   " + " " +date +" " + " to a new task ?"  ) ){
    // Insert a task into the collection
   Meteor.call('tasks.insert', text,date);
  // Meteor.call('tashs.insert',date);

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