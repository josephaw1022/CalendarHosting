import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserdataService } from "../../services/userdata/userdata.service";

@Component({
  selector: "app-signupform",
  templateUrl: "./signupform.component.html",
  styleUrls: ["./signupform.component.scss"],
})
export class SignupformComponent {
  constructor(
    public fb: FormBuilder,
    public user: UserdataService,
    private route: Router
  ) {}

  signupForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  public hideForm: boolean = false;

  onSubmit(): void {
    this.hideForm = true;
    this.user.handleSignUp({
      username: this.signupForm.controls["username"].value,
      password: this.signupForm.controls["password"].value,
    });

    const firstSessionValue = {
      firstTime: false,
    };

    localStorage.setItem(
      "firstSession",
      JSON.stringify(firstSessionValue)
    );

    this.route.navigate(["../calendar"]);
  }
}
