import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PopoverController } from 'ionic-angular';

import { WorkTimeComponent } from '../work-time/work-time';

@Component({
  selector: 'general-info',
  templateUrl: 'general-info.html'
})
export class GeneralInfoComponent {
  
  public genInfoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private popCtrl: PopoverController) { 
      
      this.createForm();
    }

  public presentPopover() {
    const popover = this.popCtrl.create(WorkTimeComponent);
    popover.present();
  }

  private createForm() {
    this.genInfoForm = this.formBuilder.group({
      hasLift: ['', Validators.required],
      roomName: ['', Validators.required],
      heightToFixtures: ['', Validators.required]
    })
  }

}
