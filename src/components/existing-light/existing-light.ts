import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { BALLAST_TYPES } from '../../data/constants';
import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';

@Component({
  selector: 'existing-light',
  templateUrl: 'existing-light.html'
})
export class ExistingLightComponent {

  title = 'Existing Bulb';
  existingLightForm: FormGroup;
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
  private modalCtrl: ModalController
  ) {
    this.createForm();
  }

  takeSnapShot() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
     }, (err) => {
      // Handle error
     });
  } 

  private createForm() {
    this.existingLightForm = this.formBuilder.group({
      numOfFixtures: ['', Validators.required],
      balastType: ['', Validators.required],
      numOfBulbs: ['', Validators.required],
      wrongBulb: ['', Validators.required]
    });
  }

}
