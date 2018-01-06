
import { Observable } from 'rxjs/Observable';

export declare class Repository<T> {
  findByFilter(whereFilter: Array<any>): Observable<T>;

  store(data: T): Promise<any>;
}