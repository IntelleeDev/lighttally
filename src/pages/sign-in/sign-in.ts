import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  toHomePage(): void {
    this.navCtrl.goToRoot({});
  }

  toSignUpPage(): void {
    this.navCtrl.push(SignUpPage, {});
  }
}
