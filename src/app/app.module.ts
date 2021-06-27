import { A11yModule } from "@angular/cdk/a11y";
import { CdkTreeModule } from "@angular/cdk/tree";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MatNativeDateModule,
  MatRippleModule,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginnavComponent } from "./components/loginnav/loginnav.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SignupformComponent } from "./components/signupform/signupform.component";
import { AlleventsComponent } from "./views/allevents/allevents.component";
import { CalenderComponent } from "./views/calender/calender.component";
import { DetaileventComponent } from "./views/detailevent/detailevent.component";
import { EventComponent } from "./views/event/event.component";
import { LandingpageComponent } from "./views/landingpage/landingpage.component";
import { PagenotfoundComponent } from "./views/pagenotfound/pagenotfound.component";
import { SignupComponent } from "./views/signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    EventComponent,
    SignupComponent,
    NavbarComponent,
    LandingpageComponent,
    LoginnavComponent,
    SignupformComponent,
    PagenotfoundComponent,
    AlleventsComponent,
    DetaileventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    A11yModule,
    CdkTreeModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
