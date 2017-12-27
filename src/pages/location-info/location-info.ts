import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RoomPage } from '../room/room';
import { DashboardPage } from '../dashboard/dashboard';

import { Contact } from '../../model/contact';
import { Location } from '../../model/location';

import { LocationRepository } from '../../repository/location-repository';

@IonicPage()
@Component({
  selector: 'page-location-info',
  templateUrl: 'location-info.html',
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
    public navCtrl: NavController, 
    public navParams: NavParams,
    private locRepository: LocationRepository) { }

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

    this.locRepository
        .store(location as Location)
        .then(() => this.toRoomPage());
  }

  toDashboardPage() {
    this.navCtrl.setRoot(DashboardPage);
  }

  private toRoomPage() {
    this.navCtrl.push(RoomPage, {});
  }

}
