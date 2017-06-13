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
      document.getElementById("editEvent").innerHTML = "<form class='update'><div align='center'>edit event : <input type='text' name='text' id='text' value="+this.text+" > edit date : <input name='date' type='date' id='date' value="+this.date+"><br><br><button type='submit'>edit</button></div></form>";

  },

  'submit .update'(event){


    event.preventDefault();  //ไม่ให้มันรีโหลดเมื่อกด submit

    var id = this._id
    var text = document.getElementById('text').value;
    var date = document.getElementById('date').value;

    Meteor.call('tasks.update',id,text,date);   //ส่งตัว value ไปให้ tasks.update

  }
});
