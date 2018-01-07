import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoomPage } from '../pages/room/room';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { LocationInfoPage } from '../pages/location-info/location-info';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LightComponent } from '../components/light/light';
import { FinalizeComponent } from '../components/finalize/finalize';
import { WorkTimeComponent } from '../components/work-time/work-time';
import { BulbDialogComponent } from '../components/bulb-dialog/bulb-dialog';
import { ReplacementComponent } from '../components/replacement/replacement';
import { GeneralInfoComponent } from '../components/general-info/general-info';
import { BulbCategoryComponent } from '../components/bulb-category/bulb-category';
import { ExistingLightComponent } from '../components/existing-light/existing-light';
import { BulbSelectionComponent } from '../components/bulb-selection/bulb-selection';

import { firebaseConfig } from '../config/firebaseConfig';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LocationInfoPageModule } from '../pages/location-info/location-info.module';

import { UserRepository } from '../repository/user-repository';
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
    LightComponent,
    WorkTimeComponent,
    FinalizeComponent,
    BulbDialogComponent,
    ReplacementComponent,
    GeneralInfoComponent,
    BulbCategoryComponent,
    ExistingLightComponent,
    BulbSelectionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
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
    LightComponent,
    WorkTimeComponent,
    FinalizeComponent,
    BulbDialogComponent,
    ReplacementComponent,
    GeneralInfoComponent,
    BulbCategoryComponent,
    ExistingLightComponent,
    BulbSelectionComponent
  ],
  providers: [
    File,
    FileOpener,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserRepository,
    RegistrationProvider,
    FirestoreDataSourceProvider
  ]
})
export class AppModule {}
