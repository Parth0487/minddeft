var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
var app = express();
var http = require("http");
var cors = require('cors');
app.use(cors());

var usersRouter = require("./routes/routes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", usersRouter);

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, dbName: process.env.DATABASE_NAME },
  function (error) {
    if (error) console.error(error);
    else {
      console.log("\nMongo DB connected to", mongoose.connection.db.databaseName + "\n\n");
    }
  }
);

var server = http.createServer(app);

server.listen(process.env.PORT, function () {
  console.log("Server is running on Port: " + process.env.PORT);
});
