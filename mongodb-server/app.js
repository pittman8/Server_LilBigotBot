const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const taskController = require("./controllers/TaskController");
const cors = require('cors')  // using this module to solve CORS problem

var corsOptions = {
  origin: 'https://isit422websitefall2019.azurewebsites.net/',   // this URL must match the URL that the Angular app will call from
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

// db instance connection
require("./config/db");

const port = process.env.PORT || 80;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors(corsOptions))

// API ENDPOINTS

app
  .route("/tasks")
  .get(taskController.listAllTasks)
  .post(taskController.createNewTask);

app
  .route("/tasks/:taskid")
  .get(taskController.readTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});