import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoomPage } from '../pages/room/room';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { LocationInfoPage } from '../pages/location-info/location-info';

import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BulbDialogComponent } from '../components/bulb-dialog/bulb-dialog';
import { ReplacementComponent } from '../components/replacement/replacement';
import { GeneralInfoComponent } from '../components/general-info/general-info';
import { ExistingLightComponent } from '../components/existing-light/existing-light';

import { firebaseConfig } from '../config/firebaseConfig';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LocationInfoPageModule } from '../pages/location-info/location-info.module';

import { AuthProvider } from '../providers/auth/auth';
import { RegistrationProvider } from '../providers/registration/registration';
import { FirestoreDataSourceProvider } from '../providers/firestore-data-source/firestore-data-source';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RoomPage,
    SignInPage,
    SignUpPage,
    DashboardPage,
    MyProfilePage,
    LocationInfoPage,
    BulbDialogComponent,
    ReplacementComponent,
    GeneralInfoComponent,
    ExistingLightComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoomPage,
    SignInPage,
    SignUpPage,
    DashboardPage,
    MyProfilePage,
    LocationInfoPage,
    BulbDialogComponent,
    ReplacementComponent,
    GeneralInfoComponent,
    ExistingLightComponent
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    RegistrationProvider,
    FirestoreDataSourceProvider
  ]
})
export class AppModule {}
