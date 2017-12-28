import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { EXISTING_BULBS } from '../../data/bulbs';

@Component({
  selector: 'bulb-dialog',
  templateUrl: 'bulb-dialog.html'
})
export class BulbDialogComponent {

  bulbs: any = EXISTING_BULBS;

  constructor(public viewCtrl: ViewController) { }

  selectBulb(bulbType: any) {
    this.viewCtrl.dismiss(bulbType);
  }

}
