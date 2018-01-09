const router = require('express').Router();

const storage = require('../storage');

function directorOfSession (req, res, next) {
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
  req.session = storage.sessions.all.find(s => s.sessionId == id);
  if(!req.session) {
    res.status(404).send('no session found for id');
    return;
  }
  next();
});
router.param('tid', function (req, res, next, id) {
  let user = storage.users.all.find( u => u.playerId == id);
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
  if(storage.sessions.all.find(sess => s.sessionName == sess.sessionName)){
    res.send('session name already exists');
    res.status(400).end();
    return res;
  }
  s.sessionId = Math.max(...(storage.sessions.all.map(s => s.sessionId))) +1;
  s.directorId = req.auth.playerId;
  s.teamMates = [s.directorId];

  let newSession = Object.assign({}, storage.sessions.empty, s);
  storage.sessions.all.push(newSession);
  let updatedSession = storage.sessions.hal(newSession);

  res.status(201).location(updatedSession.links.self.href)
    .hal(updatedSession);
})
// logout 4.2.2 - +ASYNC
router.delete('/:sid', directorOfSession, (req, res) => {
  // Der Spielleiter meldet eine Session ab. Der Server teilt dieses allen angemeldeten Spieler mit.
  // ci -> s            - SessionRemoveRequestInfo
  // s  -> Cs(ci)UCu    0 SesionRemovedInfo
  // s  -> C/(CsciUCu)  1 SessionRemovedInfo

  storage.sessions.all = storage.sessions.all.filter(s => s.sessionId != req.session.sessionId)
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
  let updatedSession = storage.sessions.update({state : 'CLOSED'}, req.session);
  res.status(200).hal(storage.sessions.hal(updatedSession));
})

router.get('/:sid/players/', (req, res) => {
  let users = storage.users.all.filter(u => req.session.teamMates.indexOf(u.playerId)>-1);
  return res.json(users);
})
// join 4.2.4 - +ASYNC
router.post('/:sid/players/', (req, res) => {
  // Der Spieler möchte an einer bestimmten Session teilnehmen. Der Server leitet die An- frage des Spielers an den Spielleiter der Session weiter. Dieser teilt dem Server mit, ob er den Spieler akzeptiert oder nicht. Der Server gibt die Rückmeldung des Spielleiters an den anfragenden Spieler und die Spieler der Session weiter.
  // ci -> s            - SessionJoinRequestInfo
  // s  -> cd           0 SessionJoinRequestInfo
  // #forward to invite
  // cd -> s            - PlayerNotifyInfo
  // s  -> ci U Cs(cd)  0 PlayerNotifyInfo
  let updatedSession = storage.sessions.update({teamMates : [...new Set(req.session.teamMates.concat(req.auth.playerId))]}, req.session);
  let updatedUser = storage.users.update(storage.users.joined, req.auth);
  //console.log(updatedUser);
  res.hal(storage.sessions.hal(updatedSession));
})
// 4.2.5 invite user - +ASYNC
router.put('/:sid/players/:tid', directorOfSession, (req,res) => {
  // Der Spielleiter lädt einen anderen Spieler zu seiner Session ein.
  // cd  -> s          - PlayerNotifyInfo
  // s   -> ciUCs(cd)  0 PlayerNotifyInfo
  let updatedSession = storage.sessions.update({teamMates: [...req.session.teamMates, req.user.playerId]}, req.session);
  res.hal(storage.sessions.hal(updatedSession));
});

// 4.2.6 kickout user - +ASYNC
router.delete('/:sid/players/:tid', directorOfSession, (req, res) => {
  // Der Spielleiter schließt einen Spieler aus einer Session aus. Der Ausschluß kann zu einem beliebigen Zeitpunkt erfolgen.
  // cd  -> s          - PlayerNotifyInfo
  // s   -> ciUCs(cd)  0 PlayerNotifyInfo
  updatedSession = storage.sessions.update({teamMates: req.session.teamMates.filter( u => u != req.user.playerId)}, req.session);
  let updatedUser = Object.assign({}, req.user);
  Object.keys(storage.users.joined).forEach( key => {
    console.log(key, delete updatedUser['key']);
  });
  storage.users.update(updatedUser, {});

  res.hal(storage.sessions.hal(updatedSession));
})


// session info 4.3.3
router.get('/:sid', (req, res) => {
  //Ein Spieler fordert eine Beschreibung einer Session an. Der Server liefert dem Spieler die Beschreibung.
  // ci  -> s   - SessionRequestInfo
  // s   -> ci  0 SessionInfo
  res.hal(storage.sessions.hal(req.session));
})
// sessions info 4.3.4
router.get('/', (req, res) => {
  //Ein Spieler fordert eine Beschreibung zu allen beim Server angemeldeten Sessions an. Der Server liefert dem Spieler die Beschreibungen.
  // ci  -> s   - SessionListRequestInfo
  // s   -> ci  0 SessionListInfo
  res.hal( {
    links: {
      self: '/sessions',
      find: { href: "/sessions/{?id}", templated: true },
      start: { href: "/sessions/{?id}/state", templated: true },
      turn: { href: "/sessions/{?id}/turn", templated: true }
    },
    embeds: {
      "sessions": storage.sessions.all.map(storage.sessions.hal)
    }
  });
})
// game
// preparation
// spread cards 4.4.1 - ASYNC
router.get('/:sid/players/:tid/cards', (req, res) => {
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
