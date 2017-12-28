import { Component } from '@angular/core';

/**
 * Generated class for the BulbDialogComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bulb-dialog',
  templateUrl: 'bulb-dialog.html'
})
export class BulbDialogComponent {

  text: string;

  constructor() {
    console.log('Hello BulbDialogComponent Component');
    this.text = 'Hello World';
  }

}
