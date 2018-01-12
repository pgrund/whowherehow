// Get dependencies
const express = require('express');
//const expressOasGenerator = require('express-oas-generator');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hal = require("express-hal");
const WebSocket = require('ws');

const storage = require('./server/storage');


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
    cookieParser()( // req, res, next
      info.req, {}, () => {
        // cookie required for auth
          if(info.req.cookies.privateId) {
            // check user exists ...
            let user = storage.users.all.find(u => u.privateId == info.req.cookies.privateId);
          if(user) {
              info.req.user = user;
              done(true);
            } else {
              done(false, 403, 'invalid user, not authorized')
            }
          } else {
            done(false, 401, 'user not authenticated')
          }
        });
  }
 });


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Broadcast to all.
wss.broadcast = function broadcast(data, clients) {
  console.log('broadcasting  ...', data);
  clients.forEach( (client) => {
    if ((!ws || client !== ws) && client.readyState === WebSocket.OPEN) {
      console.log('sending to %s: %s', client.privateId, data);
      client.send(data);
    } else {
      console.warn(client.player.name + ' cannot be send to ... ');
    }
  });
};

function heartbeat () {
  this.isAlive = true;
  console.log('pong from %s', this.privateId);
}

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    console.log('ping client %s', ws.privateId);
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(() => {});
  });
}, 30000);

wss.on('connection', function connection(ws, req) {
  ws.player = req.user;
  ws.isAlive = true;
  console.log('player %s connected', ws.player.name);

  // let intID = setInterval(function () {
  //   console.log('send ping to %s', playerId);
  //   ws.ping(JSON.stringify({clients:wss.clients, time: new Date()}));
  // }, 5000);

  ws.on('open', function() {
     console.log('open for connection ...')
   })
  ws.on('message', function (data) {
    console.log('received from %s: %s', ws.player.name, data);
    let updatedMsg = {};
    try {
       updatedMsg = JSON.parse(data);
    } catch(err){
      console.error(err);
      updatedMsg = { type : 'ERROR', data: err };
    }
    if(updatedMsg.type == 'CHAT') {
      // setting player name and date
      updatedMsg.data.sender = ws.player.name;
      updatedMsg.data.time = new Date();

      if(updatedMsg.receiverId) {
        console.log('point to point communication');
        let client = wss.clients.find(c => c.player.playerId == updatedMsg.receiverId);
        if(client) {
          client.send(JSON.stringify(updatedMsg));
        } else {
          console.error('no client found for ', updatedMsg.receiverId);
        }
      } else {
        // all players of session
        let clients = storage.sessions.all.find(s => s.teamMates.includes(ws.player.playerId))
            .teamMates
            .map(pId => wss.clients.find(c => c.player.playerId == pId));
        wss.broadcast(JSON.stringify(updatedMsg), clients);
      }

    } else {
      console.warn('unknown type', updatedMsg, data);
    }




    // if(data.indexOf('stop')>-1){
    //   console.log('stop for %s', playerId);
    //   clearInterval(intID);
    // }
    // if(data.indexOf('start')>-1) {
    //   console.log('start for %s', playerId);
    //   intID = setInterval(function () {
    //     console.log('send ping to %s', playerId);
    //     ws.send(JSON.stringify({clients:wss.clients, time: new Date()}));
    //   }, 5000);
    // }
  });
  ws.on('close', function () {
    console.log('closing connection for %s', ws.player.name);
  });
  ws.on('error', function (err) {
    console.log('error for ' + ws.player.name, err);
  });


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
