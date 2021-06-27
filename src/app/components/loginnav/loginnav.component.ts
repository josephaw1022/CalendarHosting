import { Component } from '@angular/core'
import { RouteService } from '../../services/route/route.service'

@Component({
  selector: 'app-loginnav',
  templateUrl: './loginnav.component.html',
  styleUrls: ['./loginnav.component.scss'],
})
export class LoginnavComponent {
  constructor(public url: RouteService) {}
}
