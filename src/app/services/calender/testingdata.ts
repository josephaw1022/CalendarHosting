import * as moment from 'moment'
import { EventModel, IEvent } from '../../models/event/event'

/*

This is the sample that I will be messing with in order to see if the CRUD operations work.  


*/
export const event1: IEvent = {
  id: 1,
  title: 'first event',
  start: {
    day: moment().add(2, 'days').toDate(),
    hour: 13,
    minute: 15,
  },
  stop: {
    day: moment().add(2, 'days').toDate(),
    hour: 23,
    minute: 45,
  },
}

export const event2: IEvent = {
  id: 2,
  title: 'second event',
  start: {
    day: moment().add(4, 'days').toDate(),
    hour: 17,
    minute: 15,
  },
  stop: {
    day: moment().add(5, 'days').toDate(),
    hour: 21,
    minute: 45,
  },
}

export const sampleEventList: EventModel = [event1, event2]
