const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hal = require("express-hal");

const storage = require('./storage');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(hal.middleware);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', (req, res, next) => {req.wss = app.get('wss'); next();}, require('./routes'));
// Catch all other routes and return the index file
app.get("*", (req, res) => {
  //app.get(/^((?!(api-docs|api-spec)).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
