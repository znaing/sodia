Template.iconsBar.helpers({
    'posts': function() {
      if (Meteor.user()) {
        return Posts.find({ user: Meteor.user().username }).count();
      }
    },
  
    'following': function() {
      if (Meteor.user()) {
        return Relationships.find({ follower: Meteor.user().username }).count();
      }
    },
  
    'followers': function() {
      if (Meteor.user()) {
        return Relationships.find({ following: Meteor.user().username }).count();
      }
    }
  });