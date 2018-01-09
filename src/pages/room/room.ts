import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReplacementComponent } from '../../components/replacement/replacement';
import { GeneralInfoComponent } from '../../components/general-info/general-info';
import { ExistingLightComponent } from '../../components/existing-light/existing-light';

import { Room } from '../../model/room';
import { Fixture } from '../../model/fixture';
import { Replacement } from '../../model/replacement';

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
  evaluationData: Array<any> = [];

  fixtures: Array<Fixture> = [];
  replacements: Array<Replacement> = [];
  
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

  public addNewExistingLight() {
    this.addNewFixture();
    this.addNewReplacement();
  }

  public finishRoom() {
    this.slideNext();
    this.cacheEvaluation();
  }

  backToLocationPage() {
    this.navCtrl.pop();
  }

  private cacheEvaluation() {
    const room: Room = this.genInfoComponent.getData();
    this.addNewExistingLight();
    this.evaluationData.push({
      room: room,
      fixtures: this.fixtures,
      replacements: this.replacements
    });

    console.log(this.evaluationData);
    // Push to the cache
    // On our next visit we retrieve from the cache
    // and concat with the new entry
    // then push back into the cache
  }

  public resetForms() {
    this.genInfoComponent.resetForm();
    if (this.replacementComponent) {
      this.replacementComponent.resetForm();
    }
    this.existingLightComponent.resetForm();
    this.clearFixturesAndReplacements();
  }

  private addNewFixture() {
    if (this.replacementComponent) {
      this.fixtures = this.fixtures.concat([
        this.existingLightComponent.getData()
      ]);
    }
  }

  private addNewReplacement() {
    if (this.replacementComponent) {
      this.replacements = this.replacements.concat([
        this.replacementComponent.getData()
      ]);
    }
  }

  private clearFixturesAndReplacements() {
    this.fixtures = [];
    this.replacements = [];
  }

}
