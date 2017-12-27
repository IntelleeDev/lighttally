
import { Observable } from 'rxjs/Observable';

export interface DataSource<T> {
  find(entityName, id: string): Observable<T>;
  
  findAll(entityName: string): Observable<T>;
  
  store(entityName, data: T): void;
  
  findByFilter(entityName, data: any[], constraint: any): Observable<T[]>;
}