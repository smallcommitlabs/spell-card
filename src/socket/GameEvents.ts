// Ideally this is a file that should be synced across the client and server

// These are the events the client will receive
export enum EventsReceived {
  // Lifecycle events
  STARTPREGAME = 'startpregame',
  ENDPREGAME = 'endpregame',
  STARTGAME = 'startgame',
  STARTROUND = 'startround',
  ENDROUND = 'endround',
  STARTPOSTROUND = 'startpostround',
  ENDPOSTROUND = 'endpostround',
  ENDGAME = 'endgame',

  // Responding to user events
  CORRECTANSWER = 'correctanswer',
  INCORRECTANSWER = 'incorrectanswer',
}

// these are the events the client sends
export enum EventsEmitted {
  REQUESTSTART = 'requeststart',
  SWAPCARDS = 'swapcards',
  ANSWERCARD = 'answercard',
  USERQUIT = 'userquit',
}
