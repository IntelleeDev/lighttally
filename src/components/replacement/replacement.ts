import { Component } from '@angular/core';

@Component({
  selector: 'replacement',
  templateUrl: 'replacement.html'
})
export class ReplacementComponent {

  text: string;

  constructor() {
    console.log('Hello ReplacementComponent Component');
    this.text = 'Replacement component';
  }

}
