
import { Observable } from 'rxjs/Observable';

export interface DataSource<T> {
  find(name: string, id: string): Observable<T>;
  
  findAll(name: string): Observable<T>;
  
  store(name: string, data: T): void;
  
  findByFilter(name:string, filter: string[]): Observable<T[]>;
}