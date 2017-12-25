import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignInPage } from '../pages/sign-in/sign-in';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { LocationInfoPage } from '../pages/location-info/location-info';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DashboardPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private authProvider: AuthProvider) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Make Evaluation', component: LocationInfoPage },
      { title: 'My Profile', component: MyProfilePage },
      { title: 'Logout', component: SignInPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.authProvider.getAuthenticatedUser() == null) {
        this.nav.push(SignInPage, {});
      }
    });
  }

  openPage(page) {
    if (page.title === "logout") {
      this.nav.push(SignInPage, {});
      return;
    }
    this.nav.setRoot(page.component);
  }
}
