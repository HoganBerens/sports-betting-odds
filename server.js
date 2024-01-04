const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");
var cron = require("./src/utils/node-cron");
var cors = require("cors");

require("dotenv").config();

//Connect to the database
require("./config/database");

const app = express();
app.use(logger("dev"));
app.use(express.json());

cron.oddsCronJob();
cron.resultsCronJob();

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use("/users", require("./routes/users"));
app.use("/odds", require("./routes/odds"));
app.use("/results", require("./routes/results"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
