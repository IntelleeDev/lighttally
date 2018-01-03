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
    });
  }


  private computeTotalWorkHours() {
    const data = this.getData();

    data.reduce(() => {}, 0);
  }

  private getData(): Array<any> {
    const formModel = this.workTimeForm.value;
    console.log(formModel);

    const data = [];
    data[0] = { from: formModel.monday.monFrom, to: formModel.monday.to };
    data[1] = { from: formModel.tuesday.monFrom, to: formModel.tuesday.to };
    data[2] = { from: formModel.wednesday.monFrom, to: formModel.wednesday.to };
    data[3] = { from: formModel.thursday.monFrom, to: formModel.thursday.to };
    data[4] = { from: formModel.friday.monFrom, to: formModel.friday.to };

    return data;
  }

}
