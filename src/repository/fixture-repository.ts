import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { Fixture } from '../model/fixture';

export class FixtureRepository implements Repository<Fixture> {
  findByFilter(whereFilter: Array<any>): Observable<Fixture> {
    throw new Error("Method not implemented.");
  }
  
  store(data: Fixture): Promise<any> {
    throw new Error("Method not implemented.");
  }

}