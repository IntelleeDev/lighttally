
import { Observable } from 'rxjs/Observable';

export interface DataSource<T> {
  find(id: string): Observable<T>;
  
  findAll(name: string): Observable<T>;
  
  store(data: T): void;
  
  findByFilter(data: any[], constraint: any): Observable<T[]>;
}