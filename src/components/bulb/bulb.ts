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
    modal.onDidDismiss(data => {
      this.addItem(data);
    })
    modal.present();
  }

  addItem(value: any) {
    this.data = 
        this.data.concat(value)
                 .map((data, index) => {
                   return {
                     id: index + 1,
                     ...data
                   }
                 });
    console.log(this.data);
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
