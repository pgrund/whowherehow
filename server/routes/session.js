const router = require('express').Router();

const storage = require('../storage');


function updateSession(addS, reqS) {
  let update = Object.assign({}, reqS, addS);
  storage.allsessions[storage.allsessions.findIndex(el => el.sessionId === update.sessionId)] = update;
  return update;
}

/**
* HAL representation for session
*/
function halSession(sess) {
  // filter private fields
  let {activePlayerIndex, directorId, sessionId, teamMates, ...filtered } = sess;
  let url = `/sessions/${sess.sessionId}`;
  let hal = {
    data: filtered,
    links: {
        self: url,
        director: { href: `/users/${sess.directorId}` },
        players: { href: "/users"},
    }
  };
  if(sess.state == 'OPEN') {
    hal.links.closing = { href: `${url}/state`}
  } else {
    hal.links.turn = { href: `${url}/turn`}
  }
  return hal;
}

function directorOfSession (req, res, next) {
  console.log('director user needed');
  if(!req.session) {
    res.status(400).send('no session present');
    return;
  }
  if(!req.auth) {
    res.status(400).send('no user present');
    return;
  }
  if(req.session.directorId != req.auth.playerId) {
    res.status(403).send('diretor role for session needed');
    return;
  }
  next();
}

router.param('sid', function (req, res, next, id) {
  req.session = storage.allsessions.find(s => s.sessionId == id);
  if(!req.session) {
    res.status(404).send('no session found for id');
    return;
  }
  next();
});
router.param('tid', function (req, res, next, id) {
  let user = storage.allusers.find( u => u.playerId == id);
  req.user = user;
  if(!req.user) {
    res.status(404).send('no user found for id');
    return;
  }
  next();
});

// session management
// login 4.2.1  - +ASYNC
router.post('/', (req, res) => {
  // Ein Spieler meldet eine neue Session beim Server an. Der Spieler ist automatisch der Spielleiter dieser Session. Der Server teilt allen angemeldeten Clients mit, daß eine Session hinzugekom- men ist.
  // ci -> s          - SessionAddRequestInfo
  // s  -> ci U Cu    0 SesionAddededInfo
  // s  -> C/(ciUCu)  1 PlayerRemovedInfo
  var s = req.body;
  if(!s.sessionName) {
    res.status(400).send('missing name');
    return res;
  }
  if(storage.allsessions.find(sess => s.sessionName == sess.sessionName)){
    res.send('session name already exists');
    res.status(400).end();
    return res;
  }
  s.sessionId = Math.max(...(storage.allsessions.map(s => s.sessionId))) +1;
  s.directorId = req.auth.playerId;
  s.teamMates = [s.directorId];
  let newSession = Object.assign({}, storage.emptySession, s);
  storage.allsessions.push(newSession);
  res.hal(halSession(newSession));
  res.status(201).location(`./${newSession.sessionId}`).end();
})
// logout 4.2.2 - +ASYNC
router.delete('/:sid', directorOfSession, (req, res) => {
  // Der Spielleiter meldet eine Session ab. Der Server teilt dieses allen angemeldeten Spieler mit.
  // ci -> s            - SessionRemoveRequestInfo
  // s  -> Cs(ci)UCu    0 SesionRemovedInfo
  // s  -> C/(CsciUCu)  1 SessionRemovedInfo

  storage.allsessions = storage.allsessions.filter(s => s.sessionId != req.session.sessionId)
  res.send(`terminated session: ${req.session.sessionName}(${req.session.sessionId}) `);
})
// close 4.2.3 - +ASYNC
router.put('/:sid/state', directorOfSession, (req, res) => {
  //Der Spielleiter schließt eine Session, d.h. es werden keine weiteren Mitspieler aufgenom- men. Der Server teilt dieses allen angemeldeten Spieler mit. (Anmerkung: Im Anschluß startet der Spieler das Spiel innerhalb dieser Session, siehe Abschnitt 4.4.)
  // cd -> s            - SessionCloseRequestInfo
  // s  -> Cs(cd)UCu    0 SessionClosedInfo
  // s  -> C/Cs(cd)UCu  1 SessionClosedInfo
  if(req.session.state != 'OPEN') {
    res.status(400).send('invalid status');
    return res;
  }
  console.log('status changing to CLOSE');
  let updatedSession = updateSession({state : 'CLOSED'}, req.session);
  res.status(200).hal(halSession(updatedSession));
})

router.get('/:sid/users/', (req, res) => {
  let users = storage.allusers.filter(u => req.session.teamMates.indexOf(u.playerId)>-1);
  return res.json(users);
})
// join 4.2.4 - +ASYNC
router.post('/:sid/users/', (req, res) => {
  // Der Spieler möchte an einer bestimmten Session teilnehmen. Der Server leitet die An- frage des Spielers an den Spielleiter der Session weiter. Dieser teilt dem Server mit, ob er den Spieler akzeptiert oder nicht. Der Server gibt die Rückmeldung des Spielleiters an den anfragenden Spieler und die Spieler der Session weiter.
  // ci -> s            - SessionJoinRequestInfo
  // s  -> cd           0 SessionJoinRequestInfo
  // #forward to invite
  // cd -> s            - PlayerNotifyInfo
  // s  -> ci U Cs(cd)  0 PlayerNotifyInfo
  let updatedSession = updateSession({teamMates : [...req.session.teamMates, req.auth.playerId]}, req.session);
  res.hal(halSession(updatedSession));
})
// 4.2.5 invite user - +ASYNC
router.put('/:sid/users/:tid', directorOfSession, (req,res) => {
  // Der Spielleiter lädt einen anderen Spieler zu seiner Session ein.
  // cd  -> s          - PlayerNotifyInfo
  // s   -> ciUCs(cd)  0 PlayerNotifyInfo
  console.log(allusers);
  let updatedSession = updateSession({teamMates: [...req.session.teamMates, req.user.playerId]}, req.session);
  res.hal(halSession(updatedSession));
});

// 4.2.6 kickout user - +ASYNC
router.delete('/:sid/users/:tid', directorOfSession, (req, res) => {
  // Der Spielleiter schließt einen Spieler aus einer Session aus. Der Ausschluß kann zu einem beliebigen Zeitpunkt erfolgen.
  // cd  -> s          - PlayerNotifyInfo
  // s   -> ciUCs(cd)  0 PlayerNotifyInfo
  updatedSession = updateSession({teamMates: req.session.teamMates.filter( u => u != req.user.playerId)}, req.session);
  req.user.teamId = null;
  res.hal(halSession(updatedSession));
})


// session info 4.3.3
router.get('/:sid', (req, res) => {
  //Ein Spieler fordert eine Beschreibung einer Session an. Der Server liefert dem Spieler die Beschreibung.
  // ci  -> s   - SessionRequestInfo
  // s   -> ci  0 SessionInfo
  res.hal(halSession(req.session));
})
// sessions info 4.3.4
router.get('/', (req, res) => {
  //Ein Spieler fordert eine Beschreibung zu allen beim Server angemeldeten Sessions an. Der Server liefert dem Spieler die Beschreibungen.
  // ci  -> s   - SessionListRequestInfo
  // s   -> ci  0 SessionListInfo
  res.hal( {
    links: {
      self: '/sessions',
      find: { href: "/sessions/{?id}", templated: true }
    },
    embeds: {
      "sessions": storage.allsessions.map(halSession)
    }
  });
})
// game
// preparation
// spread cards 4.4.1 - ASYNC
router.get('/:sid/users/:tid/cards', (req, res) => {
  // Nachdem eine Session durch den Spielleiter geschlossen wurde, verteilt der Server die Spielkarten an die teilnehmenden Spieler, d.h. jeder Spieler erhält eine bestimmte Anzahl an Karten.
  // s  -> Cs 0 CardListInfo
  res.send('cards for single user: ' + req.params.uid + ' of session: ' + req.params.sid);
})
// turn
router.use('/:sid/turn', require('./turn'));

// chat
// broadcast message 4.6.2
router.post('/:sid/messages', (req, res) => {
  // Ein Spieler möchte eine Textnachricht an alle Spieler einer Session senden.
  //  ci  -> s      - SessionChatRequestInfo
  //  s   -> Cs(ci) 0 SessionChatInfo
  res.send('session broadcast message for session: ' + req.params.sid);
})
module.exports = router;
