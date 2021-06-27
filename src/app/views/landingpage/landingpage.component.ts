import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, OnInit } from '@angular/core'
import { RouteService } from '../../services/route/route.service'
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
})
export class LandingpageComponent implements OnInit {
  constructor(
    public url: RouteService,
    private observer: BreakpointObserver
  ) {}

  public mobileLandscape: any = null

  ngOnInit() {
    this.url.setRoute('')
    // Use angular material cdk observer to help better format the page for mobile
    this.observer
      .observe(Breakpoints.HandsetLandscape)
      .subscribe((result) => {
        this.mobileLandscape = result
        console.log(this.mobileLandscape)
      })
  }
}
