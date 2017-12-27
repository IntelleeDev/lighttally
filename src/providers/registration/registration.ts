import { Injectable } from '@angular/core';
import { FirestoreDataSourceProvider } from '../firestore-data-source/firestore-data-source';

import { User } from '../../model/user';

@Injectable()
export class RegistrationProvider {

  private collectionName = 'users';

  constructor(public fireStore: FirestoreDataSourceProvider<User>) {
    // This may not be the right way to go providing table names
    // But it temporary for now. The idea is to provide a unified
    // Interface that doesn't mirror any particular backing store
    // Technology.
    // Will change this to use angular's Injector for specifying
    // constructor parameters.
    this.fireStore.setCollectionName(this.collectionName);
   }

  registerUser(user: User): Promise<any> {
    return this.fireStore
               .store(user)
               .then(id => id); // Returns the id of the newly created document
  }

}
