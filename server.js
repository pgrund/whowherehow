// Get dependencies
const express = require('express');
//const expressOasGenerator = require('express-oas-generator');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hal = require("express-hal");
const WebSocket = require('ws');


const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(hal.middleware);

const server = http.createServer(app);

const wss = new WebSocket.Server({
   server: server,
   path: '/api',
   clientTracking: true,
   verifyClient: (info, done) => {
    // console.log('verify', info.req.headers)
    cookieParser()( // req, res, next
      info.req, {}, () => {
          done(info.req.cookies.privateId);
        });
  }
 });


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws, req) {
  ws.on('open', function() {
     console.log('open for connection ...')
   })
  ws.on('message', function (data) {
    console.log('received from %s: %s', req.cookies.privateId, data);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  ws.on('close', function () {
    console.log('closing connection');
  });
  ws.on('error', function (err) {
    console.log('error', err);
  });

  setTimeout(() => {ws.send(JSON.stringify(wss.clients));}, 5000);
});

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
