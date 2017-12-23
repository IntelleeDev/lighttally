
import { Observable } from 'rxjs/Observable';

export interface DataSource<T> {
  find(id: string): Observable<T>;
  
  findAll(name: string): Observable<T>;
  
  store(data: T): void;
  
  findByFilter(name:string, filter: string[]): Observable<T[]>;
}