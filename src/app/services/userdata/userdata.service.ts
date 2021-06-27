import { Injectable } from "@angular/core";
import { UserModel } from "src/app/models/data/userdata";
import {
  passwordModel,
  usernameModel,
} from "../../models/data/userdata";

@Injectable({
  providedIn: "root",
})
export class UserdataService {
  public dataIsNull = false;

  // Locally saved username and password
  private savedUsername: usernameModel = null;
  private savedPassword: passwordModel = null;

  hasAccount(): boolean {
    const tempVal = localStorage.getItem("username");
    if (tempVal != null) {
      return true;
    }
    return false;
  }

  // For getting username
  get fetchUsername(): string {
    return String(localStorage.getItem("username"));
  }

  // handles the sign up process
  public handleSignUp(data: UserModel): void {
    this.savedUsername = data.username;
    this.savedPassword = data.password;

    localStorage.setItem(
      "username",
      this.savedUsername.toString()
    );
    localStorage.setItem(
      "password",
      this.savedPassword.toString()
    );
  }

  public ngOnInit(): void {}
}
