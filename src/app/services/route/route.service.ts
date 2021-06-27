import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private route: Router) {}

  currentRoute = ''

  get fetchRoute() {
    return this.currentRoute
  }

  setRoute(url: string): void {
    this.currentRoute = url

    // console.log('worked', this.currentRoute)
  }

  redirect(url: string): void {
    this.route.navigate([url])
  }
}
