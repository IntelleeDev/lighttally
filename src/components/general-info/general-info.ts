import { Component } from '@angular/core';

@Component({
  selector: 'general-info',
  templateUrl: 'general-info.html'
})
export class GeneralInfoComponent {

  rooms: Array<String>;

  constructor() {
    this.rooms = ["Office", "Hall", "Shop", "Storage" ]
  }

}
