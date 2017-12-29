import { Component, Input } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';

import { RoomPage } from '../../pages/room/room';
import { DashboardPage } from '../../pages/dashboard/dashboard';

@Component({
  selector: 'finalize',
  templateUrl: 'finalize.html'
})
export class FinalizeComponent {
  @Input() public toFirst;

  constructor(private navCtrl: NavController) { }

  doNewEvaluation() {
    this.toFirst(0);
  }

  finishEvaluation() {
    this.navCtrl.popToRoot();
    this.navCtrl.setRoot(DashboardPage);
  }

}
