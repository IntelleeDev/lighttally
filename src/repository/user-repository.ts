
import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { User } from '../model/user'

export class UserRepository implements Repository<User> {
  store(data: User): Observable<any> {
    throw new Error("Method not implemented.");
  }
  findByFilter(whereFilter: string): Observable<User> {
    throw new Error("Method not implemented.");
  }

}