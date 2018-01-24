function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const PERSON_CARDS = [
  ['BARONIN_VON_PORZ', 'blue'],
  ['FRAEULEIN_GLORIA', 'red'],
  ['FRAU_WEISS', 'white'],
  ['OBERST_VON_GATOW', 'yellow'],
  ['PROFESSOR_BLOOM', 'violett'],
  ['REVEREND_GRUEN', 'green' ]
].map(([name, color]= entry) => ({id: name, color: color, type: 'PERSON', position:{x:0,y:0}}));
const ROOM_CARDS = [
  'ARBEITSZIMMER',
  'BIBLIOTHEK',
  'BILLARDZIMMER',
  'HALLE',
  'KUECHE',
  'MUSIKZIMMER',
  'SALON',
  'SPEISEZIMMER',
  'WINTERGARTEN',
].map(name => ({ id: name, type: 'ROOM'}));
const TOOL_CARDS = [
  'DOLCH',
  'HEIZUNGSROHR',
  'LEUCHTER',
  'PISTOLE',
  'ROHRZANGE',
  'SEIL',
].map(name => ({ id: name, type:'TOOL'}));

const EMPTY_USER = {
 state: 'NONE',// or JOINED, DIRECTOR, PENDING, INVITED
};

const INITIAL_USER_ENTRY = {
  teamId: null,
  position: { x:0, y:0 },
  currentDice: 0,
  cards : []
}

const EMPTY_SESSION =  {
 teamMates: [],
 activePlayerIndex: 0,
 state: 'OPEN', // or CLOSED
};

 const users = {
  empty : EMPTY_USER,
  joined: INITIAL_USER_ENTRY,
  all: [
    {
      ...EMPTY_USER,
      ...INITIAL_USER_ENTRY,
      name: 'spieler1',
      state: 'DIRECTOR',
      playerId: 1,
      privateId: 1,
    },
    {
      ...EMPTY_USER,
      ...INITIAL_USER_ENTRY,
      name: 'spieler2',
      state: 'DIRECTOR',
      playerId: 2,
      privateId: 2,
    },{
        ...EMPTY_USER,
        ...INITIAL_USER_ENTRY,
        name: 'spieler3',
        state: 'JOINED',
        playerId: 3,
        privateId: 3,
    },{
        ...EMPTY_USER,
        ...INITIAL_USER_ENTRY,
        name: 'spieler4',
        state: 'JOINED',
        playerId: 4,
        privateId: 4,
      },
  ],
  /**
  * HAL representation for session
  */
  hal: function halUser(user) {
    // filter private fields
    let {privateId, playerId, state, whowherehow, cards, ...filtered } = user;
    let url = `/players/${user.playerId}`;
    let session = sessions.all.find(s => s.teamMates.indexOf(user.playerId) >-1);
    let hal = {
      data: filtered,
      links: {
          self: { href: url , name: user.name}
      }
    };
    switch(user.state) {
      case 'DIRECTOR':
        hal.links.admin =  { href: `/sessions/${session.sessionId}`, name: session.sessionName };
        hal.links.game =  { href: `/sessions/${session.sessionId}`, name: session.sessionName };
        break;
      case 'PENDING':
      case 'INVITED':
        hal.links.approve = { href: `/sessions/${session.sessionId}/players/${user.playerId}`, title: 'approve player for game'}
      case 'JOINED':
        hal.links.game =  { href: `/sessions/${session.sessionId}`, name: session.sessionName };
        break;
      case 'NONE':
      default:
        break;
    }
    //if(session.teamMates.length > 3 and sessionTeam)

    return hal;
  },
  update: function updateUser(addU, reqU) {
      let update = Object.assign({}, reqU, addU);
      users.all[users.all.findIndex(el => el.playerId === update.playerId)] = update;
      return update;
    }
};

const sessions = {
   empty : EMPTY_SESSION,
   all: [{
        ...EMPTY_SESSION,
        sessionName: 'spiel1',
        teamMates: [1, 3, 4],
        sessionId: 1,
        directorId: 1,
      }, {
        ...EMPTY_SESSION,
        sessionName: 'spiel2',
        teamMates: [2],
        sessionId: 2,
        directorId: 2,
      }],
    /**
    * HAL representation for session
    */
    hal: function halSession(sess) {
      // filter private fields
      let {activePlayerIndex, directorId, sessionId, state, teamMates, solution, ...filtered } = sess;
      let url = `/sessions/${sess.sessionId}`;
      let admin = users.all.find(p => p.playerId === sess.directorId);
      let hal = {
        data: filtered,
        links: {
            self: { href: url , name: sess.sessionName},
            admin: {
              href: `/players/${admin.playerId}`,
              name : admin.name
            },
            players: sess.teamMates.map(id => users.all.find(p => p.playerId == id))
              .filter(p => p.state == 'DIRECTOR' || p.state == 'JOINED')
              .map(p => ({
                href : `/players/${p.playerId}`,
                name : p.name
              }))
        }
      };
      if(sess.state == 'OPEN') {
        hal.links.start = { href: `${url}/state`, title: 'get session started'};
        hal.links.join = { href: `${url}/players`, title: 'join session'};
      } else {
        hal.links.turn = { href: `${url}/turn`, title: 'current turn of session'};
      }
      return hal;
    },
    update: function updateSession(addS, reqS) {
      let update = Object.assign({}, reqS, addS);
      sessions.all[sessions.all.findIndex(el => el.sessionId === update.sessionId)] = update;
      return update;
    }
  };

const cards = {
  getSolution: function() {
     return {
          who: PERSON_CARDS[Math.floor(Math.random()*PERSON_CARDS.length)],
          where: ROOM_CARDS[Math.floor(Math.random()*ROOM_CARDS.length)],
          how: TOOL_CARDS[Math.floor(Math.random()*TOOL_CARDS.length)]
      };
    },
  persons: PERSON_CARDS,
  tools: TOOL_CARDS,
  rooms: ROOM_CARDS,
  splitAll: function(solution, amountPlayers) {
    let availableCards = PERSON_CARDS.filter(c => c.id != solution.who.id)
        .concat(ROOM_CARDS.filter(c => c.id != solution.where.id))
        .concat(TOOL_CARDS.filter(c => c.id != solution.how.id));
    shuffleArray(availableCards);


    let results = [];
    let chunkSize = Math.ceil(availableCards.length / amountPlayers);
    console.log('shuffled done ...', availableCards.length, amountPlayers, chunkSize)
    for (var i = 0; i < availableCards.length; i += chunkSize) {
        results.push(availableCards.slice(i, i + chunkSize));
    }
    return results;
  }
}

module.exports = {users, sessions, cards}
