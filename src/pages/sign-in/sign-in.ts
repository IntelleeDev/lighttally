import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { SignUpPage } from '../sign-up/sign-up';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  email: String;
  password: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    
  }

  authenticateUser(): void {
    console.log(`${this.email} ${this.password}`)
  }

  toHomePage(): void {
    this.navCtrl.goToRoot({});
  }

  toSignUpPage(): void {
    this.navCtrl.push(SignUpPage, {});
  }
}
