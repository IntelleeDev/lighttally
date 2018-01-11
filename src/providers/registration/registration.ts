import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from '../../model/user';
import { UserRepository } from '../../repository/user-repository';

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
