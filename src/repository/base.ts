
import { Observable } from 'rxjs/Observable';

export declare class Repository<T> {
  findByFilter(whereFilter: string): Observable<T>;

  store(data: T): Promise<any>;
}