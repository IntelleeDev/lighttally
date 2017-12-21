import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationInfoPage } from './location-info';

@NgModule({
  declarations: [
    LocationInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationInfoPage),
  ],
})
export class LocationInfoPageModule {}
