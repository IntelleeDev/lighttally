import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Platform, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Bulb } from '../../model/bulb';
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
  public camera: Camera,
  private platform:Platform,
  private formBuilder: FormBuilder,
  private toastCtrl: ToastController) {
    this.createForm();
  }

  takeSnapShot() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.camera.getPicture(this.options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          this.fixtureImage = 'data:image/jpeg;base64,' + imageData;
         }, (error) => {
            this.presentToast(error);
         });
      });
    }
  } 

  private presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
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

    const fixture: Fixture = {
      image: this.fixtureImage ? this.fixtureImage: '',
      existingBulb: bulbFixture ? bulbFixture: {} as Bulb,
      wrongBulb: formModel.wrongBulb,
      balastType: formModel.balastType,
      numberOfBulbs: formModel.numOfBulbs,
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
