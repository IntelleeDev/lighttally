import { Injectable } from '@angular/core';
import { FirestoreDataSourceProvider } from '../firestore-data-source/firestore-data-source';

import { User } from '../../model/user';

@Injectable()
export class RegistrationProvider {

  private collectionName = 'users';

  constructor(public fireStore: FirestoreDataSourceProvider<User>) { }

  registerUser(user: User): Promise<any> {
    return this.fireStore
               .store(this.collectionName, user)
               .then(id => id); // Returns the id of the newly created document
  }

}
