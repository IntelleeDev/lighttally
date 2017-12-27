import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RoomPage } from '../room/room';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-location-info',
  templateUrl: 'location-info.html',
})
export class LocationInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationInfoPage');
  }

  toDashboardPage() {
    this.navCtrl.setRoot(DashboardPage);
  }

  toRoomPage() {
    this.navCtrl.push(RoomPage, {});
  }

}
