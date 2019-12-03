const Hello = require("../models/Hello");
const twitt = require("./Twittercontrol");
const stats = require("./StatController");
const tweetc = require("./TweetController");
//Array stores words to be searched
const slurBank = ['fag', 'faggot', 'dyke', 'homo', 'sodomite'];
//Builds string to send to twitter as search query
getQueryString = () => {
  let queryString = '';
  for (i = 0; i < slurBank.length; i++) {
    queryString += ' ' + slurBank[i]
    if (i < slurBank.length - 1) {
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
  new Promise(function (resolve, reject) {
    let testo = twitt.twitconn(u, s)
    resolve(testo);


  }).then(function (value) {
    serverHello.value = value

    var stringify = JSON.parse(value);
    console.log(stringify);
    var slurcount = 0;
    if (stringify.statuses.length > 0) {
      console.log("none");
      for (var i = 0; i < stringify.statuses.length; i++) {
        slurcount++;
      }

      serverHello.value.Slurs = slurcount;
      console.log(stringify.statuses[0].user.screen_name);
      updateRanking(stringify.statuses[0].user.screen_name);
    } else {
      updateRanking(u);
    }

    serverHello.value.Slurs = slurcount;
    updateStats(slurcount);
    res.json(serverHello);
  })
};

//Increments the number of times the service has been called, and tweets found and stores to mongo
updateStats = (slurs) => {
  new Promise(function (resolve, reject) {
    let statread = stats.readStatret();
    resolve(statread);

  }).then(function (value) {

    let holdval = value;
    holdval.Connections = holdval.Connections + 1;
    holdval.Slurs = holdval.Slurs + slurs;
    return holdval;
  }).then(function (value) {
    return stats.updateStatret(value);
  }).then(function (value) {
    console.log(value);
  })
};

//Creates or updates the input handle's entry in mongo
updateRanking = (handle) => {
  new Promise(function (resolve, reject) {
    let twhold = {
      _id: handle,
      count: 1
    };
    //Pull information for the handle from the mongo tweets collection
    let tread = tweetc.readTweet(handle);
    resolve(tread);

  }).then(function (value) {

    let twhold = {
      _id: handle,
      count: 1
    };
    let twup = 'null';
    //If there is no entry for the handle, create one
    if (value == null) {
      twup = tweetc.createNewTweet(twhold);
      //If there is, increase the count value by one and update.
    } else {
      twhold = value;
      twhold.count = twhold.count + 1;
      twup = tweetc.updateTweet(twhold);
    };

    let holdval = value;
    return holdval;
  })
};

//Returns list of slurs
exports.returnSlurs = (req, res) => {
  let returnhold = {
    slurs: slurBank
  };

  res.json(returnhold);
};