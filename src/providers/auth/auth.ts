import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { catchError, map, tap } from 'rxjs/operators';
import { FirestoreDataSourceProvider } from '../firestore-data-source/firestore-data-source';
import { User } from '../../model/user';

@Injectable()
export class AuthProvider {

  private authenticatedUser: User;

  constructor(private fireStore: FirestoreDataSourceProvider<User>) {
    
  }

  authenticateUser(email: string, password: string): Observable<boolean> {
    return this.fireStore
      .findByFilter('users', ['email', '==', email])
      .pipe(
        map(users => {
          let user = users[0];
          if (user != null) {
            if (user.password === password) {
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
