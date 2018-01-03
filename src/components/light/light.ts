import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { WATTAGE_METRICS } from '../../data/constants';

@Component({
  selector: 'light',
  templateUrl: 'light.html'
})
export class LightComponent {
  
  public retroFit: any = '';
  public wattage: string = '';
  public metrics: Array<any> = WATTAGE_METRICS[0].wattage;

  constructor(private viewCtrl: ViewController) { }

  public dismissPopover() {
    this.viewCtrl.dismiss({
      wattage: this.wattage,
      retroFit: this.retroFit
    });
  }

}
