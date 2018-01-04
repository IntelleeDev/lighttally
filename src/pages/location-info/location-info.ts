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
  energyCompanies: Array<string> = ENERGY_COMPANIES;
  
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private formBuilder: FormBuilder, 
    private toastCtrl: ToastController,
    private popCtrl: PopoverController,
    private locRepository: LocationRepository,
    private contactRepository: ContactRepository
  ) {  
      this.createForm();
  }

  submit() {
    const data = this.getData();
    const location = data[0];
    const contact  = data[1];

    this.locRepository
        .store(location)
        .then(locId => { 
          contact['locationId'] = locId;
          this.contactRepository
              .store(contact)
              .then(() => {
                this.resetForm();
                this.presentToast('Location added successfully');
              })
              .catch(error => console.log(error));
        });
    this.toRoomPage();
  }

  presentPopover() {
    const popover = this.popCtrl.create(WorkTimeComponent);
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
      email: formModel.contactPerson.address,
      phoneNumber: formModel.contactPerson.phoneNumber,
      locationId: ''
    }

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
