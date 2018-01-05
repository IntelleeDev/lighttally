import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';

import { RoomPage } from '../room/room';
import { DashboardPage } from '../dashboard/dashboard';
import { WorkTimeComponent } from '../../components/work-time/work-time';

import { Contact } from '../../model/contact';
import { Location } from '../../model/location';

import { ENERGY_COMPANIES } from '../../data/constants';
import { ContactRepository } from '../../repository/contact-repository';
import { LocationRepository } from '../../repository/location-repository';

@IonicPage()
@Component({
  selector: 'page-location-info',
  templateUrl: 'location-info.html',
  providers: [ ContactRepository, LocationRepository ]
})
export class LocationInfoPage {

  locationForm: FormGroup;
  energyCompanies: Array<string> = ENERGY_COMPANIES;
  
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private formBuilder: FormBuilder, 
    private popCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private locRepository: LocationRepository
  ) {  
      this.createForm();
  }

  submit() {
    const loader = this.presentLoader();
    
    const data = this.getData();
    const location = data[0];
    const contact  = data[1];

    this.locRepository
        .storeWithContact(location, contact)
        .then((locationId) => {
          this.resetForm();
          loader.dismiss();
          this.toRoomPage({ locationId });          
        })
        .catch(error => console.log(error));
  }

  presentPopover() {
    const popover = this.popCtrl.create(
      WorkTimeComponent, 
      {}, 
      { enableBackdropDismiss: false 
    });
    popover.present();
  }

  toDashboardPage() {
    this.navCtrl.setRoot(DashboardPage);
  }

  private getData(): Array<any> {
    const formModel = this.locationForm.value;

    const location: Location = {
      businessName: formModel.businessName,
      address: formModel.address,
      energyCompany: formModel.energyCompany,
      accountNumber: formModel.accountNumber,
      kwhFiled: formModel.kwhFiled,
      squareFootage: formModel.squareFootage,
      workingHours: formModel['workingHours'] ? formModel.workingHours : ''
    };

    const contact: Contact = {
      name: formModel.contactPerson.name,
      email: formModel.contactPerson.email,
      phoneNumber: formModel.contactPerson.phoneNumber,
      locationId: ''
    };

    return [location, contact];
  }

  private createForm() {
    this.locationForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      address: ['', Validators.required],
      energyCompany: ['', Validators.required],
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

  private resetForm() {
    this.locationForm.reset();
  }

  private presentLoader() {
    const loader = this.loadingCtrl.create({
      content: 'Please wait',
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });
    loader.present();
    return loader;
  }

  private toRoomPage(params: any) {
    this.navCtrl.push(RoomPage, params);
  }

  // Form control getters
  get businessName() { return this.locationForm.get('businessName'); }
  get address() { return this.locationForm.get('address'); }
  get energyCompany() { return this.locationForm.get('energyCompany'); }
  get accountNumber() { return this.locationForm.get('accountNumber'); }
  get kwhFiled() { return this.locationForm.get('kwhFiled'); }
  get squareFootage() { return this.locationForm.get('squareFootage'); }
  get name() { return this.locationForm.get('contactPerson').get('name'); }
  get email() { return this.locationForm.get('contactPerson').get('email'); }
  get phoneNumber() { return this.locationForm.get('contactPerson').get('phoneNumber'); }
}
