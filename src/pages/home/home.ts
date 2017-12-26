import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavParams } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';
import { DashboardPage } from '../dashboard/dashboard';
import { MyProfilePage } from '../my-profile/my-profile';
import { LocationInfoPage } from '../location-info/location-info';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = DashboardPage;
  pages: Array<{title: string, component: any}>;

  constructor(public navParams: NavParams) {
    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Make Evaluation', component: LocationInfoPage },
      { title: 'My Profile', component: MyProfilePage },
      { title: 'Logout', component: SignInPage }
    ];
  }

  openPage(page) {
    if (page.title === "logout") {
      this.nav.push(SignInPage, {});
      return;
    }
    this.nav.setRoot(page.component);
  }

}
