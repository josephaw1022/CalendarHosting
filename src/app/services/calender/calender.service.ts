import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventModel, IEvent } from "../../models/event/event";
import { event1 } from "./testingdata";
import * as moment from "moment";
@Injectable({
  providedIn: "root",
})
export class CalenderService {
  // Get current id count
  get idCount(): number {
    return this.eventIDCount;
  }

  // Currently selected
  setSelected(selectedEvent: IEvent): void {
    const value = selectedEvent;
    this.selectedEvent = value;
  }

  // Get current date
  getDate(): Date {
    return new Date();
  }

  eventLocation = "events";
  idLocation = "eventid";
  eventList: EventModel = [];
  eventIDCount: number = 0;
  selectedEvent: IEvent = this.GET[0];

  // Get currently selected
  get whatIsSelected(): IEvent {
    this.selectedEvent = this.eventList[0];
    return this.selectedEvent;
  }

  // Function to help us add css functionality to clicked objects
  doEventsMatch(specificEvent: IEvent): boolean {
    if (specificEvent.id == this.selectedEvent.id) {
      return true;
    }
    return false;
  }

  // Retrieves stored data for current session
  wakeDataUp(): void {
    const tempString = localStorage.getItem("events");
    // If data stored fetch is truthy

    // If no data is stored
    const tomorrow = moment().add(3, "days").toDate();
    const tempVal: IEvent = {
      id: 1,
      start: {
        day: tomorrow,
        hour: 12,
        minute: 0,
      },
      stop: {
        day: tomorrow,
        hour: 12,
        minute: 1,
      },
      title: "First Event ",
    };
    console.log(tempVal);
    if (tempString != null) {
      const tempString2 = String(tempString).toString();
      this.eventList = JSON.parse(tempString2);
      this.eventIDCount = Number(
        localStorage.getItem(this.idLocation)
      );
    } else {
      this.eventList = [tempVal];
      this.eventIDCount = 1;
    }
  }

  // Stores the data for the next session
  putDataAsleep(): void {
    //Save Data
    const tempString = JSON.stringify(this.eventList);
    localStorage.setItem(this.eventLocation, tempString);
  }

  // Create an event
  CREATE(event: IEvent): void {
    let dontCreate = false;

    if (this.eventList.length != 0) {
      this.eventList.forEach((individualEvent) => {
        if (individualEvent.id == event.id) {
          dontCreate = true;
        }
      });
    }

    // If event isn't a duplicate
    if (!dontCreate) {
      this.eventList.push(event);
      this.eventIDCount++;
    }
    this.SAVE();
  }

  // Read the list of events
  get GET(): EventModel {
    return this.eventList
      .sort((date1, date2) => {
        const value: any = new Date(date1.start.day);
        const value2: any = new Date(date2.start.day);

        return value2.getTime() - value.getTime();
      })
      .reverse();
  }

  // Update a value in the list
  UPDATE(changingEvent: IEvent): void {
    let iter = 0;
    this.eventList.forEach((specificEvent) => {
      if (specificEvent.id == changingEvent.id) {
        this.eventList[iter] = changingEvent;
      }
    });
    this.SAVE();
  }

  // Deletes a value in the list
  DELETE(deletedEvent: IEvent): void {
    const tempData = this.eventList.filter((specificEvent) => {
      return specificEvent.id != deletedEvent.id;
    });
    this.eventList = tempData;
    this.SAVE();
  }

  // Save Data
  SAVE(): void {
    const tempList = JSON.stringify(this.eventList).toString();
    localStorage.setItem(this.eventLocation, tempList);
    localStorage.setItem(
      this.idLocation,
      this.eventIDCount.toString()
    );
  }

  // Delete All Data
  DELETEALL(): void {
    localStorage.removeItem(this.idLocation);
    localStorage.removeItem(this.eventLocation);
  }
}
