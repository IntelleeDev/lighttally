import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import { CacheProvider } from '../providers/cache/cache';

import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private cacheProvider: CacheProvider) {

    this.initializeApp();    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.authProvider
          .getAuthenticatedUser()
          .then(user => {
            if (user != null) {
              this.cacheProvider.addItem('user', user);
              this.nav.push(HomePage, {});
              this.splashScreen.hide();
            }
          })
          .catch(error => { console.log(error) })
    });
  }
}
