import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../model/user';
import { RegistrationProvider } from '../../providers/registration/registration';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  email: string = '';
  fullname: string = '';
  password: string = '';
  phoneNumber: string = '';
  isWaiting = false;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private regProvider: RegistrationProvider) {
  }

  registerUser() {
    this.showSpinner();

    const data = {
      email: this.email, 
      fullname: this.fullname,
      password: this.password, 
      phoneNumber: this.phoneNumber
    } as User;

    this.regProvider
      .registerUser(data)
      .then(() => {
        this.hideSpinner()
        this.backToSignInPage()
      });
  }

  backToSignInPage() {
    this.navCtrl.pop();
  }

  showSpinner() {
    this.isWaiting = true;
  }

  hideSpinner() {
    this.isWaiting = false;
  }

}
