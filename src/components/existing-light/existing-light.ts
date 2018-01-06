import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { BALLAST_TYPES } from '../../data/constants';
import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';
import { Fixture } from '../../model/fixture';

@Component({
  selector: 'existing-light',
  templateUrl: 'existing-light.html'
})
export class ExistingLightComponent {

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
  private modalCtrl: ModalController,
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
      numOfBulbs: ['', Validators.required]
    });
  }

  getData() {
    const formModel = this.existingLightForm.value;

    const fixture: Fixture = {
      image: this.fixtureImage ? this.fixtureImage: '',
      balastType: formModel.balastType,
      numberOfBulbs: formModel.numberOfBulbs,
      numberOfFixtures: formModel.numOfFixtures
    }
    return fixture;
  }

}
