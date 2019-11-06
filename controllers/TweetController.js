const Tweet = require("../models/Tweet");


// go to mongo and select network and allow any url to come in
// go to azure and turn on app logging so can see console.log messages
exports.listAllTweets = (req, res) => {
  console.log(">>>>>>>>>>>>>> IN listAllTweets <<<<<<<<<");
  Tweet.find({}, (err, tweet) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(tweet);
    console.log(tweet);
  });
};

exports.createNewTweet = (req, res) => {
  let newTweet = new Tweet(req.body);
  console.log(newTweet);
  newTweet.save((err, tweet) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(tweet);
  });
};

exports.readTweet = (req, body) => {
  Tweet.findById(req.params.tweetid, (err, tweet) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(tweet);
  });
};

exports.updateTweet = (req, res) => {
  console.log('tweet id at server is ' + req.params.tweetid);
  Tweet.findOneAndUpdate(
    { _id: req.params.tweetid },  // don't know who changed the name from _id
    req.body,
    { new: true },  // true or false to let it add if not present?
    (err, tweet) => {
      if (err) {
        res.status(500).send(err);
      }
      console.log(tweet);
      res.status(200).json(tweet);
    }
  );
};



exports.deleteTweet = (req, res) => {
  Tweet.remove({ _id: req.params.tweetid }, (err, tweet) => {  // don't know who changed the name from _id
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Tweet successfully deleted" });
  });
};