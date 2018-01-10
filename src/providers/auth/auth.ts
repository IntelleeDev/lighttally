import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { User } from '../../model/user';
import { catchError, map, tap } from 'rxjs/operators';
import { UserRepository } from '../../repository/user-repository';
import { PreferenceProvider } from '../../providers/preference/preference';

@Injectable()
export class AuthProvider {

  constructor(
    private repository: UserRepository,
    private preference: PreferenceProvider) {}

  authenticateUser(userToAuth: User): Observable<boolean> {
    return this.repository
        .findByFilter(['email', '==', userToAuth.email])
        .pipe(
          map(user => {
            if (user != null) {
              if (user.password === userToAuth.password) {
                this.preference.saveUser(user);
                return true;
              }
              return false;
            }
          })
        );
  }

  getAuthenticatedUser() {
    return this.preference
               .getUser()
               .then(user => user)
               .catch(error => error);
  }

}
