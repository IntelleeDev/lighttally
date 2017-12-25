import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { catchError, map, tap } from 'rxjs/operators';
import { FirestoreDataSourceProvider } from '../firestore-data-source/firestore-data-source';
import { User } from '../../model/user';

@Injectable()
export class AuthProvider {
  private collectionName = 'users';

  private authenticatedUser?: User = null;

  constructor(private fireStore: FirestoreDataSourceProvider<User>) {
    this.fireStore.setCollectionName(this.collectionName);
  }

  authenticateUser(userToAuth: User): Observable<boolean> {
    return this.fireStore
      .findByFilter(['email', userToAuth.email], '==')
      .pipe(
        map(users => {
          let user = users[0];
          if (user != null) {
            if (user.password === userToAuth.password) {
              this.authenticatedUser = user;
              return true;
            }
            return false;
          }
        })
      )
  }

  getAuthenticatedUser() {
    return this.authenticatedUser;
  }

}
