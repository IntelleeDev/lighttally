import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from '../../model/user';
import { UserRepository } from '../../repository/user-repository';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class RegistrationProvider {

  constructor(
    private storage: Storage,
    private fireAuth: AngularFireAuth,
    private userRepository: UserRepository) { }

  registerUser(user: User): Promise<any> {

    // To register the user 
    // Get the user's credentials
    // Store the user's email and password
    // Update the users' name and photoUrl
    // store extra attributes in the users' table in the firestore database
    return this.userRepository
               .store(user)
               .then(id => {
                 this.storage.set('userId', id)
               })
               .catch(error => error);
  }

}
