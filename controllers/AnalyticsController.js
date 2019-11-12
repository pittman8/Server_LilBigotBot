const Stat = require("../models/Stat");
const twitt = require("./Twittercontrol");
const stats = require("./StatController");

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
  new Promise(function(resolve, reject) {

    let statread = stats.readStatret();
    
    resolve(statread);
    //console.log(statread);
    //console.log(serverHello.value);

}).then(function(value){
  //console.log(value.Connections);
    serverHello.Connections = value.Connections
  res.json(serverHello);
})
  //res.json(serverHello);
};
