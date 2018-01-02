import { Component } from '@angular/core';

/**
 * Generated class for the WorkTimeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'work-time',
  templateUrl: 'work-time.html'
})
export class WorkTimeComponent {

  text: string;

  constructor() {
    console.log('Hello WorkTimeComponent Component');
    this.text = 'Hello World';
  }

}
