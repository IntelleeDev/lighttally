import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { RoomPage } from '../room/room';
import { DashboardPage } from '../dashboard/dashboard';

import { Contact } from '../../model/contact';
import { Location } from '../../model/location';

import { WORK_HOURS } from '../../data/constants';

import { Repository } from '../../repository/base';
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

  hours: Array<string>;
  
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
    private toastCtrl: ToastController,
    private locRepository: LocationRepository,
    private contactRepository: ContactRepository) {
      this.hours = ['Mon-Fri 6-5'];
    }

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
              .then(() => this.presentToast('Location added successfully'))
              .catch(error => console.log(error));
        });
  }

  toDashboardPage() {
    this.navCtrl.setRoot(DashboardPage);
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      this.toRoomPage();
    });
    toast.present();
  }

  private toRoomPage() {
    this.navCtrl.push(RoomPage, {});
  }

}
