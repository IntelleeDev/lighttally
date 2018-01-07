import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'loading-dialog',
  templateUrl: 'loading-dialog.html'
})
export class LoadingDialogComponent {

  message: string;

  constructor(private navParams: NavParams) {
    this.message = navParams.get('message');
  }

}
