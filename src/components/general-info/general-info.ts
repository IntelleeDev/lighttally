import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { WorkTimeComponent } from '../work-time/work-time';

@Component({
  selector: 'general-info',
  templateUrl: 'general-info.html'
})
export class GeneralInfoComponent {
  
  constructor(private popCtrl: PopoverController) { }

  public presentPopover() {
    const popover = this.popCtrl.create(WorkTimeComponent);
    popover.present();
  }

}
