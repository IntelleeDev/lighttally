import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, IonicPage, NavParams } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';
import { DashboardPage } from '../dashboard/dashboard';
import { MyProfilePage } from '../my-profile/my-profile';
import { LocationInfoPage } from '../location-info/location-info';
import { PreferenceProvider } from '../../providers/preference/preference';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = DashboardPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController,
    private preference: PreferenceProvider) {
    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Make Evaluation', component: LocationInfoPage },
      { title: 'My Profile', component: MyProfilePage },
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  toLogoutPage() {
    this.navCtrl.pop();
  }

  logoutUser() {
    this.preference
        .clear()
        .then(() => this.toLogoutPage())
        .catch(error => error);
  }

}
