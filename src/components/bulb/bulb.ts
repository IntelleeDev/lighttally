import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';
import { BulbCategoryComponent } from '../bulb-category/bulb-category';

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
    let modal = this.modalCtrl.create(BulbCategoryComponent);
    // modal.onDidDismiss(data => {
    //   this.addItem({ id: ++this.indexCounter, name: data });
    // })
    modal.present();
  }

  getData(): Array<string> {
    return new Array();
  }

  addItem(value: any) {
    this.data.push(value);
  }

  public removeItem(id: any) {
    this.data = this.data.filter((val:any, index) => {
      if (parseInt(id) == parseInt(val.id)) {
        return;
      }
      return val;
    })
  }
}
