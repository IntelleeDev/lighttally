import { Component } from '@angular/core';

/**
 * Generated class for the FinalizeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'finalize',
  templateUrl: 'finalize.html'
})
export class FinalizeComponent {

  text: string;

  constructor() {
    console.log('Hello FinalizeComponent Component');
    this.text = 'Hello World';
  }

}
