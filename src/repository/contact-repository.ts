import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { Contact } from '../model/contact';
import { FirestoreDataSourceProvider } from '../providers/firestore-data-source/firestore-data-source';

@Injectable()
export class ContactRepository implements Repository<Contact> {
  private collectionName = 'contacts';

  constructor(private dataSource: FirestoreDataSourceProvider<Contact>) { }

  findByFilter(whereFilter: Array<any>): Observable<Contact> {
    throw new Error("Method not implemented.");
  }

  store(data: Contact): Promise<any> {
    return this.dataSource
               .store(this.collectionName, data)
               .then(id => id);
  }

}