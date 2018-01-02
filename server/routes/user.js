const router = require('express').Router();
const storage = require('../storage');

/**
* filter private fields from user
*/
function filterPrivateFields(user) {
  // filter private fields
  let {privateId, password, ...u } = user;
  console.log('filtered', u);
  return u;
}
/**
* HAL representation for session
*/
function halUser(user) {
  // filter private fields
  let {privateId, password, ...filtered } = user;
  let url = `/users/${user.playerId}`;
  let hal = {
    data: filtered,
    links: {
        self: url
    }
  };
  if(sess.state == 'OPEN') {
    hal.links.closing = { href: `${url}/state`}
  } else {
    hal.links.turn = { href: `${url}/turn`}
  }
  return hal;
}

router.param('uid', function (req, res, next, id) {
  let user = storage.allusers.find( u => u.playerId == id);
  req.user = user;
  if(!req.user) {
    res.status(404).send('no user found for id');
    return;
  }
  next();
});

// user managemnet
// users info 4.3.2
router.get('/', (req, res) => {
  // Ein Spieler fordert Beschreibungen zu allen am Server angemeldeten Spielern an. Der Server liefert dem Spieler die Beschreibungen.
  // ci -> s  - PlayerListRequestInfo
  // s  -> ci 0 PlayerListInfo
  res.json(storage.allusers.map(filterPrivateFields));
})

// user info 4.3.1
router.get('/:uid', (req, res) => {
  // Ein Spieler fordert eine Beschreibung eines anderen Spielers an. Der Server liefert dem Spieler die Beschreibung.
  // ci -> s  - PlayerRequestInfo
  // s  -> ci 0 PlayerInfo
  if(req.user == req.auth) {
      res.json(req.user);
  } else {
    res.json(filterPrivateFields(req.user));
  }
})
//re-login 4.1.2
router.put('/:uid', (req, res) => {
  // private id needed
  // Die Verbindung eines Spielers zum Server ist mitten im Spiel abgebrochen. Der Spieler stellt die Verbindung unter Angabe der bereits zugewiesenen IDs (öffentliche und private ID) wieder her.
  // ci -> s        - PlayerReAddRequestInfo
  // s  -> ci       0 PlayerAdConfirmInfo
  // s  -> Cs(ci)   0 PlayerAddedInfo
  // s  -> C/Cs(ci) 1 PlayerAddedInfo
  if(!req.body.privateId || req.body.privateId != req.user.privateId) {
    console.warn(req.body, req.user);
    res.status(403).send('private ids don\'t match');
    return res;
  }
  res.send('re-login for user: ' + req.params.uid);
});
// logout 4.1.3
router.delete('/:uid', (req, res) => {
  // Ein Spieler meldet sich beim Server ab. Der Server teilt allen Spielern mit, daß ein Spieler sich abgemeldet hat
  // ci -> s        - PlayerRemoveRequestInfo
  // s  -> Cs(ci)   0 PlayerRemovedInfo
  // s  -> C/Cs(ci) 1 PlayerRemovedInfo
  storage.allusers = storage.allusers.filter(u => u.playerId != req.user.playerId);
  res.send('logout for user: ' + req.params.uid);
})
// 4.1.4 connection abort
// Der Server stellt fest, daß die Verbindung zu einem Spieler abgebrochen ist. Er teilt dieses allen Spielern mit.
// s  -> Cs(ci)   0 PlayerLostInfo
// s  -> C/Cs(ci) 1 PlayerLostInfo


// chat
// single message 4.6.1
router.post('/:uid/messages', (req, res) => {
  // Ein Spieler möchte eine Textnachricht an einen anderen Spieler senden.
  //  ci  -> s  - ChatRequestInfo
  //  s   -> cj 0 ChatInfo
  res.send('user message for user: ' + req.user.name);
})
module.exports = router;
