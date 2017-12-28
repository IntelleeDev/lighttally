import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'bulb-dialog',
  templateUrl: 'bulb-dialog.html'
})
export class BulbDialogComponent {

  constructor(public viewCtrl: ViewController) { }

  selectBulb(bulbType: any) {
    this.viewCtrl.dismiss(bulbType);
  }

}
