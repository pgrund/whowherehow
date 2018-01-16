const WebSocket = require('ws');
const cookieParser = require('cookie-parser');
const storage = require('./storage');

module.exports = function(server) {
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

   // ######################
   // ## WEBSOCKET services

   // send to single player
   wss.sendToPlayer = function(data, receiverId) {
     let clients = [...wss.clients].filter(c => c.player.playerId == receiverId);
     wss.sendToWsClients(data, clients);
     if(client) {
       client.send(JSON.stringify(data));
     } else {
       console.error('no client found for player %s', receiverId);
     }
   }

   // broadcast to all known players
   wss.sendToAllPlayers = function(data) {
     wss.sendToWsClients(data, [...wss.clients]);
   }
   // broadcast to players of session
   wss.sendToSessionOfPlayer = function(data, playerId) {
     let playersSession = storage.sessions.all
         .find(s => s.teamMates.includes(playerId));
     if(!playersSession) {
       console.error('player %s is not participating in any session', playerId);
       return
     }
     let clients = playersSession.teamMates
         .map(pId => [...wss.clients].find(c => c.player.playerId == pId));
     if(clients && clients.length > 0) {
       wss.sendToWsClients(data, clients);
     } else {
       console.error('no clients found for session of player %s', playerId);
     }
   }

   // Broadcast to  clients
   wss.sendToWsClients = function broadcast(data, clients, ws = null) {
     clients.forEach( (client) => {
       if ((!ws || client !== ws) && client.readyState === WebSocket.OPEN) {
         console.debug('sending to %s: %s', client.player.name, data);
         client.send(JSON.stringify(data));
       } else {
         console.warn('cannot send to %s ... ', client.player.name);
       }
     });
   }

   wss.on('connection', function connection(ws, req) {
     ws.player = req.user;
     ws.isAlive = true;
     console.debug('player %s connected', ws.player.name);

     // ws.on('open', function() {
     //    console.log('open for connection ...')
     //  });
     ws.on('ping', function(data) {
       console.debug('ping received from %s', ws.player.name);
       ws.pong(() => {console.log('sending pong to %s', ws.player.name)});
     });
     ws.on('pong', function(data) {
       console.debug('pong received from %s', ws.player.name);
       ws.isActive = true;
     });
     ws.on('message', function (data) {
       console.log('received from %s: %s', ws.player.name, data);
       let updatedMsg = {};
       try {
          updatedMsg = JSON.parse(data);
       } catch(err){
         console.error(err);
         updatedMsg = { type : 'ERROR', data: err, original: data };
       }
       if(updatedMsg.type == 'CHAT') {
         // setting player name and date
         updatedMsg.data.sender = ws.player.name;
         updatedMsg.data.time = new Date();

         if(updatedMsg.data.receiverId) {
           let client = [...wss.clients].find(c => c.player.playerId == updatedMsg.data.receiverId);
           if(client) {
             wss.sendToWsClients(updatedMsg, [client]);
           } else {
             console.warn('no active ws client found for %s', updatedMsg.data.receiverId);
           }
         } else {
           wss.sendToSessionOfPlayer(updatedMsg, ws.player.playerId);
         }

       } else {
         console.warn('unknown type', updatedMsg, data);
       }
     });
     ws.on('close', function (code, reason) {
       console.warn('closing connection for %s due to %s (%s)', ws.player.name, reason, code);
     });
     ws.on('error', function (err) {
       console.error('error for ' + ws.player.name, err);
     });
   });

   // ping isAlive for all clients
   const interval = setInterval(function ping() {
     wss.clients.forEach(function each(ws) {
       console.debug('ping client %s', ws.player.name);
       if (ws.isAlive === false) {
         console.warn('inactive player %s, gonna terminate ...', ws.player.name);
         return ws.terminate();
       }

       ws.isAlive = false;
       ws.ping();
     });
   }, 45000);

   // ######################
   // #### END Websocket services

   return wss;
}
