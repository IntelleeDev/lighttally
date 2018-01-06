import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';

import { Repository } from './base';
import { User } from '../model/user';
import { FirestoreDataSourceProvider } from '../providers/firestore-data-source/firestore-data-source';


export class UserRepository implements Repository<User> {
  private collectionName: string = 'users';

  constructor(private dataSource: FirestoreDataSourceProvider<User>) {}

  findByFilter(whereFilter: Array<any>): Observable<User> {
    return this.dataSource
               .findByFilter(this.collectionName, whereFilter, whereFilter[1])
               .pipe(map(users => users[0]));
  }

  store(data: User): Promise<any> {
    throw new Error("Method not implemented.");
  }
}