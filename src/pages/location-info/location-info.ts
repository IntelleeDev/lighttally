import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RoomPage } from '../room/room'

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

  goToRoomPage(): void {
    this.navCtrl.push(RoomPage, {});
  }

}
