import { Component } from '@angular/core';

@Component({
  selector: 'general-info',
  templateUrl: 'general-info.html'
})
export class GeneralInfoComponent {

  workHours: Array<string> = [];
  
  constructor() { }

}
