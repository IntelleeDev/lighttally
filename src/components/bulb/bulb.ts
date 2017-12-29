import { Component } from '@angular/core';

@Component({
  selector: 'bulb',
  templateUrl: 'bulb.html'
})
export class BulbComponent {

  data: Map<string, string>;

  constructor() {}

  getData(): Array<string> {
    return new Array();
  }

}
