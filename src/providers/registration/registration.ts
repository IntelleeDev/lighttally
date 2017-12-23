import { Injectable } from '@angular/core';
import { FirestoreDataSourceProvider } from '../firestore-data-source/firestore-data-source';

import { User } from '../../model/user';

@Injectable()
export class RegistrationProvider {
  private collectionName = 'users';
  
  isWaiting = false;

  constructor(public fireStore: FirestoreDataSourceProvider<User>) {
    
  }

  registerUser(user: User) {
    this.fireStore.store(this.collectionName, user)
  }

  showSpinner() {
    this.isWaiting = true;
  }

  hideSpinner() {
    this.isWaiting = false;
  }
}
