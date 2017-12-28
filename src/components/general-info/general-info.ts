import { Component } from '@angular/core';

@Component({
  selector: 'general-info',
  templateUrl: 'general-info.html'
})
export class GeneralInfoComponent {

  workHours = [
    'MON 6-5',
    'TUE 6-5',
    'WED 6-5',
    'THUR 6-5',
    'FRI 6-5',
    'SAT 6-5'
  ];

  constructor() { }

}
