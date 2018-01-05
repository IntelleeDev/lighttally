import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  @ViewChild (Slides) slides: Slides;
  showFinalizePage = false;
  locationId: string = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.locationId = navParams.get('locationId');
  }

  public goToSlide(index): void {
    this.showFinalizePage = false;
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
