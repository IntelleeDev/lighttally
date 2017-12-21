import { Component } from '@angular/core';

@Component({
  selector: 'general-info',
  templateUrl: 'general-info.html'
})
export class GeneralInfoComponent {

  text: string;

  constructor() {
    console.log('Hello GeneralInfoComponent Component');
    this.text = 'General infomation component';
  }

}
