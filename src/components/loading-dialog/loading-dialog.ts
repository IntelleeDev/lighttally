import { Component } from '@angular/core';

/**
 * Generated class for the LoadingDialogComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loading-dialog',
  templateUrl: 'loading-dialog.html'
})
export class LoadingDialogComponent {

  text: string;

  constructor() {
    console.log('Hello LoadingDialogComponent Component');
    this.text = 'Hello World';
  }

}
