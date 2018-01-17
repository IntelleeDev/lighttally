import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class EmailProvider {
  
  constructor(
    private platform: Platform,
    private email: EmailComposer) { }

  send(options: any = {}) {
    this.platform.ready().then(() => {
      this.email.isAvailable().then((available: boolean) => {
        if (available) {

        } 
      })
    });

    this.email.open(options);
  }

}
