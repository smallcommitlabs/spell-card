import { Callback, IEmitter, IEventClient, Ireceiver } from './eventClientTypes';
import { PreGameSetupDto } from './dtos';
import openSocket from 'socket.io-client';
import { EventsEmitted, EventsReceived } from './GameEvents';

/**
 * Add functions here for emit events
 */
class EventEmitter implements IEmitter {
  private socket: openSocket.Socket;

  constructor(socket: openSocket.Socket) {
    this.socket = socket;
  }

  requestStart() {
    this.socket.io.emit(EventsEmitted.REQUESTSTART);
  }
}

/**
 * Add functions here for on events
 */
class EventReceiver implements Ireceiver {
  private socket: openSocket.Socket;

  constructor(socket: openSocket.Socket) {
    this.socket = socket;
  }

  onStartPreGame(callback: Callback<PreGameSetupDto>) {
    this.socket.on(EventsReceived.STARTPREGAME, callback);
  }
}

// This is the function to construct a socket client
export const EventClient = (url: string): IEventClient => {
  const socket = openSocket.io(url, {
    transports: ['websocket'],
  });

  console.log(socket);
  return {
    emitter: new EventEmitter(socket),
    receiver: new EventReceiver(socket),
  };
};
