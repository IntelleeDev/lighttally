import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'work-time',
  templateUrl: 'work-time.html'
})
export class WorkTimeComponent {

  public daysOfWeek: Array<any>;
  public workTimeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.daysOfWeek = [
      { day: 'Monday', from: 'monFrom', to: 'monTo' },
      { day: 'Tuesday', from: 'tueFrom', to: 'tueTo' },
      { day: 'Wednesday', from: 'wedFrom', to: 'wedTo' },
      { day: 'Thursday', from: 'thuFrom', to: 'thuTo' },
      { day: 'Friday', from: 'friFrom', to: 'friTo' },
    ];
    this.createForm();
  }

  private createForm() {
    this.workTimeForm = this.formBuilder.group({
      Monday: this.formBuilder.group({}),
      Tuesday: this.formBuilder.group({}),
      Wednesday: this.formBuilder.group({}),
      Thursday: this.formBuilder.group({}),
      Friday: this.formBuilder.group({}),
    });
  }

}
