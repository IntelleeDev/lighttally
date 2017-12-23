import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { DataSource } from '../../data/data-source';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirestoreDataSourceProvider<T> implements DataSource<T> {
  constructor(public fireStore: AngularFirestore) { }
  
  find(collection: string, id: string): Observable<T> {
    return this.fireStore
        .doc<T>(`${collection}/${id}`)
        .valueChanges();
  }
  
  findAll(name: string): Observable<T> {
    throw new Error("Method not implemented.");
  }

  findByFilter(name: string, filter: string[]): Observable<T[]> {
    return this.fireStore
        .collection<T>(name, ref => 
          ref.where(filter[0], filter[1], filter[2]))
        .valueChanges();       
  }

  store(name: string, data: T): void {
    let collection = this.fireStore.collection<T>(name);
    collection.add(data);
  }
}
