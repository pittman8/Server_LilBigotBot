const Hello = require("../models/Hello");
const twitt = require("./Twittercontrol");
const stats = require("./StatController");
const tweetc = require("./TweetController");
const slurBank = ['fag', 'faggot', 'dyke', 'homo', 'sodomite'];
getQueryString = () => {
  //const slurBank = ['fag', 'faggot', 'dyke', 'homo', 'sodomite'];
  let queryString = '';
  for (i=0;i<slurBank.length; i++) {
    queryString += ' ' + slurBank[i]
    if (i<slurBank.length-1) {
      queryString += ' OR'
    }

  }
  return queryString;
}

exports.returnFake = (res) => {
  //returns fake data, nothing calls this though
  let serverHello = new Hello();
  serverHello._id = '99999';
  serverHello.value = 'success';
  res.json(serverHello);
};

exports.returnHello = (req, res) => {
  //recieves a Hello and returns it
  let serverHello = new Hello(req.body);

  let u = req.body.value;
  let s = getQueryString();
  new Promise(function(resolve, reject) {
    let testo = twitt.twitconn(u, s)
    //console.log(testo);
    //console.log(serverHello.value);
    resolve(testo);


}).then(function(value){
  serverHello.value = value
  
  
  var stringify = JSON.parse(value);
  console.log(stringify);
  //console.log(stringify.statuses[0].id);
  //console.log(stringify.statuses.length);
  var slurcount = 0;
  if(stringify.statuses.length > 0){
    console.log("none");
    for(var i = 0; i < stringify.statuses.length; i++) {
      //console.log(stringify.statuses[i].id);
      slurcount++;
    }
    
    
    serverHello.value.Slurs = slurcount;
    console.log(stringify.statuses[0].user.screen_name);
    updateRanking(stringify.statuses[0].user.screen_name);
  }else{
    updateRanking(u);
  }
  
  
  serverHello.value.Slurs = slurcount;
  updateStats(slurcount);
  res.json(serverHello);
})
  //res.json(serverHello);
};

updateStats = (slurs) =>{
new Promise(function(resolve, reject) {
  let statread = stats.readStatret();
  resolve(statread);

}).then(function(value){
  
  let holdval = value;
  holdval.Connections = holdval.Connections + 1;
  holdval.Slurs = holdval.Slurs + slurs;
  //console.log(holdval);
  return holdval;
}).then(function(value){
  
  //console.log("why");
  //console.log(value);
  return stats.updateStatret(value);
}).then(function(value){
  console.log(value)
;})


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



updateRanking = (handle) =>{
  new Promise(function(resolve, reject) {
    let twhold = {
      _id: handle,
      count: 1
    };
    //console.log(twhold);
    
    let tread = tweetc.readTweet(handle);
    resolve(tread);
  
  }).then(function(value){
    
    let twhold = {
      _id: handle,
      count: 1
    };
    let twup = 'null';
    if(value == null){
      //console.log("beep");
      twup = tweetc.createNewTweet(twhold);
      //console.log(twhold);    
    }else {
      twhold = value;
      twhold.count = twhold.count + 1;
      twup = tweetc.updateTweet(twhold);
    };   
   
    let holdval = value;
    //console.log("bop");
    //console.log(value);
    return holdval;
  })
  };

  exports.returnSlurs = (req, res) => {
    //let slurBank = ['fag', 'faggot', 'dyke', 'homo', 'sodomite', 'great'];
    /*new Promise(function(resolve, reject) { 
      //console.log(slurBank.toString());
      resolve(slurBank);
  }).then(function(value){
    let returnhold = {
      slurs: value
    };
    res.json(returnhold);
  })*/

  let returnhold = {
    slurs: slurBank
  };
  
  res.json(returnhold);
  };