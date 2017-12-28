import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RoomPage } from '../room/room';
import { DashboardPage } from '../dashboard/dashboard';

import { Contact } from '../../model/contact';
import { Location } from '../../model/location';

import { ContactRepository } from '../../repository/contact-repository';
import { LocationRepository } from '../../repository/location-repository';
import { FirestoreDataSourceProvider } from '../../providers/firestore-data-source/firestore-data-source';

@IonicPage()
@Component({
  selector: 'page-location-info',
  templateUrl: 'location-info.html',
  providers: [ 
      ContactRepository,
      LocationRepository
  ]
})
export class LocationInfoPage {
  
  // Location collection data
  address: string;
  kwhFiled: boolean;
  businessName: string;
  workingHours: string;
  accountNumber: number;
  squareFootage: number;
  electricCompany: string;

  // Contact collection data
  email: string;
  phoneNumber: string;
  contactPerson: string;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController, 
    private locRepository: LocationRepository,
    private contactRepository: ContactRepository) { }

  submit() {
    const location = {
      address: this.address,
      kwhFiled: this.kwhFiled,
      businessName: this.businessName,
      workingHours: this.workingHours,
      accountNumber: this.accountNumber,
      squareFootage: this.squareFootage,
      electricCompany: this.electricCompany
    } 

    const contact = {
      email: this.email,
      name: this.contactPerson,
      phoneNumber: this.phoneNumber
    }

    this.locRepository
        .store(location as Location)
        .then(locId => { 
          contact['locationId'] = locId;
          this.contactRepository
              .store(contact as Contact)
              .then(() => this.toRoomPage());
        });
  }

  toDashboardPage() {
    this.navCtrl.setRoot(DashboardPage);
  }

  private toRoomPage() {
    this.navCtrl.push(RoomPage, {});
  }

}
