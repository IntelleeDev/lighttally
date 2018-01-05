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

  headTitle = 'Bulb Categories';
  data: Array<Bulb> = [];
  
  public categories: Array<{type: string, src: string}> = [];

  constructor(
    public viewCtrl: ViewController,
    private modalCtrl: ModalController) { 
    this.categories = BULB_CATEGORIES;
  }

  public openBulbDialog(category: any) {
    const modal = this.modalCtrl.create(BulbDialogComponent, { category });
    modal.onDidDismiss((selectedBulb: Bulb) => {
      this.addItem(selectedBulb);
      console.log(selectedBulb);
    })
    modal.present();
  }

  private addItem(bulb: Bulb) {
    this.data.push(bulb);
  }

  public dismissModal() {
    this.viewCtrl.dismiss(this.data);
  }
  
}
