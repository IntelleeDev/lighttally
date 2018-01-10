import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from '../../model/user';

@Injectable()
export class PreferenceProvider {

  constructor(private storage: Storage) { }

  saveUser(user: User) {
    this.storage.set('authenticatedUser', user);
  }

  getUser(): Promise<User> {
    return this.storage.get('authenticatedUser').then(val => {
      return val as User;
    })
  }

}
