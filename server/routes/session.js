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
    res.status(403).send('director role for session needed');
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
      turn: { href: "/sessions/{?id}/turn", templated: true },
      players: { href: "/sessions/{?id}/players", templated: true }
    },
    embeds: {
      "sessions": storage.sessions.all.map(storage.sessions.hal)
    }
  });
})
// session management
// login 4.2.1  - +ASYNC
router.post('/', (req, res) => {
  // Ein Spieler meldet eine neue Session beim Server an.
  // Der Spieler ist automatisch der Spielleiter dieser Session.
  // Der Server teilt allen angemeldeten Clients mit, daß eine Session hinzugekom- men ist.
  // ci -> s          - SessionAddRequestInfo
  // s  -> ci U Cu    0 SesionAddededInfo
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
  req.wss.sendToAllPlayers({
    type: "NOTIFY",
    data: {
      action: '[Notification] Session Added',
      payload: updatedSession.links.self
    }});
})

// session info 4.3.3
router.get('/:sid', (req, res) => {
  //Ein Spieler fordert eine Beschreibung einer Session an. Der Server liefert dem Spieler die Beschreibung.
  // ci  -> s   - SessionRequestInfo
  // s   -> ci  0 SessionInfo
  res.hal(storage.sessions.hal(req.session));
})
// logout 4.2.2 - +ASYNC
router.delete('/:sid', directorOfSession, (req, res) => {
  // Der Spielleiter meldet eine Session ab. Der Server teilt dieses allen angemeldeten Spieler mit.
  // ci -> s            - SessionRemoveRequestInfo
  // s  -> Cs(ci)UCu    0 SesionRemovedInfo
  // s  -> C/(CsciUCu)  1 SessionRemovedInfo
  let delSess = storage.sessions.hal(req.session);
  req.wss.sendToSessionOfPlayer({
    type: 'NOTIFY',
    data: {
      action: '[Notification] Session Dropped Out',
      payload: delSess.links.self
    }},req.user.name);
  storage.sessions.all = storage.sessions.all.filter(s => s.sessionId != req.session.sessionId);
  res.send(`terminated session: ${req.session.sessionName}(${req.session.sessionId}) `);
})

// close 4.2.3 - +ASYNC
router.put('/:sid/state', directorOfSession, (req, res) => {
  //Der Spielleiter schließt eine Session, d.h. es werden keine weiteren Mitspieler aufgenommen.
  //Der Server teilt dieses allen angemeldeten Spieler mit.
  //(Anmerkung: Im Anschluß startet der Spieler das Spiel innerhalb dieser Session, siehe Abschnitt 4.4.)
  // cd -> s            - SessionCloseRequestInfo
  // s  -> Cs(cd)UCu    0 SessionClosedInfo
  // s  -> C/Cs(cd)UCu  1 SessionClosedInfo
  if(req.session.state != 'OPEN') {
    // res.status(400).send('invalid status');
    // return res;
    console.warn('invalid state')
  }
  if(req.session.teamMates.length < 3) {
    res.status(400).send('not enough players, min 3');
    return res;
  }
  if(req.session.teamMates.length > 6) {
    res.status(400).send('too many players, max 6');
    return res;
  }
  // update session state and get solution for this session
  let updatedSession = storage.sessions.update({
    state: 'CLOSED',
    solution: storage.cards.getSolution()
  }, req.session);
  // distribute remaining cards to players
  let cardArray = storage.cards.splitAll(updatedSession.solution, updatedSession.teamMates.length);
  storage.users.all.filter(p => req.session.teamMates.indexOf(p.playerId)>-1)
    .forEach( (user, idx) => {
      console.log(user.playerId, idx);
      let joined = {
        ...storage.users.joined,
        teamId: storage.cards.persons[idx],
        position: storage.cards.persons[idx].position,
        cards: cardArray[idx]
      }
      let updatedUser = storage.users.update(joined, user);
      console.log(joined, updatedUser);
    })
  // prepare response
  let halSession = storage.sessions.hal(updatedSession);
  res.status(200).hal(halSession);
  req.wss.sendToAllPlayers({
    type:'NOTIFY',
    data:{
      action:'[Notification] Session Closed',
      playload: halSession.links.self
    }});
})

router.get('/:sid/players/', (req, res) => {
  let users = storage.users.all
      .filter( u => req.session.teamMates.indexOf(u.playerId)>-1 )
      .filter( p => !(p.state == 'INVITED' || p.state == 'PENDING') );
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
  if(req.session.teamMates.indexOf(req.auth.playerId) > -1) {
    console.log('player %s already part of %s', req.auth.name, req.session.sessionName);
    return res.status(204).end();
  }
  let updatedSession = storage.sessions.update({teamMates : [...new Set(req.session.teamMates.concat(req.auth.playerId))]}, req.session);
  let updatedUser = storage.users.update({state: 'PENDING'}, req.auth);
  let halUser = storage.users.hal(updatedUser);
  res.hal(halUser);
  req.wss.sendToPlayer({
    type:"NOTIFY",
    data:{
      action:'[Notification] Player Join Session Request',
      player: halUser.links.self
    }}, updatedSession.directorId);
})
// 4.2.5 invite user , approve by director (join) or player (invite) - +ASYNC
router.put('/:sid/players/:tid', (req, res) => {
  console.log('-->>> auth: %s, user: %s, session %s', req.auth.name, req.user.name, req.session.sessionName);
  switch(req.user.state) {
    case 'PENDING':
      // director approve ...
      if(req.session.teamMates.indexOf(req.user.playerId)<0) {
        console.error('player %s is not in %s', req.user.name, req.session.sessionName);
        return res.status(404).send('player not participating in game');
      }
      return directorOfSession(req, res, function() {
        console.log(req.auth.name, req.user.name);
        let halUser = storage.users.hal(storage.users.update({state: 'JOINED'}, req.user));
        req.wss.sendToSessionOfPlayer({
          type: 'NOTIFY',
          data: {
            action: '[Notification] Player Joined',
            payload: halUser.links.self
          }}, halUser.name);
        return res.hal(halUser);
      });
    case 'NONE':
      // invite ...
      return directorOfSession(req, res, function() {
        let updatedSession = storage.sessions.update({teamMates : [...new Set(req.session.teamMates.concat(req.user.playerId))]}, req.session);
        let halUser = storage.users.hal(storage.users.update({state: 'INVITED'}, req.user));
        req.wss.sendToSessionOfPlayer({
          type: 'NOTIFY',
          data: {
            action: '[Notification] Player Invited',
            payload: halUser.links.self
          }}, halUser.name);
        return res.hal(halUser);
      });
    case 'INVITED':
      // accept invitation ... player approves
      if(req.session.teamMates.indexOf(req.user.playerId)<0) {
        console.error('player %s is not in %s', req.user.name, req.session.sessionName);
        return res.status(404).send('player not participating in game');
      }
      if(req.auth.name != req.user.name) {
        // player can only accept invitation himself ...
        console.error('mismatch player invitation approval %s vs %s', req.user.name, req.auth.name);
        return res.status(403).send('only accept invitation for yourself');
      }
      let halUser = storage.users.hal(storage.users.update({state: 'JOINED'}, req.user));
      req.wss.sendToSessionOfPlayer({
        type: 'NOTIFY',
        data: {
          action: '[Notification] Player Joined',
          payload: halUser.links.self
        }}, halUser.name);
      return res.hal(halUser);
    default:
      if(req.session.teamMates.indexOf(req.user.playerId)<0) {
        console.error('player %s is not in %s', req.user.name, req.session.sessionName);
        return res.status(404).send('player not participating in game');
      }
      console.warn('nothing to do for %s in state %s', req.user.name, req.user.state);
      return res.status(204).end();
  }
});

// 4.2.6 kickout user - +ASYNC
router.delete('/:sid/players/:tid', (req, res) => {
  // Der Spielleiter schließt einen Spieler aus einer Session aus. Der Ausschluß kann zu einem beliebigen Zeitpunkt erfolgen.
  // cd  -> s          - PlayerNotifyInfo
  // s   -> ciUCs(cd)  0 PlayerNotifyInfo
  if (!(req.auth.name == req.user.name && (req.user.state == 'PENDING' || req.user.state == 'INVITED')) ||
      req.session.directorId != req.auth.playerId ) {
    // only admin and user himself allowed
    return res.status(403).send('only admin or user himself(at approval state) needed')
  }
  updatedSession = storage.sessions.update({teamMates: req.session.teamMates.filter( u => u != req.user.playerId)}, req.session);
  let updatedUser = Object.assign({}, req.user, { state: 'NONE'});
  Object.keys(storage.users.joined).forEach( key => {
    delete updatedUser['key'];
  });
  let halUser = storage.users.hal(storage.users.update(updatedUser, {}));
  req.wss.sendToSessionOfPlayer({
    type:"NOTIFY",
    data:{
      action:'[Notification] Player Dropped Out Of Session',
      player: halUser.links.self
    }}, updatedUser.playerId);
  return res.hal(storage.sessions.hal(updatedSession));
});


// game
// preparation
// spread cards 4.4.1 - ASYNC - NUR asnyc ?
router.get('/:sid/players/:tid/cards', (req, res) => {
  // Nachdem eine Session durch den Spielleiter geschlossen wurde,
  // verteilt der Server die Spielkarten an die teilnehmenden Spieler,
  // d.h. jeder Spieler erhält eine bestimmte Anzahl an Karten.
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

module.exports = router
