let drop1;
let drop2;
let drop3;

Template.dropDown.onRendered(function()
    {
      drop1 = document.querySelector("#dropdown1");
      drop2 = document.querySelector("#dropdown2");
      drop3 = document.querySelector("#dropdown3");
    });

Template.textBox.onRendered(function () {
  Session.set('numChars', 0);
});

Template.textBox.events({
    'input #postText': function(){
        Session.set('numChars', $('#postText').val().length);
      },

    'click #publish-post': function()
    {
        let post = $('#postText').val();
        $('#postText').val("");
        Session.set('numChars', 0);
        Meteor.call('insertPost', post);
    }
});

  Template.dropDown.events({
    'click #addButton': function()
    {
      console.log("add dropDown clicked");
      drop1.classList.toggle("show");
      drop2.classList.remove("show");
      drop3.classList.remove("show");
    },

    'click #notifButton': function()
    {
      console.log("notification dropDown clicked");
      drop1.classList.remove("show");
      drop2.classList.toggle("show");
      drop3.classList.remove("show");
    },

    'click #accountButton': function()
    {
      console.log("account dropDown clicked");
      drop1.classList.remove("show");
      drop2.classList.remove("show");
      drop3.classList.toggle("show");
    },

    'click #log-out': function()
    {
        Meteor.logout();
    }
  });

  Template.textBox.helpers({
    charCount: function() {
      return 140 - Session.get('numChars');
    },
  
    charClass: function() {
      if (Session.get('numChars') > 140) {
        return 'errCharCount';
      } else {
        return 'charCount';
      }
    },
  
    disableButton: function() {
      if (Session.get('numChars') <= 0 ||
          Session.get('numChars') > 140 ||
          !Meteor.user()) {
        return 'disabled';
      }
    }
  });

  Template.feedBox.helpers({
    'postMessage': function() {
      return Posts.find({}, { sort: {timestamp: -1}, limit: 10 });
    }
  });

  Template.contactList.helpers({
    'userFollower': function(){
      return Relationships.find({follower: Meteor.user().username}, { sort: {following: Meteor.user().username}, limit: 10});
    }
  });
  
  Template.feedBox.onCreated(function() {
    if (Meteor.user()) {
      this.subscribe('posts', Meteor.user().username);
      this.subscribe('ownPosts', Meteor.user().username);
    }
  });