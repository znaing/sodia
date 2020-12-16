Template.userManagement.events({
    'click #signup': function() {
      var user = {
        username: $('#signup-username').val(),
        password: $('#signup-password').val(),
        profile: {
          fullname: $('#signup-fullname').val()
        }
      };
  
      Accounts.createUser(user, function (error) {
        if(error) alert(error);
      });
    },
  
    'click #login': function() {
      var username = $('#login-username').val();
      var password = $('#login-password').val();
  
      Meteor.loginWithPassword(username, password, function(error) {
        if(error) alert(error);
      });
    },
  
    'click #logout': function() {
      Meteor.logout();
    }
  });
  
  
  Template.followUsers.onCreated( function() {
    if (Meteor.user()) {
      this.subscribe('followings', Meteor.user().username);
      this.subscribe('followers', Meteor.user().username);
      this.subscribe('posts', Meteor.user().username);
    }
  });
  