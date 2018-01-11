import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { WATTAGE_METRICS } from '../../data/constants';

@Component({
  selector: 'light',
  templateUrl: 'light.html'
})
export class LightComponent {
  
  kalvin: number;
  retroFit: boolean;
  wattage: string = '';
  metrics: Array<any> = WATTAGE_METRICS[0].wattage;

  constructor(private viewCtrl: ViewController) { }

  public dismissPopover() {
    this.viewCtrl.dismiss({
      kavlin: this.kalvin,
      wattage: this.wattage,
      retrofit: this.retroFit
    });
  }

}
