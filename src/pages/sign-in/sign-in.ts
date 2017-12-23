import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { MyApp } from '../../app/app.component';
import { SignUpPage } from '../sign-up/sign-up';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  email: string;
  password: string;
  isAuthenticating = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider) {
  }
  
  authenticateUser(): void {
    if (!this.inputsValidated()) {
      return;
    }

    this.showSpinner();
    this.authProvider
        .authenticateUser(this.email, this.password)
        .subscribe(authenticated => {
          if (authenticated) {
            this.toHomePage()
            this.hideSpinner()
          } else {
            this.hideSpinner()
          }
        })
  }

  toHomePage(): void {
    this.navCtrl.goToRoot({});
  }

  toSignUpPage(): void {
    this.navCtrl.push(SignUpPage, {});
  }

  showSpinner() {
    this.isAuthenticating = true;
  }

  hideSpinner() {
    this.isAuthenticating = false;
  }

  inputsValidated() {
    return (this.email != null && this.password != null);
  }

}
