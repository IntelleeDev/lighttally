import { Component } from '@angular/core';

@Component({
  selector: 'work-time',
  templateUrl: 'work-time.html'
})
export class WorkTimeComponent {

  daysOfWeek: Array<any>;

  constructor() {
    this.daysOfWeek = [
      { day: 'Monday', from: 'monFrom', to: 'monTo' },
      { day: 'Tuesday', from: 'tueFrom', to: 'tueTo' },
      { day: 'Wednesday', from: 'wedFrom', to: 'wedTo' },
      { day: 'Thursday', from: 'thuFrom', to: 'thuTo' },
      { day: 'Friday', from: 'friFrom', to: 'friTo' },
    ];

  }

}
