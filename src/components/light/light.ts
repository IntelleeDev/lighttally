import { Component } from '@angular/core';

/**
 * Generated class for the LightComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'light',
  templateUrl: 'light.html'
})
export class LightComponent {

  text: string;

  constructor() {
    console.log('Hello LightComponent Component');
    this.text = 'Hello World';
  }

}
