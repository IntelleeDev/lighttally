import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { DataSource } from '../../data/data-source';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirestoreDataSourceProvider<T> implements DataSource<T> {

  constructor(public fireStore: AngularFirestore) { }
  
  find(collectionName, id: string): Observable<T> {
    return this.fireStore
        .doc<T>(`${collectionName}/${id}`)
        .valueChanges();
  }
  
  findAll(collectionName: string): Observable<T> {
    throw new Error("Method not implemented.");
  }

  findByFilter(collectionName, data: any[], constraint: any): Observable<T[]> {
    return this.fireStore
      .collection<T>(collectionName, ref =>
        ref.where(data[0], constraint, data[1]))
        .valueChanges()   
  }

  store(collectionName, data: T): Promise<any> {
    let collection = this.fireStore.collection<T>(collectionName);
    return collection.add(data)
              .then(docRef => docRef.id)
              .catch(error => error);
  }
}
