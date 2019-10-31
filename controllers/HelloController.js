const Hello = require("../models/Hello");

exports.returnFake = (res) => {
  //returns fake data, nothing calls this though
  console.log("helllllllllllllllllo");
  let serverHello = new Hello();
  serverHello._id = '99999';
  serverHello.value = 'success';
  res.json(serverHello);
};

exports.returnHello = (req, res) => {
  //recieves a Hello and returns it
  let serverHello = new Hello(req.body);
  serverHello._id = '99999';
  res.json(serverHello);
};
