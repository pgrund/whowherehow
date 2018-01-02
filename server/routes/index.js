const router = require('express').Router();
const storage = require('../storage');

router.get('/ping', (req, res) => {
  res.send('pong');
});


function authenticatedUser (req, res, next) {
  if(!req.cookies.privateId) {
    res.status(401).send('no privateId');
    return;
  }
  req.auth = storage.allusers.find(u => u.privateId == req.cookies.privateId);
  if(!req.auth) {
    res.status(401).send('invalid user ');
    return;
  }
  next();
}

// login 4.1.1
router.post('/users', (req, res) => {
  //{ username: name, ...}
  // Ein Spieler sendet einen Anmeldungswunsch an den Server. Der Server bestätigt dem Spieler die Anmeldung oder sendet ihm eine Fehlermeldung (z.B. wenn die Kapazitäten erschöpft sind). Desweiteren teilt der Server allen bei ihm angemeldeten Spielern mit, daß ein neuer Spieler hinzugekom- men ist
  // ci -> s        - PlayerAddRequestInfo
  // s  -> ci       0 PlayerAdConfirmInfo
  // s  -> C        1 PlayerAddedInfo
  let user = req.body;
  if(!user.name || !user.password) {
    res.status(400).send('missing name or password');
    return res;
  }
  if(storage.allusers.find( u => u.name == user.name) != null) {
    res.status(400).send('player already exists');
    return res;
  }
  user.playerId = Math.max(...(storage.allusers.map(u => u.playerId).concat(0))) +1;
  user.privateId = new Date().getTime();
  let newUser = Object.assign({}, storage.emptyPlayer, user);
  storage.allusers.push(newUser);
  res.cookie('privateId', user.privateId);
  res.json(newUser);
});

router.use('/users', authenticatedUser, require('./user'));
router.use('/sessions', authenticatedUser, require('./session'));

module.exports = router;
