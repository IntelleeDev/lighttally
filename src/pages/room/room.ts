import { Component, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams, SegmentButton } from 'ionic-angular';

import { Room } from '../../model/room';
import { Fixture } from '../../model/fixture';
import { Replacement } from '../../model/replacement';

import { ReplacementComponent } from '../../components/replacement/replacement';
import { GeneralInfoComponent } from '../../components/general-info/general-info';
import { ExistingLightComponent } from '../../components/existing-light/existing-light';

import { CacheProvider } from '../../providers/cache/cache';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage implements AfterViewInit {
  
  @ViewChildren(SegmentButton) segmentButtons: QueryList<SegmentButton>;

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
    private cache: CacheProvider,
    public navCtrl: NavController) { 
      // Use this id to create a relationship with the evaluation
      const locationId = this.navParams.get('locationId');
  }

  ngAfterViewInit(): void {
    this.segmentButtons.first.isActive = true;
    this.highlightActiveSegment();
  }

  highlightActiveSegment() {
    this.segmentButtons.forEach(button => {
      if (parseInt(button.value) == this.slides.getActiveIndex()) {
        button.isActive = true;
      } else {
        button.isActive = false;
      }
    })
  }

  public goToSlide(index): void {
    this.showFinalizePage = false;
    this.slides.slideTo(index, 500);
    this.highlightActiveSegment();
  }

  public slideNext() {
    if (this.slides.isEnd()) {
      this.showFinalizePage = true;
      return;
    }
    this.slides.slideNext(300);
    this.highlightActiveSegment();
  }

  public slidePrev() {
    if (this.slides.isBeginning()) {
      this.backToLocationPage();
      return;
    }
    this.slides.slidePrev();
    this.highlightActiveSegment();
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
    this.addNewExistingLight();
    const room: Room = this.genInfoComponent.getData();
    this.evaluationData.push({
      room: room,
      fixtures: this.fixtures,
      replacements: this.replacements
    });

    this.cache.addItem('evaluation', this.evaluationData);
    console.log(this.cache.getItem('evaluation'));
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
