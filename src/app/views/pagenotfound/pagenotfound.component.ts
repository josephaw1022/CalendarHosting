import { Component, OnInit } from '@angular/core'
import { RouteService } from '../../services/route/route.service'

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss'],
})
export class PagenotfoundComponent implements OnInit {
  constructor(private url: RouteService) {}

  ngOnInit(): void {
    //Redirect back to homepage if there is a 404 response
    this.url.redirect('')
  }
}
