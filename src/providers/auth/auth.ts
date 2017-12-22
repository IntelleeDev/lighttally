import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../model/user';

@Injectable()
export class AuthProvider {

  private authenticatedUser: User;

  constructor(private fireStore: AngularFirestore) {
    
  }

  authenticateUser(email: string, password: string): boolean {
    console.log(this.getUser(email, password))
    return true;
  }

  private getUser(email: string, password: string) {
    return this.fireStore
      .collection('users', ref => 
        ref.where('email', '==', email)
           .where('password', '==', password))
  }

}
