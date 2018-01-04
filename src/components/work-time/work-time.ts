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
      { day: 'Saturday', from: 'satFrom', to: 'satTo' },
      { day: 'Sunday', from: 'sunFrom', to: 'sunTo' },
    ];

    this.createForm();
    this.workTimeForm.valueChanges.subscribe(this.getData.bind(this));
  }

  private createForm() {
    this.workTimeForm = this.formBuilder.group({
      monday: this.formBuilder.group({
        monFrom: '',
        monTo: ''
      }),
      tuesday: this.formBuilder.group({
        tueFrom: '',
        tueTo: ''
      }),
      wednesday: this.formBuilder.group({
        wedFrom: '',
        wedTo: ''
      }),
      thursday: this.formBuilder.group({
        thuFrom: '',
        thuTo: ''
      }),
      friday: this.formBuilder.group({
        friFrom: '',
        friTo: ''
      }),
      saturday: this.formBuilder.group({
        satFrom: '',
        satTo: ''
      }),
      sunday: this.formBuilder.group({
        sunFrom: '',
        sunTo: ''
      })
  });
  }

  private computeTotalWorkHours() {
    const data = this.getData();
    data.reduce(() => {}, 0);
  }

  private getData(): Array<any> {
    const formModel = this.workTimeForm.value;

    const data = [];
    data[0] = { from: formModel.monday['monFrom'],    to: formModel.monday['monTo'] };
    data[1] = { from: formModel.tuesday['tueFrom'],   to: formModel.tuesday['tuesTo'] };
    data[2] = { from: formModel.wednesday['wedFrom'], to: formModel.wednesday['wedTo'] };
    data[3] = { from: formModel.thursday['thuFrom'],  to: formModel.thursday['thuTo'] };
    data[4] = { from: formModel.friday['friFrom'],    to: formModel.friday['friTo'] };
    data[5] = { from: formModel.friday['satFrom'],    to: formModel.saturday['satTo'] };
    data[6] = { from: formModel.sunday['sunFrom'],    to: formModel.sunday['sunTo'] };

    return data;
  }

}
