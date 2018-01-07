import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Fixture } from '../../model/fixture';

import { BALLAST_TYPES } from '../../data/constants';
import { BulbSelectionComponent } from '../bulb-selection/bulb-selection';

@Component({
  selector: 'existing-light',
  templateUrl: 'existing-light.html'
})
export class ExistingLightComponent {

  @ViewChild(BulbSelectionComponent) bulbSelection: BulbSelectionComponent;

  fixtureImage: string;
  existingLightForm: FormGroup;
  
  title = 'Existing Bulb';
  balastTypes: Array<string> = BALLAST_TYPES;

  readonly options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

constructor(
  private camera: Camera,
  private formBuilder: FormBuilder,
  private toastCtrl: ToastController
  ) {
    this.createForm();
  }

  takeSnapShot() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.fixtureImage = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
        this.presentToast();
     });
  } 

  private presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Camera error',
      duration: 3000
    });
    toast.present();
  }

  private createForm() {
    this.existingLightForm = this.formBuilder.group({
      numOfFixtures: ['', Validators.required],
      balastType: ['', Validators.required],
      numOfBulbs: ['', Validators.required],
      wrongBulb: ['', Validators.required]
    });
  }

  getData() {
    const bulbFixture = this.bulbSelection.getSelectedBulb();
    const formModel = this.existingLightForm.value;

    console.log(bulbFixture);

    const fixture: Fixture = {
      image: this.fixtureImage ? this.fixtureImage: '',
      existingBulb: bulbFixture,
      wrongBulb: formModel.wrongBulb,
      balastType: formModel.balastType,
      numberOfBulbs: formModel.numberOfBulbs,
      numberOfFixtures: formModel.numOfFixtures
    }
    return fixture;
  }

  resetForm() {
    this.fixtureImage = '';
    this.bulbSelection.reset();
    this.existingLightForm.reset();
  }  

}
