const router = require('express').Router({mergeParams: true});
const storage = require('../storage');

router.use(function(req, res, next) {
  if(req.session.state != 'CLOSED') {
    return res.status(400).send('session has invalid state, only closed ones are valid');
  }
  if(req.session.teamMates.indexOf(req.auth.playerId)<0) {
    return res.status(403).send('only members of session allowed');
  }
  if(!(req.auth.state == 'JOINED' || req.auth.state == 'DIRECTOR')) {
    console.log(req.auth.state);
    return res.status(401).send('only joined members of session allowed');
  }
  req.session.players = req.session.teamMates.map( pId => storage.users.all.find(user => user.playerId == pId));
  req.session.cards = storage.cards;
  next();
});
// active turn
// next player 4.5.1 - ASYNC ==> nope
router.get('/', (req, res) => { // '/{sid}/users;status=current'
  //Der Server teilt den Spielern einer Session mit, wer am Zug ist
  // s  -> Cs 0 PlayerDrawInfo

  // session + players + cards + links
  let session = {
    ...req.session,
    players: req.session.players.map(storage.users.hal)
  }
  let halSession = storage.sessions.hal(session);
  // halSession.players = halSession.links.players.map( p => storage.users.hal(storage.users.all.find(user => user.name == p.name)))
  // halSession.cards = storage.cards;
  res.hal(halSession);
})

router.get('/cards', (req, res) => {
  res.json({
    cards: storage.cards,
    yours: req.user.cards
  });
})

// roll dice 4.5.2.a - +ASYNC
router.post('/cast', (req, res) => { // '/{sid}/users/{uid}/cast', '/{sid}/current/cast'
  // .. fordert beim Server ein Würfelergebnis an.
  // ci -> s      - DiceRequestInfo
  // s  -> Cs(ci) 0 DiceInfo
  res.send('dice result');
})
// move player 4.5.2 b - +ASYNC
router.put('/position', (req, res) => { // '/{sid}/users/{uid}/position', '/{sid}/current/position'
  //Ein Spieler ist am Zug. Er nimmt entweder einen Geheimgang ...
  //Der Spieler ermittelt seine neue Position und gibt diese an den Server weiter. Der Server gibt die Veränderung an alle Spieler der Session weiter.
  // ci -> s      - PlayerMoveRequestInfo
  // s  -> Cs(ci) 0 PlayerMovedInfo
  res.send('new position of user')
})
// suspect 4.5.3 a
router.post('/suspicions', (req, res) => {
  //Ein Spieler äußert einen Verdacht.
  //Der Server teilt diesen Verdacht allen Teilnehmern der Session mit wobei zusätzlich vermerkt wird, wer diesen Verdacht widerlegen kann (möglicherweise kann niemand den Verdacht widerlegen).
  //Der betreffende Mitspieler widerlegt ggf. den Verdacht. Der Server teilt dem Spieler, der am Zug ist, mit, wer durch welche Karte den Verdacht widerlegt hat.
  // ci -> s      - SuspicionRequestInfo
  // s  -> Cs(ci) 0 SuspicionInfo
  // #forward to suspicioncard
  // cj -> s      - SuspicionCardInfo
  // s  -> ci     0 SuspicionCardInfo
  res.send('suspicion created') //ci, suspicionid
})
// suspect 4.5.3 b
router.put('/suspicions/:susid/card', (req, res) => {
  //Ein Spieler äußert einen Verdacht.
  //Der Server teilt diesen Verdacht allen Teilnehmern der Session mit wobei zusätzlich vermerkt wird, wer diesen Verdacht widerlegen kann (möglicherweise kann niemand den Verdacht widerlegen).
  //Der betreffende Mitspieler widerlegt ggf. den Verdacht. Der Server teilt dem Spieler, der am Zug ist, mit, wer durch welche Karte den Verdacht widerlegt hat.
  // ...
  // cj -> s      - SuspicionCardInfo
  // s  -> ci     0 SuspicionCardInfo
  res.send('suspicion: ' + req.params.susid + ' invalidated') //ci, suspicionid
})
// accuse 4.5.4
router.post('/accusations', (req, res) => {
  //Ein Spieler erhebt Anklage.
  //Der Server teilt diese Anklage allen Teilnehmern der Session mit.
  //Der Server übermittelt dem Spieler die tatsächlichen Tatbestände
  //Desweiteren teilt er allen Teilnehmern der Session mit, ob die Anklage zutrifft und damit das Spiel beendet ist.
  //Ist das Spiel beendet so kann der Spielleiter eine weitere Spielrunde starten, in dem er den Status der Session von „beendet“ auf „geschlossen“ setzt (siehe Abschnitt 4.4).
  // ci -> s      - AccusationRequestInfo
  // s  -> Cs(ci) 0 AccusationInfo
  // s  -> ci     0 CrimeFactInfo
  // s  -> Cs(ci) 0 WinnerInfo
  res.send('accusation send')
})
// end turn 4.5.5
router.put('/status', (req, res) => {
  // Ein Spieler beendet seinen Zug. Der Server teilt dieses allen Teilnehmern der Session mit
  // ci -> s      - DrawFinishedInfo
  // s  -> Cs(ci) 0 DrawFinishedInfo
  res.send('closed turn');
})

module.exports = router
