
import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { User } from '../model/user'

export class UserRepository implements Repository<User> {
  findByFilter(whereFilter: string): Observable<User> {
    throw new Error("Method not implemented.");
  }
  store(data: User): Promise<any> {
    throw new Error("Method not implemented.");
  }
}