import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AlleventsComponent } from './views/allevents/allevents.component'
import { CalenderComponent } from './views/calender/calender.component'
import { EventComponent } from './views/event/event.component'
import { LandingpageComponent } from './views/landingpage/landingpage.component'
import { PagenotfoundComponent } from './views/pagenotfound/pagenotfound.component'
import { SignupComponent } from './views/signup/signup.component'

const routes: Routes = [
  {
    path: 'calendar',
    component: CalenderComponent,
  },
  {
    path: 'event',
    component: EventComponent,
  },

  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    component: LandingpageComponent,
  },
  {
    path: 'allevents',
    component: AlleventsComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
