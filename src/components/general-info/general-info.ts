import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Room } from '../../model/room';
import { WorkTimeComponent } from '../work-time/work-time';

@Component({
  selector: 'general-info',
  templateUrl: 'general-info.html'
})
export class GeneralInfoComponent {
  
  genInfoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private popCtrl: PopoverController
  ) {      
      this.createForm();
  }

  presentPopover() {
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

  getData() {
    const formModel = this.genInfoForm.value;

    const room: Room = {
      name: formModel.roomName,
      lift: formModel.hasLift,
      lightOccupiedHours: "",
      heightToFixtures: formModel.heightToFixtures
    }
    return room;
  }

  resetForm() {
    this.genInfoForm.reset()
  }

}
