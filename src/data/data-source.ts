
import { Observable } from 'rxjs/Observable';

export declare class DataSource<T> {
  find(entityName, id: string): Observable<T>;
  
  findAll(entityName: string): Observable<T>;
  
  store(entityName, data: T): void;
  
  findByFilter(entityName, data: any[], constraint: any): Observable<T[]>;
}