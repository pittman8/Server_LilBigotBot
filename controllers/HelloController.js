const Hello = require("../models/Hello");
const twitt = require("./Twittercontrol");

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
  serverHello._id = '99999';
  new Promise(function(resolve, reject) {

    let testo = twitt.twitconn(serverHello.value)
    //console.log(testo);
    //console.log(serverHello.value);
    //console.log(testo);
    resolve(testo);


}).then(function(value){
  serverHello.value = value
  res.json(serverHello);
})
  

  //res.json(serverHello);
};