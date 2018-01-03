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
    this.workTimeForm.valueChanges.subscribe(this.getData.bind(this));
  }

  private createForm() {
    this.workTimeForm = this.formBuilder.group({
      Monday: this.formBuilder.group({
        monFrom: '',
        monTo: ''
      }),
      Tuesday: this.formBuilder.group({
        tueFrom: '',
        tueTo: ''
      }),
      Wednesday: this.formBuilder.group({
        wedFrom: '',
        wedTo: ''
      }),
      Thursday: this.formBuilder.group({
        thuFrom: '',
        thuTo: ''
      }),
      Friday: this.formBuilder.group({
        friFrom: '',
        friTo: ''
      }),
    });
  }


  private computeTotalWorkHours() {
    const data = this.getData();

    data.reduce(() => {}, 0);
  }

  private getData(): Array<any> {
    const formModel = this.workTimeForm.value;

    for (let val of formModel) {
      alert(val);
    }

    const data = [];
    data[0] = { from: formModel.Monday.monFrom, to: formModel.Monday.to };
    data[1] = { from: formModel.Monday.monFrom, to: formModel.Monday.to };
    data[2] = { from: formModel.Monday.monFrom, to: formModel.Monday.to };
    data[3] = { from: formModel.Monday.monFrom, to: formModel.Monday.to };
    data[4] = { from: formModel.Monday.monFrom, to: formModel.Monday.to };

    return data;
  }

}
