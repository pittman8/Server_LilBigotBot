const Stat = require("../models/Stat");
//const twitt = require("./Twittercontrol");
const stats = require("./StatController");
const tweetc = require("./TweetController");

exports.returnFake = (res) => {
  //returns fake data, nothing calls this though
  let serverHello = new Stat();
  serverHello._id = '99999';
  serverHello.Connections = 1;
  res.json(serverHello);
};

//Returns the number of connections, slurs, and ranked list of users searched
exports.returnconn = (req, res) => {
  //Recieves a stat object
  let serverHello = new Stat(req.body);
  serverHello._id = '99999';
  serverHello.Connections = 1;
  serverHello.Slurs = 1;
  serverHello.Ranks = null;
  new Promise(function (resolve, reject) {
    //Fetch the entry in the stats collection document
    let statread = stats.readStatret();
    resolve(statread);
  }).then(function (value) {
    serverHello.Connections = value.Connections;
    serverHello.Slurs = value.Slurs;

    //Create an object to be compatible with the clientside code
    let testobj = {
      _id: serverHello._id,
      Connections: serverHello.Connections,
      Slurs: serverHello.Slurs,
      Ranks: null
    };
    //Fetches the list of handles called
    new Promise(function (resolve, reject) {
      let rankread = tweetc.listAllTweets();
      resolve(rankread);
    }).then(function (value) {
      testobj.Ranks = value;
      //Sorts the list of handles so it is ranked by number of calls
      testobj.Ranks = testobj.Ranks.sort(function (a, b) {
        return (a.count > b.count) ? -1 : 1;
      });
      res.json(testobj);
    })
  })
};

ReadRank = () => {
  new Promise(function (resolve, reject) {
    let rankread = tweetc.listAllTweets();
    resolve(rankread);

  }).then(function (value) {
    console.log("rankread");
    console.log(value);
    return value;
  })
};