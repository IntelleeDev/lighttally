import { Component } from '@angular/core';

@Component({
  selector: 'existing-light',
  templateUrl: 'existing-light.html'
})
export class ExistingLightComponent {

  text: string;

  constructor() {
    console.log('Hello ExistingLightComponent Component');
    this.text = 'Existing light component';
  }

}
