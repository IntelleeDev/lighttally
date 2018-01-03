import { Component } from '@angular/core';

@Component({
  selector: 'work-time',
  templateUrl: 'work-time.html'
})
export class WorkTimeComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
