import { Component, OnInit } from '@angular/core'
import { RouteService } from '../../services/route/route.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private url: RouteService) {}

  ngOnInit(): void {
    this.url.setRoute('signup')
  }
}