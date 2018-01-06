import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Bulb } from '../../model/bulb';
import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';
import { BulbCategoryComponent } from '../bulb-category/bulb-category';

@Component({
  selector: 'bulb-selection',
  templateUrl: 'bulb-selection.html'
})
export class BulbSelectionComponent {
  
  @Input() public headTitle;
  
  indexCounter = 0;
  public data: Array<{number, Bulb}> = [];

  constructor(private modalCtrl: ModalController) {}

  public openModal() {
    let modal = this.modalCtrl.create(BulbCategoryComponent);
    modal.onDidDismiss((bulbArray: Array<any>) => {
      this.addItem(bulbArray);
    })
    modal.present();
  }

  addItem(value: Array<any>) {
    this.data = 
        this.data
            .concat(value)
            .map((data, index) => { return { id: index + 1, ...data } });
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
