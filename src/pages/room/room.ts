import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReplacementComponent } from '../../components/replacement/replacement';
import { ExistingLightComponent } from '../../components/existing-light/existing-light';
import { GeneralInfoComponent } from '../../components/general-info/general-info';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  @ViewChild (Slides) slides: Slides;

  general = GeneralInfoComponent;
  existingLight = ExistingLightComponent;
  replacement = ReplacementComponent;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  
  }

  goToSlide(index): void {
    this.slides.slideTo(index, 500);
  }

}
