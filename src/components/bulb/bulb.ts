import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';

@Component({
  selector: 'bulb',
  templateUrl: 'bulb.html'
})
export class BulbComponent {

  public readonly data: Array<string> = [];

  constructor(private modalCtrl: ModalController) {}

  public openModal() {
    let modal = this.modalCtrl.create(BulbDialogComponent);
    modal.onDidDismiss(data => {
      this.addItem(data);
    })
    modal.present();
  }

  getData(): Array<string> {
    return new Array();
  }

  addItem(value: string) {
    this.data.push(value);
  }
}
