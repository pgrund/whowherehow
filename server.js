// Get dependencies
const express = require('express');
//const expressOasGenerator = require('express-oas-generator');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hal = require("express-hal");


const app = express();
//expressOasGenerator.init(app, {});

const server = http.createServer(app);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(hal.middleware);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set our api routes
app.use('/api', require('./server/routes'));


// Catch all other routes and return the index file
app.get("*", (req, res) => {
  //app.get(/^((?!(api-docs|api-spec)).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
