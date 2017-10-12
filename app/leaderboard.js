PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function() {
      return PlayersList.find({}, {sort: {score: -1, name: 1} });
    },
    'selectedClass': function() {
      let playerId = this._id;
      let selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return 'selected';
      }
    },
    'selectedPlayer': function() {
      let selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne({ _id: selectedPlayer });
    }
  });

  Template.leaderboard.events({
    'click .player': function() {
      let playerId = this._id;
      Session.set('selectedPlayer', playerId);
      let selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
    },
    'click .increment' : function() {
      let selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({ _id: selectedPlayer}, {$inc: {score: 5}});
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({ _id: selectedPlayer }, {$inc: {score: -5} });
    }
  });
}

if (Meteor.isServer) {

}

