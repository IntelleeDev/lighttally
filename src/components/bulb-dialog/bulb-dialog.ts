import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

import { EXISTING_BULBS } from '../../data/constants';

@Component({
  selector: 'bulb-dialog',
  templateUrl: 'bulb-dialog.html'
})
export class BulbDialogComponent {

  bulbs: Array<any>;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController
  ) {
    const category = params.get('category');
    this.bulbs = EXISTING_BULBS.filter(bulb => {
      if (bulb.category == category) {
        return bulb;
      }
    });
  }

  selectBulb(bulbType: any) {
    this.viewCtrl.dismiss(bulbType);
  }
}
