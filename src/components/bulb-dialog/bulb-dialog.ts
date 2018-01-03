import { Component } from '@angular/core';

import { LightComponent } from '../light/light';
import { NavParams, ViewController, PopoverController } from 'ionic-angular';

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
    private popCtrl: PopoverController) {
      
    const category = params.get('category');
    this.bulbs = EXISTING_BULBS.filter(bulb => {
      if (bulb.category == category) {
        return bulb;
      }
    });
  }

  public presentPopover(bulbType: any) {
    const popover = this.popCtrl.create(LightComponent);
    popover.onDidDismiss(fixAttributes => {
      this.selectBulb({...fixAttributes, name: bulbType})
    });
    popover.present();
  }

  private selectBulb(bulbType: any) {
    this.viewCtrl.dismiss(bulbType);
  }
}
