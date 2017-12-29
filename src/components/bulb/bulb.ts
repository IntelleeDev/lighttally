import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';

@Component({
  selector: 'bulb',
  templateUrl: 'bulb.html'
})
export class BulbComponent {
  
  @Input() public headTitle;
  
  indexCounter = 0;
  public data: Array<{number, string}> = [];

  constructor(private modalCtrl: ModalController) {}

  public openModal() {
    let modal = this.modalCtrl.create(BulbDialogComponent);
    modal.onDidDismiss(data => {
      this.addItem({ id: ++this.indexCounter, name: data });
    })
    modal.present();
  }

  getData(): Array<string> {
    return new Array();
  }

  addItem(value: any) {
    this.data.push(value);
  }

  public removeItem(id: number) {
    this.data = this.data.filter((val:any, index) => {
      if (index == val.id) {
        return;
      }
      return val;
    })
  }
}
