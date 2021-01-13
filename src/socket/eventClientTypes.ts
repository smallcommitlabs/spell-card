import { PreGameSetupDto } from './dtos';

export type emitter<t> = (data: t) => void;

export type Callback<t> = (data: t) => void;

export type receiver<t> = (callback: Callback<t>) => void;

export interface IEventClient {
  emitter: IEmitter;
  receiver: Ireceiver;
}

export type IEmitter = {
  requestStart: emitter<null>;
};

export type Ireceiver = {
  onStartPreGame: receiver<PreGameSetupDto>;
};
