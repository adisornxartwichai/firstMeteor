import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    if (confirm("Delete"+"  \""+this.text+"\"  "+"from tasks board ?")){
        Meteor.call('tasks.remove', this._id);
   }
   else {
      return false;
   }
    // Tasks.remove(this._id);
  },
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
  'click .edit'(){
      document.getElementById("editEvent").innerHTML = "<div align='center'>edit event : <input type='text' value="+this.text+"> edit date : <input type='date' value="+this.date+"><br><br><button type='submit'>edit</button></div>";

  }
});
