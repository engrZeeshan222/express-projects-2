require("dotenv").config();
require("express-async-errors");
const cors = require('cors');
const express = require("express");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const { connect} = require("./util/db"); //Initialize and calling the DB config..

/**
 * Initialize app
 */
const app = express();
/**
 * Initialize db connection
 */
connect();


app.use(cors({
  origin: true,
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/**
 * Routes
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routers/router"));
app.use(errorHandlerMiddleware); //error handler for any errors that will happen on the server code

// Start the server
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
