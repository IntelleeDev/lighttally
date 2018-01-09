import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReplacementComponent } from '../../components/replacement/replacement';
import { GeneralInfoComponent } from '../../components/general-info/general-info';
import { ExistingLightComponent } from '../../components/existing-light/existing-light';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  @ViewChild (Slides) slides: Slides;
  @ViewChild (GeneralInfoComponent) genInfoComponent: GeneralInfoComponent;
  @ViewChild (ReplacementComponent) replacementComponent: ReplacementComponent;
  @ViewChild (ExistingLightComponent) existingLightComponent: ExistingLightComponent;

  showFinalizePage = false;
  roomData: Array<{Room, Fixture, Replacement}>;
  
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController) { }

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

  getDataFromChildren() {
    console.log(this.genInfoComponent.getData());
    console.log(this.replacementComponent.getData());
    console.log(this.existingLightComponent.getData());
  }

  public resetForms() {
    this.genInfoComponent.resetForm();
    if (this.replacementComponent) {
      this.replacementComponent.resetForm();
    }
    this.existingLightComponent.resetForm();
  }

}
