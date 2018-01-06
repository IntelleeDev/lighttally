import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { User } from '../../model/user';
import { catchError, map, tap } from 'rxjs/operators';
import { UserRepository } from '../../repository/user-repository';

@Injectable()
export class AuthProvider {
  private authenticatedUser?: User = null;

  constructor(private repository: UserRepository) {}

  authenticateUser(userToAuth: User): Observable<boolean> {
    return this.repository
        .findByFilter([userToAuth.email, '==', this.authenticatedUser.email])
        .pipe(
          map(user => {
            if (user != null) {
              if (user.password === userToAuth.password) {
                this.authenticatedUser = user;
                return true;
              }
              return false;
            }
          })
        );
  }

  getAuthenticatedUser() {
    return this.authenticatedUser;
  }

}
