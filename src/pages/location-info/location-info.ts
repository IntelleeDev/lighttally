import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';

import { RoomPage } from '../room/room';
import { DashboardPage } from '../dashboard/dashboard';
import { WorkTimeComponent } from '../../components/work-time/work-time';

import { Contact } from '../../model/contact';
import { Location } from '../../model/location';

import { ENERGY_COMPANIES } from '../../data/constants';

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

  locationForm: FormGroup;
  hours: Array<string>;
  energyCompanies: Array<string> = ENERGY_COMPANIES;
  
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
    private formBuilder: FormBuilder, 
    private toastCtrl: ToastController,
    private popCtrl: PopoverController,
    private locRepository: LocationRepository,
    private contactRepository: ContactRepository) {
      this.hours = ['Mon-Fri 6-5'];
    }

  private createForm() {
    this.locationForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      address: ['', Validators.required],
      accountNumber: ['', Validators.required],
      kwhFiled: ['', Validators.required],
      squareFootage: ['', Validators.required],
      contactPerson: this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.email],
        phoneNumber: ['', Validators.required]
      })
    });
  }

  submit() {
    // this.locRepository
    //     .store(location as Location)
    //     .then(locId => { 
    //       contact['locationId'] = locId;
    //       this.contactRepository
    //           .store(contact as Contact)
    //           .then(() => this.presentToast('Location added successfully'))
    //           .catch(error => console.log(error));
    //     });
    this.toRoomPage();
  }

  presentPopover() {
    const popover = this.popCtrl.create(WorkTimeComponent);
    popover.present();
  }

  toDashboardPage() {
    this.navCtrl.setRoot(DashboardPage);
  }

  private presentToast(message: string) {
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
