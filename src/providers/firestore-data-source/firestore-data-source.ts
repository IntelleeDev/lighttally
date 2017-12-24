import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { DataSource } from '../../data/data-source';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirestoreDataSourceProvider<T> implements DataSource<T> {
  constructor(public fireStore: AngularFirestore) { }
  
  find(collectionName: string, id: string): Observable<T> {
    return this.fireStore
        .doc<T>(`${collectionName}/${id}`)
        .valueChanges();
  }
  
  findAll(collectionName: string): Observable<T> {
    throw new Error("Method not implemented.");
  }

  findByFilter(collectionName: string, filter: string[]): Observable<T[]> {
    throw new Error("Method not implemented.");     
  }

  store(collectionName: string, data: T): void {
    let collection = this.fireStore.collection<T>(collectionName);
    collection.add(data);
  }
}
