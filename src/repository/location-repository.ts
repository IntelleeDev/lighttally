import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { Location } from '../model/location';
import { FirestoreDataSourceProvider } from '../providers/firestore-data-source/firestore-data-source';

@Injectable()
export class LocationRepository implements Repository<Location> {
  private collectionName = 'locations';

  constructor(private dataSource: FirestoreDataSourceProvider<Location>) {}

  findByFilter(whereFilter: string): Observable<Location> {
    throw new Error("Method not implemented.");
  }

  store(data: Location): Promise<any> {
    return this.dataSource
               .store(this.collectionName, data)
               .then(id => id);
  }
  
}