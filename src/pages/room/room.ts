import { Component, ViewChild } from '@angular/core';
import { Slides, Segment, IonicPage, NavController, NavParams } from 'ionic-angular';

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
  @ViewChild (Segment) segment: Segment;

  showFinalizePage = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  goToSlide(index): void {
    this.slides.slideTo(index, 500);
  }

  public slideNext() {
    if (this.slides.isEnd()) {
      this.showFinalizePage = true;
      return;
    }
    this.slides.slideNext(300);
  }

  public slidePrev() {
    if (this.slides.isBeginning()) {
      this.backToLocationPage();
      return;
    }
    this.slides.slidePrev();
  }

  backToLocationPage() {
    this.navCtrl.pop();
  }

}
