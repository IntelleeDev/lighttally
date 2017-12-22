import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { RoomPage } from '../pages/room/room';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { LocationInfoPage } from '../pages/location-info/location-info';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ReplacementComponent } from '../components/replacement/replacement';
import { GeneralInfoComponent } from '../components/general-info/general-info';
import { ExistingLightComponent } from '../components/existing-light/existing-light';

import { firebaseConfig } from '../config/firebaseConfig';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    RoomPage,
    SignInPage,
    SignUpPage,
    DashboardPage,
    MyProfilePage,
    LocationInfoPage,
    ReplacementComponent,
    GeneralInfoComponent,
    ExistingLightComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RoomPage,
    SignInPage,
    SignUpPage,
    DashboardPage,
    MyProfilePage,
    LocationInfoPage,
    ReplacementComponent,
    GeneralInfoComponent,
    ExistingLightComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
