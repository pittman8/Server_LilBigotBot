const Stat = require("../models/Stat");


// go to mongo and select network and allow any url to come in
// go to azure and turn on app logging so can see console.log messages
exports.listAllStats = (req, res) => {
    console.log(">>>>>>>>>>>>>> IN listAllStats <<<<<<<<<");
    Stat.find({}, (err, stat) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).json(stat);
      console.log(stat);
    });
  };

exports.createNewStat = (req, res) => {
  let newStat = new Stat(req.body);
  console.log(newStat);
  newStat.save((err, stat) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(stat);
  });
};

exports.readStat = (req, res) => {
  Stat.findById(1, (err, stat) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(stat);
  });
};

exports.readStatret = (req, res) => {
  return new Promise(function(resolve,reject){
  Stat.findById(1, (err, stat) => {
    if (err) {
      return err;
    }
    console.log(stat);
    resolve(stat);
  });
})
};

//Update stat document and returns a promise
exports.updateStatret = (req, res) => {
  //console.log('stat id at server is 1');
  return new Promise(function(resolve,reject){
  Stat.findOneAndUpdate(
    { _id: 1 },  // don't know who changed the name from _id
    req,
    { new: true },  // true or false to let it add if not present?
    (err, stat) => {
      if (err) {
        reject(err);
      }
      //console.log(stat);
      resolve(stat);
    }
  );
  })
};


//Update stat document for calling directly
exports.updateStat = (req, res) => {
  //console.log('stat id at server is 1');
  Stat.findOneAndUpdate(
    { _id: 1 },  // don't know who changed the name from _id
    req.body,
    { new: true },  // true or false to let it add if not present?
    (err, stat) => {
      if (err) {
        res.status(500).send(err);
      }
      console.log(stat);
      res.status(200).json(stat);
    }
  );
};



exports.deleteStat = (req, res) => {
  Stat.remove({ _id: req.params.statid }, (err, stat) => {  // don't know who changed the name from _id
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Stat successfully deleted" });
  });
};