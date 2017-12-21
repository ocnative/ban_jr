// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
  console.log('loading dev environments')
  require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// loads our connection to the mongo database
const dbConnection = require('./db')
// var PORT = 3000;

const app = express()
const PORT = process.env.PORT || 8080


// Requiring the clan_member.js that resides in ./models.
const Member = require("./models");

// Configure middleware
app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/cocdata", {
  useMongoClient: true
});

// Routes

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {
  // Create a new member using req.body

  var member = new member(req.body);
  member.setFullName();
  member.lastUpdatedDate();

  member.create(member)
    .then(function(dbmember) {
      // If saved successfully, send the the new member document to the client
      res.json(dbmember);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
