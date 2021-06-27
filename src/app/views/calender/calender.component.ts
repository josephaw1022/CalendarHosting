import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, OnInit } from '@angular/core'
import {
  DateRange,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker'
import * as _moment from 'moment'
import { IEvent } from '../../models/event/event'
import { CalenderService } from '../../services/calender/calender.service'
import { RouteService } from '../../services/route/route.service'
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  constructor(
    public route: RouteService,
    public observer: BreakpointObserver,
    public cal: CalenderService
  ) {}

  // Initialize Calendar Information
  minDate = new Date()
  thisMonth = this.minDate.getMonth()
  maxDate = new Date(new Date().getFullYear(), 11, 31)
  monthEventCount = 0
  mobileLandscape: any = null

  ngOnInit() {
    this.route.setRoute('calendar')
    this.cal.wakeDataUp()
    this.observer
      .observe(Breakpoints.HandsetLandscape)
      .subscribe((result) => {
        this.mobileLandscape = result
      })
  }

  dateClass(): any {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDate() == 20) {
        return 'special-date'
      } else {
        return ''
      }
    }
  }
  // Whether or not to include an event in the eventList in the "This month's events " section
  includeThis(date: Date): boolean {
    this.monthEventCount++
    const tempDate = new Date(date)
    return tempDate.getMonth() == this.thisMonth
  }

  // Get # of events this month
  get eventsThisMonth(): number {
    return this.monthEventCount
  }

  // Calendar formatting variables

  selectedEvent: IEvent = this.cal.GET[0]
  startColor: Date = _moment().toDate()
  stopColor: Date = _moment().add(4, 'days').toDate()

  get getStartColor(): Date {
    return this.startColor
  }

  get getStopColor(): Date {
    return this.stopColor
  }

  get whatIsSelected(): IEvent {
    return this.selectedEvent
  }

  // There is some weird error with run the calender service function within the calender component html so I have to
  // have a local function on the component that pushes it up to the service
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toDelete(spcecificEvent: IEvent): void {
    const tempVal = spcecificEvent
    console.log(tempVal)
    this.cal.DELETE(tempVal)
  }

  setSelected(selectedEvent: IEvent): void {
    console.log(selectedEvent)
    this.selectedEvent = selectedEvent
    this.cal.setSelected(selectedEvent)
    this.startColor = new Date(selectedEvent.start.day)
    this.stopColor = new Date(selectedEvent.stop.day)
    // Scroll to the after clicking event to view calendar. Put in place b/c of the amount of scrolling that was required on mobile

    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  selected: DateRange<Date> | Date | null = null

  getDateRange(): DateRange<Date> {
    const temp1 = new Date(this.whatIsSelected.start.day)
    const temp2 = new Date(this.whatIsSelected.stop.day)
    const val = new DateRange(temp1, temp2)
    return val
  }
}
