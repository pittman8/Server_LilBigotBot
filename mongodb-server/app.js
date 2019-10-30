const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const taskController = require("./controllers/TaskController");
const helloController = require("./controllers/HelloController");
const cors = require('cors')  // using this module to solve CORS problem
// note the extra line in package.json to download this code

var corsOptions = {
  origin: 'http://localhost:4200',   // this URL must match the URL that the Angular app will call from
//origin: 'kurtangularappfall2019.azurewebsites.net',   // this URL must match the URL that the Angular app will call from
optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}


// db instance connection
//require("./config/db");
require("./callTwitter");

const port = process.env.PORT || 80;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(corsOptions))   // bringing in the CORS code to our app

// API ENDPOINTS

app
  .route("/hello")
  .get(helloController.returnFake)
  .post(helloController.returnHello);
/*
app
  .route("/tasks")
  .get(taskController.listAllTasks)
  .post(taskController.createNewTask);

app
  .route("/tasks/:taskid")
  .get(taskController.readTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);
*/
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
