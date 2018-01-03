import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';

import { BULB_CATEGORIES } from '../../data/constants';
import { BulbDialogComponent } from '../bulb-dialog/bulb-dialog';

@Component({
  selector: 'bulb-category',
  templateUrl: 'bulb-category.html'
})
export class BulbCategoryComponent {

  headTitle = 'Bulb Categories';
  data: Array<{string}> = [];
  
  public categories: Array<{type: string, src: string}> = [];

  constructor(
    public viewCtrl: ViewController,
    private modalCtrl: ModalController) { 
    this.categories = BULB_CATEGORIES;
  }

  public openBulbDialog(category: any) {
    const modal = this.modalCtrl.create(BulbDialogComponent, { category });
    modal.onDidDismiss(data => {
      this.addItem({ fixture: data });
      console.log(data);
    })
    modal.present();
  }

  private addItem(value: any) {
    this.data.push(value);
  }

  public dismissModal() {
    this.viewCtrl.dismiss(this.data);
  }
  
}
