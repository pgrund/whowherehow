const router = require('express').Router();
const storage = require('../storage');
const jwt = require('jsonwebtoken');
const fs = require("fs");

const SERVER_PWD = "wfw_aldi_nord";

function authenticatedUser (req, res, next) {
  if(!req.cookies.privateId) {
    res.status(401).send('no privateId');
    return;
  }
  req.auth = storage.users.all.find(u => u.privateId == req.cookies.privateId);
  if(!req.auth) {
    res.status(401).send('invalid user ');
    return;
  }
  next();
}

// login 4.1.1
router.post('/players', (req, res) => {
  //{ username: name, ...}
  // Ein Spieler sendet einen Anmeldungswunsch an den Server. Der Server bestätigt dem Spieler die Anmeldung oder sendet ihm eine Fehlermeldung (z.B. wenn die Kapazitäten erschöpft sind). Desweiteren teilt der Server allen bei ihm angemeldeten Spielern mit, daß ein neuer Spieler hinzugekom- men ist
  // ci -> s        - PlayerAddRequestInfo
  // s  -> ci       0 PlayerAdConfirmInfo
  // s  -> C        1 PlayerAddedInfo
  if(!req.body.name || !req.body.password) {
    res.status(400).send('missing name or password');
    return res;
  }

  if(SERVER_PWD != req.body.password) {
    res.status(403).send('invalid password for accessing this server');
    return res;
  }

  user = storage.users.all.find( u => u.name == user.name);
  if( user == null) {
    user = {
      ...storage.users.empty,
      name: req.body,
      playerId: Math.max(...(storage.users.all.map(u => u.playerId).concat(0))) +1
    }
    storage.users.all.push(user);
  }


  // const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
  //               algorithm: 'RS256',
  //               expiresIn: 120,
  //               subject: userId
  //           })
  //
  // res.status(200).json({
  //   idToken: jwtBearerToken,
  //   expiresIn: ...
  // });
  let resUser = Object.assign({}, storage.users.hal(user));
  //resUser.data.privateId = user.privateId;
  req.wss.sendToAllPlayers({
    type:"NOTIFY",
    data:{
      action:'[Notification] Player added',
      payload: storage.users.hal(newUser)
    }});
  //res.cookie('privateId', user.privateId);
  res.hal(resUser);
});

//re-login 4.1.2
router.put('/players/:uid', (req, res) => {
  // private id needed
  // Die Verbindung eines Spielers zum Server ist mitten im Spiel abgebrochen. Der Spieler stellt die Verbindung unter Angabe der bereits zugewiesenen IDs (öffentliche und private ID) wieder her.
  // ci -> s        - PlayerReAddRequestInfo
  // s  -> ci       0 PlayerAdConfirmInfo
  // s  -> Cs(ci)   0 PlayerAddedInfo
  // s  -> C/Cs(ci) 1 PlayerAddedInfo
  let user = storage.users.all.find( u => u.playerId == req.params.uid);
  if( user == null) {
    res.status(404).send('player not found');
    return res;
  }
  if(!req.body.privateId || req.body.privateId != user.privateId) {
    console.warn(req.body, user);
    res.status(403).send('private ids don\'t match');
    return res;
  }
  res.cookie('privateId', user.privateId);
  let resUser = Object.assign({}, storage.users.hal(user));
  resUser.data.privateId = user.privateId;
  req.wss.sendToAllPlayers({
    type:"NOTIFY",
    data:{
      action:'[Notification] Player Re-Login',
      payload: user.name
    }});
  res.hal(resUser);
});

router.use('/players', authenticatedUser, require('./player'));
router.use('/sessions', authenticatedUser, require('./session'));

module.exports = router;
