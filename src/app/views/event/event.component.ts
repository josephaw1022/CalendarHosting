import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { IEvent } from '../../models/event/event'
import { CalenderService } from '../../services/calender/calender.service'
import { RouteService } from '../../services/route/route.service'
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnDestroy {
  // Initialize min and max date for calendar
  minDate: Date
  maxDate: Date

  constructor(
    private route: RouteService,
    public fb: FormBuilder,
    public cal: CalenderService
  ) {
    const currentYear = new Date().getFullYear()

    // Set the min and max date for calendar
    this.minDate = new Date()
    this.maxDate = new Date(currentYear + 1, 11, 31)
  }

  // Initialize start and end date
  startDate: Date = new Date()
  endDate: Date = new Date()

  // The form object
  range = new FormGroup({
    title: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
  })

  submitForm(): void {
    // Creating a compatible user input
    const date: IEvent = {
      id: this.cal.idCount + 1,
      title: this.range.value.title,
      start: {
        day: this.range.value.start,
        hour: 12,
        minute: 0,
      },
      stop: {
        day: this.range.value.end,
        hour: 12,
        minute: 0,
      },
    }
    this.cal.CREATE(date)

    // Reset the values of the form
    this.range.value.title = ''
    this.range.value.start = new Date()

    // Then result the form class as well
    setTimeout(() => {
      this.range.reset()
    })
  }

  ngOnDestroy() {
    this.route.setRoute('Calendar')
  }
}
