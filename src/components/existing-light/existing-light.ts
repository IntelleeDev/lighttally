import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';

@Component({
  selector: 'existing-light',
  templateUrl: 'existing-light.html'
})
export class ExistingLightComponent {

  existingBulb: string;

  readonly options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

constructor(
  private camera: Camera,
  private modalCtrl: ModalController) { }

  openBulbModal() {
    const bulbModal = this.modalCtrl.create(BulbDialogComponent);
    bulbModal.onDidDismiss(data => {
      this.existingBulb = data;
    })
    bulbModal.present();
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

}
