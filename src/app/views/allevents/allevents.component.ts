import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IEvent } from "src/app/models/event/event";
import { CalenderService } from "../../services/calender/calender.service";
import { RouteService } from "../../services/route/route.service";
import { UserdataService } from "../../services/userdata/userdata.service";
import { DetaileventComponent } from "../detailevent/detailevent.component";
import { EventComponent } from "../event/event.component";

@Component({
  selector: "app-allevents",
  templateUrl: "./allevents.component.html",
  styleUrls: ["./allevents.component.scss"],
})
export class AlleventsComponent implements OnInit {
  constructor(
    private route: RouteService,
    public user: UserdataService,
    public cal: CalenderService,
    public mat: MatDialog
  ) {}

  ngOnInit() {
    this.route.setRoute("/allevents");
  }

  dialogComponent = DetaileventComponent;
  dialogComponent2 = EventComponent;
  selectedEvent: IEvent = this.cal.GET[0];

  openDialog(component: any): void {
    this.mat.open(component);
  }

  toDeleteObject(spcecificEvent: IEvent): void {
    const tempVal = spcecificEvent;
    console.log(tempVal);
    this.cal.DELETE(tempVal);
  }

  setSelected(selectedEvent: IEvent): void {
    this.selectedEvent = selectedEvent;
    this.cal.setSelected(selectedEvent);
  }

  clickedFunction(specificEvent: IEvent) {
    localStorage.setItem(
      "selectedValue",
      JSON.stringify(specificEvent).toString()
    );
    this.setSelected(specificEvent);
    this.openDialog(this.dialogComponent);
  }
}
