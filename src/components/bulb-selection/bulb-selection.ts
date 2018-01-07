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

  private selectedBulb: Bulb;

  constructor(private modalCtrl: ModalController) { }

  openModal() {
    let modal = this.modalCtrl.create(BulbCategoryComponent);
    modal.onDidDismiss((bulb: Bulb) => {
      this.selectedBulb = bulb;
    })
    modal.present();
  }

  getSelectedBulb(): Bulb {
    return this.selectedBulb;
  }

  reset() {
    this.selectedBulb = null;
  }
}
