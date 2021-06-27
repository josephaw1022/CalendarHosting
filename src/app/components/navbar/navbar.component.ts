import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EventComponent } from "src/app/views/event/event.component";
import { CalenderService } from "../../services/calender/calender.service";
import { RouteService } from "../../services/route/route.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  constructor(
    public route: RouteService,
    public date: CalenderService,
    public dialog: MatDialog
  ) {}

  dialogComponent = EventComponent;

  openDialog(component: any): void {
    const dialogRef = this.dialog.open(component);
  }
}
