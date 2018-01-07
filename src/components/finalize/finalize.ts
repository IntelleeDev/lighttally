import { Component, Input } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';

import { RoomPage } from '../../pages/room/room';
import { DashboardPage } from '../../pages/dashboard/dashboard';

@Component({
  selector: 'finalize',
  templateUrl: 'finalize.html'
})
export class FinalizeComponent {
  @Input() public toSlide;
  @Input() public resetAllForms;

  constructor(private navCtrl: NavController) { }

  doNewEvaluation() {
    this.resetAllForms();
    this.toSlide(0);
  }

  finishEvaluation() {
    this.navCtrl.popToRoot();
    this.navCtrl.setRoot(DashboardPage);
  }

}
