import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';

import { Bulb } from '../../model/bulb';
import { BULB_CATEGORIES } from '../../data/constants';
import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';

@Component({
  selector: 'bulb-category',
  templateUrl: 'bulb-category.html'
})
export class BulbCategoryComponent {

  selectedBulb: Bulb;
  headTitle = 'Bulb Categories';
  
  public categories: Array<{type: string, src: string}> = [];

  constructor(
    public viewCtrl: ViewController,
    private modalCtrl: ModalController) { 
    this.categories = BULB_CATEGORIES;
  }

  public openBulbDialog(category: any) {
    const modal = this.modalCtrl.create(BulbDialogComponent, { category });
    modal.onDidDismiss((selectedBulb: Bulb) => {
      this.selectedBulb = selectedBulb;
    })
    modal.present();
  }

  public dismissModal() {
    this.viewCtrl.dismiss(this.selectedBulb);
  }
  
}
