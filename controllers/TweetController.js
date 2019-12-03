const Tweet = require("../models/Tweet");

/*

Functions for communicating with mongo to read/update the list of users searched
*/


// go to mongo and select network and allow any url to come in
// go to azure and turn on app logging so can see console.log messages
exports.listAllTweets = (req, res) => {
  //console.log(">>>>>>>>>>>>>> IN listAllTweets <<<<<<<<<");
  return new Promise(function(resolve,reject){
  Tweet.find({}, (err, tweet) => {
    if (err) {
      console.log(err);
      resolve(err);
    }
    resolve(tweet);
  });
});
};

exports.createNewTweet = (req, res) => {
  return new Promise(function(resolve,reject){
  let newTweet = new Tweet(req);
  console.log(newTweet);
  newTweet.save((err, tweet) => {
    if (err) {
      resolve(err);
    }
    resolve(tweet);
  });
});
};

exports.readTweet = (req, body) => {
  return new Promise(function(resolve,reject){
  Tweet.findById(req, (err, tweet) => {
    if (err) {
      resolve(err);
    }
    resolve(tweet);
  });
});
};

exports.updateTweet = (req, res) => {
  console.log('tweet id at server is ' + req._id);
  return new Promise(function(resolve,reject){
  Tweet.findOneAndUpdate(
    { _id: req._id },  // don't know who changed the name from _id
    req,
    { new: true },  // true or false to let it add if not present?
    (err, tweet) => {
      if (err) {
        resolve(err);
      }
      console.log(tweet);
      resolve(tweet);
    }
  );
});
};



exports.deleteTweet = (req, res) => {
  Tweet.remove({ _id: req.params.tweetid }, (err, tweet) => {  // don't know who changed the name from _id
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Tweet successfully deleted" });
  });
};