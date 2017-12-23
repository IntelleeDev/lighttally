
import { Observable } from 'rxjs/Observable';

export interface Repository<T> {
  findByFilter(whereFilter: string): Observable<T>;
}