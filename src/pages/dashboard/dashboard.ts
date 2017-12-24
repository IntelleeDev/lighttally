import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LocationInfoPage } from '../location-info/location-info'

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  items: Array<any>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [{
      name: 'Lucy Lu',
      location: 'Lagos',
      last_evaluation: '3',
      avatar_url: '../assets/imgs/bone.jpg'
    },
    {
      name: 'Lucy Lu',
      location: 'Lagos',
      last_evaluation: '3',
      avatar_url: '../assets/imgs/bone.jpg'
    }]
  }

  ionViewDidLoad() {
    
  }

  goToEvaluationPage(): void {
    this.navCtrl.setRoot(LocationInfoPage);
  }

}
