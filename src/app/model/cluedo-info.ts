
export interface CluedoPdu {
  version: number
  senderId: number
  cluedoInfo: any
}

export module CluedoInfo {

  //Indicates that a player has been accepted.
  const	ACCEPTED = 0
  // State of a closed session.
  const CLOSED = 1
  // Identifies players who are directors.
  const DIRECTOR = 2
  // Indicates that a player has been expelled from a session.
  const	EXPELLED = 3
  // Indicates that a player is invited for a session.
  const INVITED = 4
  // Indicates that a player lost the game.
  const LOOSER = 5
  // The maximum number of player in a session.
  const NUMPLAYERS = 6
  // State of a newly created session.
  const OPENED = 7
  // Indicates that a player has been rejected.
  const REJECTED = 8
  // Used to indicate removed players, sessions etc.
  const REMOVED = 9
  // Server always has playerId = 0
  const SERVERID = 10
  // Identifies players who are NOT directors.
  const TEAMMATE = 11
  // State of a terminated session.
  const TERMINATED = 12
  // Used to indicate a currently unknown state of players, sessions etc.
  const UNKNOWN = 13
  // Indicates that a player won the game.
  const WINNER = 14

}
