import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DateRange } from "@angular/material/datepicker";
import { IEvent } from "src/app/models/event/event";
import { CalenderService } from "../../services/calender/calender.service";

@Component({
  selector: "app-detailevent",
  templateUrl: "./detailevent.component.html",
  styleUrls: ["./detailevent.component.scss"],
})
export class DetaileventComponent implements OnInit {
  constructor(public cal: CalenderService) {}

  minDate = new Date();
  thisMonth = this.minDate.getMonth();
  maxDate = new Date(new Date().getFullYear(), 11, 31);
  currentlySelected: IEvent = this.cal.whatIsSelected;

  ngOnInit() {
    this.currentlySelected = JSON.parse(
      String(localStorage.getItem("selectedValue"))
    );
    // this.range.setValue
  }

  getDateRange(): DateRange<Date> {
    const temp1 = new Date(this.cal.whatIsSelected.start.day);
    const temp2 = new Date(this.cal.whatIsSelected.stop.day);
    const val = new DateRange(temp1, temp2);
    return val;
  }

  // The form object
  range = new FormGroup({
    title: new FormControl(),
    start: new FormControl(),
    end: new FormControl(),
  });

  // Form submitted
  onSubmit(): void {
    const tempIEventInstance = JSON.parse(
      String(localStorage.getItem("selectedValue"))
    );
    tempIEventInstance.title = this.range.value.title;
    tempIEventInstance.start.day = this.range.value.start;
    tempIEventInstance.stop.day = this.range.value.end;
    this.cal.UPDATE(tempIEventInstance);
  }
}
