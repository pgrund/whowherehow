const emptyPlayer = {
  state: 'PLAYER', // or DIRECTOR
  teamId: null,
  position: {x:0,y:0},
  currentDice: 0,
  numberOfCards : 0
}

let allusers = [
  Object.assign({}, emptyPlayer, {
    name: 'spieler1',
    playerId: 1,
    privateId: 1
  }), Object.assign({}, emptyPlayer, {
    name: 'spieler2',
    playerId: 2,
    privateId: 2
  })];

  const emptySession = {
    teamMates: [],
    activePlayerIndex: 0,
    state: 'OPEN' // or CLOSED
  }

  let allsessions = [
    Object.assign({}, emptySession, {
      sessionName: 'spiel1',
      teamMates: [1],
      sessionId: 1,
      directorId: 1
    }), Object.assign({}, emptySession, {
      sessionName: 'spiel2',
      teamMates: [2],
      sessionId: 2,
      directorId: 2
    })];
module.exports = {emptyPlayer, allusers, emptySession, allsessions}
