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

router.param('uid', function (req, res, next, id) {
  let user = storage.users.all.find( u => u.playerId == id);
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
  res.hal( {
    links: {
      self: '/players',
      find: { href: "/players/{?id}", templated: true }
    },
    embeds: {
      "players": storage.users.all.map(storage.users.hal)
    }
  });
})

// user info 4.3.1
router.get('/:uid', (req, res) => {
  // Ein Spieler fordert eine Beschreibung eines anderen Spielers an. Der Server liefert dem Spieler die Beschreibung.
  // ci -> s  - PlayerRequestInfo
  // s  -> ci 0 PlayerInfo
  res.hal(storage.users.hal(req.user));
})

// logout 4.1.3
router.delete('/:uid', (req, res) => {
  // Ein Spieler meldet sich beim Server ab. Der Server teilt allen Spielern mit, daß ein Spieler sich abgemeldet hat
  // ci -> s        - PlayerRemoveRequestInfo
  // s  -> Cs(ci)   0 PlayerRemovedInfo
  // s  -> C/Cs(ci) 1 PlayerRemovedInfo
  storage.users.all = storage.users.all.filter(u => u.playerId != req.user.playerId);
  res.clearCookie('privateId', { path: '/api'});
  res.send('logout for player: ' + req.params.uid);
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
  res.send('user message for player: ' + req.user.name);
})
module.exports = router;