export interface Event {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

/* 
Since this is an abstract Model that is only require for the IEvent attributes, it is not neccasary to create it's own file 
*/

interface TimeModel {
  day: Date;
  hour: number;
  minute: number;
}

export interface IEvent {
  id: number;
  title: string;
  start: TimeModel;
  stop: TimeModel;
}

export type EventModel = IEvent[];

export type EventSet = IEvent[] | Event | null;
