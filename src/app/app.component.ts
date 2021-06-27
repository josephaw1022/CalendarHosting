import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CalenderService } from './services/calender/calender.service'
import { UserdataService } from './services/userdata/userdata.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public calender: CalenderService,
    private user: UserdataService,
    private route: Router
  ) {}

  ngOnInit() {
    // Get data from localStorage
    this.calender.wakeDataUp()

    // Go to homepage if you have an account
    if (this.user.hasAccount()) {
      this.route.navigate(['calendar'])
    }
  }

  ngOnDestroy() {
    // If app exit, then save the eventlist to localStorage
    this.calender.putDataAsleep()
  }
}
