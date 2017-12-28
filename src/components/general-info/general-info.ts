import { Component } from '@angular/core';
import { WORK_HOURS } from '../../data/constants';
@Component({
  selector: 'general-info',
  templateUrl: 'general-info.html'
})
export class GeneralInfoComponent {

  workHours: Array<string> = WORK_HOURS;
  
  constructor() { }

}
