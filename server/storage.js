const EMPTY_USER = {
 state: 'PLAYER'// or DIRECTOR
};

const INITIAL_USER_ENTRY = {
  teamId: null,
  position: {x:0,y:0},
  currentDice: 0,
  numberOfCards : 0
}

const EMPTY_SESSION =  {
 teamMates: [],
 activePlayerIndex: 0,
 state: 'OPEN' // or CLOSED
};

 const users = {
  empty : EMPTY_USER,
  joined: INITIAL_USER_ENTRY,
  all: [
    Object.assign({}, EMPTY_USER, INITIAL_USER_ENTRY, {
      name: 'spieler1',
      state: 'DIRECTOR',
      playerId: 1,
      privateId: 1
    }),
    Object.assign({}, EMPTY_USER, INITIAL_USER_ENTRY, {
      name: 'spieler2',
      state: 'DIRECTOR',
      playerId: 2,
      privateId: 2
  })],
  /**
  * HAL representation for session
  */
  hal: function halUser(user) {
    // filter private fields
    let {privateId, playerId, state, ...filtered } = user;
    let url = `/players/${user.playerId}`;
    let session = sessions.all.find(s => s.teamMates.includes(user.playerId));
    let hal = {
      data: filtered,
      links: {
          self: { href: url }
      }
    };
    if(session) {
      hal.links.game =  { href: `/sessions/${session.sessionId}`, name: session.sessionName }
    }
    if(user.state == 'DIRECTOR') {
      hal.links.admin = { href: `/sessions/${session.sessionId}`, name: sessions.sessionName }
    }

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
   all: [
      Object.assign({}, EMPTY_SESSION, {
        sessionName: 'spiel1',
        teamMates: [1],
        sessionId: 1,
        directorId: 1
      }), Object.assign({}, EMPTY_SESSION, {
        sessionName: 'spiel2',
        teamMates: [2],
        sessionId: 2,
        directorId: 2
      })],
    /**
    * HAL representation for session
    */
    hal: function halSession(sess) {
      // filter private fields
      let {activePlayerIndex, directorId, sessionId, state, teamMates, ...filtered } = sess;
      let url = `/sessions/${sess.sessionId}`;
      let admin = users.all.find(p => p.playerId === sess.directorId);
      let hal = {
        data: filtered,
        links: {
            self: { href: url },
            admin: {
              href: `/players/${admin.playerId}`,
              name : admin.name
            },
            players: users.all.filter(p => sess.teamMates.indexOf(p.playerId) > -1).map(p => ({
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

module.exports = {users, sessions}
