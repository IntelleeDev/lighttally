import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { DataSource } from '../../data/data-source';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirestoreDataSourceProvider<T> implements DataSource<T> {
  
  private collectionName: string;

  constructor(public fireStore: AngularFirestore) { }
  
  find(id: string): Observable<T> {
    return this.fireStore
        .doc<T>(`${this.collectionName}/${id}`)
        .valueChanges();
  }
  
  findAll(collectionName: string): Observable<T> {
    throw new Error("Method not implemented.");
  }

  findByFilter(data: any[], constraint: any): Observable<T[]> {
    return this.fireStore
      .collection<T>(this.collectionName, ref =>
        ref.where(data[0], constraint, data[1]))
        .valueChanges()   
  }

  store(data: T): void {
    let collection = this.fireStore.collection<T>(this.collectionName);
    collection.add(data);
  }

  setCollectionName(name: string) {
    this.collectionName = name;
  }
}
