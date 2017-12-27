import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LocationInfoPage } from '../location-info/location-info'

import { User } from '../../model/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  items: Array<any>;
  authUser: User;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider) {
    
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
    }];

    this.authUser = this.authProvider.getAuthenticatedUser();
    console.log(this.authUser);
  }

  goToEvaluationPage(): void {
    this.navCtrl.setRoot(LocationInfoPage);
  }

}
