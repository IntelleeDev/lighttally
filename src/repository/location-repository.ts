import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { Location } from '../model/Location';
import { DataSource } from '../data/data-source';

@Injectable()
export class LocationRepository implements Repository<Location> {
  private collectionName = 'location';

  constructor(private dataSource: DataSource<Location>) {}

  findByFilter(whereFilter: string): Observable<Location> {
    throw new Error("Method not implemented.");
  }

  store(data: Location): Observable<any> {
    this.dataSource.store(data)
  }
  
}