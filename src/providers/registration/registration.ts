import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirestoreDataSourceProvider } from '../firestore-data-source/firestore-data-source';

import { User } from '../../model/user';
import { UserRepository } from '../../repository/user-repository';
import { PreferenceProvider } from '../../providers/preference/preference';

@Injectable()
export class RegistrationProvider {

  constructor(
    private storage: Storage,
    private userRepository: UserRepository) { }

  registerUser(user: User): Promise<any> {
    return this.userRepository
               .store(user)
               .then(id => {
                 this.storage.set('userId', id)
               })
               .catch(error => error);
  }

}
