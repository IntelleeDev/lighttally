import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationInfoPage } from './location-info';

import { LocationRepository } from '../../repository/location-repository';
import { FirestoreDataSourceProvider } from '../../providers/firestore-data-source/firestore-data-source';

@NgModule({
  declarations: [
    LocationInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationInfoPage),
  ],
  providers: [ 
    {
      provide: LocationRepository, useValue: FirestoreDataSourceProvider
    }
  ]
})
export class LocationInfoPageModule {}
