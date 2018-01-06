import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';

import { GeneralInfoComponent } from '../../components/general-info/general-info';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  @ViewChild (Slides) slides: Slides;
  @ViewChild (GeneralInfoComponent) genInfoComponent: GeneralInfoComponent;
  
  showFinalizePage = false;
  locationId: string = '';
  cache: Array<any> = [];
  
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
    this.addItem();
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

  addItem() {
    console.log(this.genInfoComponent.getData() + "meme");
  }


}
