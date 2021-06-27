import {
  BreakpointObserver,
  Breakpoints,
} from "@angular/cdk/layout";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { DateRange } from "@angular/material/datepicker";
import * as moment from "moment";
import * as _moment from "moment";
import { timer } from "rxjs";
import Swal from "sweetalert2";
import { IEvent } from "../../models/event/event";
import { CalenderService } from "../../services/calender/calender.service";
import { RouteService } from "../../services/route/route.service";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
@Component({
  selector: "app-calender",
  templateUrl: "./calender.component.html",
  styleUrls: ["./calender.component.scss"],
})
export class CalenderComponent implements OnInit, OnDestroy {
  constructor(
    public route: RouteService,
    public observer: BreakpointObserver,
    public cal: CalenderService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  // Initialize Calendar Information
  minDate = new Date();
  thisMonth = this.minDate.getMonth();
  maxDate = new Date(new Date().getFullYear(), 11, 31);
  monthEventCount = 0;
  mobileLandscape: any = null;
  observingVal: any;
  stopAlerts = false;

  ngOnInit() {
    const notificationAlerted = {
      notified: false,
    };
    localStorage.setItem(
      "notified",
      JSON.stringify(notificationAlerted)
    );
    this.route.setRoute("calendar");
    this.cal.wakeDataUp();
    this.observer
      .observe(Breakpoints.HandsetLandscape)
      .subscribe((result) => {
        this.mobileLandscape = result;
      });
    this.observingVal = timer(100, 100).subscribe(() => {
      this.notificationEvent();
      this.unscribeVal();
      const value = {
        notified: true,
      };
      localStorage.setItem("notified", JSON.stringify(value));
    });
    this.firstTime();
  }

  ngOnDestroy() {
    localStorage.setItem(
      "firstSessionShown",
      JSON.stringify({
        shown: true,
      })
    );
  }

  unscribeVal() {
    if (this.stopAlerts) {
      console.log(
        "%c It Stopped the annoying alerts 🤬",
        "background-color:#333 ; border-color:#333; border-radius:25px; color:#eee"
      );
      this.observingVal.unsubscribe();
    }
  }

  // Whether or not to include an event in the eventList in the "This month's events " section
  includeThis(date: Date): boolean {
    this.monthEventCount++;
    const tempDate = new Date(date);
    return tempDate.getMonth() == this.thisMonth;
  }

  // Get # of events this month
  get eventsThisMonth(): number {
    return this.monthEventCount;
  }

  // Calendar formatting variables

  selectedEvent: IEvent = this.cal.GET[0];
  startColor: Date = _moment().toDate();
  stopColor: Date = _moment().add(4, "days").toDate();

  get getStartColor(): Date {
    return this.startColor;
  }

  get getStopColor(): Date {
    return this.stopColor;
  }

  get whatIsSelected(): IEvent {
    return this.selectedEvent;
  }

  // There is some weird error with run the calender service function within the calender component html so I have to
  // have a local function on the component that pushes it up to the service
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toDelete(spcecificEvent: IEvent): void {
    const tempVal = spcecificEvent;
    this.cal.DELETE(tempVal);
  }

  setSelected(selectedEvent: IEvent): void {
    console.log(selectedEvent);
    this.selectedEvent = selectedEvent;
    this.cal.setSelected(selectedEvent);
    this.startColor = new Date(selectedEvent.start.day);
    this.stopColor = new Date(selectedEvent.stop.day);
    // Scroll to the after clicking event to view calendar. Put in place b/c of the amount of scrolling that was required on mobile

    document.body.scrollTop =
      document.documentElement.scrollTop = 0;
  }

  scrollToForm(temp: any) {
    document.getElementById(temp).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  selected: DateRange<Date> | Date | null = null;

  getDateRange(): DateRange<Date> {
    const temp1 = new Date(this.whatIsSelected.start.day);
    const temp2 = new Date(this.whatIsSelected.stop.day);
    const val = new DateRange(temp1, temp2);
    return val;
  }

  stopTheAlert(): void {
    this.stopAlerts = true;
  }

  // Notification Method
  notificationEvent(): void {
    const runFunction = JSON.parse(
      String(localStorage.getItem("notified"))
    );

    if (runFunction.notified == false) {
      const today = moment().add(1, "days").toDate();
      const soon = moment().add(0, "days").toDate();

      this.cal.eventList.forEach((eventInEventList) => {
        const tempVal = new Date(eventInEventList.start.day);
        const firstTime = String(
          JSON.parse(
            String(localStorage.getItem("firstSession"))
          )
        );

        const temp1 = {
          day: Number(tempVal.getDay()),
          month: Number(tempVal.getMonth()),
        };
        const temp2 = {
          day: Number(today.getDay()),
          month: Number(today.getMonth()),
        };
        const temp3 = {
          day: Number(soon.getDay()),
          month: Number(soon.getMonth()),
        };

        console.table([temp1, temp2]);

        // Reminder for today
        if (
          temp1.day == temp2.day &&
          temp1.month == temp2.month
        ) {
          Swal.fire(
            `  <h1 class='text-purple-500 fancy-cursive-font'> Reminder that your event:
            <span class="italic text-black secondary-font">  ${eventInEventList.title} </span> <span class='text-red-500'> is tomorrow</span>   </h1> `,
            `
           <h1 class="animate-spin lg:scale-105">⏳ </h1> 
            `
          );
        }

        // Reminder for tomorrow
        if (
          temp1.day == temp3.day &&
          temp1.month == temp3.month
        ) {
          Swal.fire(
            `  <h1 class='text-purple-500 fancy-cursive-font'> Friendly Reminder that your event:
             <span class="italic text-black secondary-font">  ${eventInEventList.title} </span> <span class='text-red-500'> is today</span>   </h1> `,
            `
            <h1 class="animate-bounce lg:scale-105">🚨🚨 </h1> 
             `
          );
        }

        this.stopTheAlert();
      });
    }
  }

  // First Time Message
  firstTime(): void {
    const firsttime = String(
      JSON.parse(String(localStorage.getItem("firstSession")))
    );

    const username = String(
      JSON.stringify(localStorage.getItem("username"))
    );

    const val = String(
      JSON.parse(
        String(localStorage.getItem("firstSessionShown"))
      )
    );

    if (firsttime == "null" && username == "null") {
      if (val == "null") {
        Swal.fire(
          "Welcome to the App! ",
          "Add and organize events in a clean and playfully colored application"
        );
      }
    }
  }
}
