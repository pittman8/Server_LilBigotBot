const Stat = require("../models/Stat");
const twitt = require("./Twittercontrol");
const stats = require("./StatController");
const tweetc = require("./TweetController");

exports.returnFake = (res) => {
  //returns fake data, nothing calls this though
  let serverHello = new Stat();
  serverHello._id = '99999';
  serverHello.Connections = 1;
  res.json(serverHello);
};

exports.returnconn = (req, res) => {
  //recieves a Hello and returns it
  let serverHello = new Stat(req.body);
  serverHello._id = '99999';
  serverHello.Connections = 1;
  serverHello.Slurs = 1;
  serverHello.Ranks = null;
  new Promise(function(resolve, reject) {

    let statread = stats.readStatret();
    
    resolve(statread);
    //console.log(statread);
    //console.log(serverHello.value);

}).then(function(value){
  //console.log(value.Connections);
    serverHello.Connections = value.Connections;
    serverHello.Slurs = value.Slurs;



  let testobj = {
    _id: serverHello._id,
    Connections: serverHello.Connections,
    Slurs: serverHello.Slurs,
    Ranks: null

  };


    new Promise(function(resolve, reject) {
    
      let rankread = tweetc.listAllTweets();
      resolve(rankread);
    }).then(function(value){

      //console.log(value);
      testobj.Ranks = value;
      //serverHello.Ranks = value;
      //console.log(serverHello.Ranks);
      //console.log(serverHello);
      testobj.Ranks = testobj.Ranks.sort(function (a, b) {
        return (a.count > b.count) ? -1 : 1;
      });
      //console.log(testobj.Ranks);
      res.json(testobj);
      //res.json(serverHello);
    })



  //res.json(serverHello);
})
  //res.json(serverHello);
};

ReadRank = () =>{
  new Promise(function(resolve, reject) {
    let rankread = tweetc.listAllTweets();
    resolve(rankread);
  
  }).then(function(value){
    console.log("rankread");
    console.log(value);
    return value;
  })
  
  
  };