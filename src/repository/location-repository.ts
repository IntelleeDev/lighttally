import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { Contact } from '../model/contact';
import { Location } from '../model/location';

import { ContactRepository } from './contact-repository';
import { FirestoreDataSourceProvider } from '../providers/firestore-data-source/firestore-data-source';

@Injectable()
export class LocationRepository implements Repository<Location> {
  private collectionName = 'locations';

  constructor(
    private contactRepo: ContactRepository,
    private dataSource: FirestoreDataSourceProvider<Location>) {}

  findByFilter(whereFilter: Array<any>): Observable<Location> {
    throw new Error("Method not implemented.");
  }

  store(data: Location): Promise<any> {
    return this.dataSource
               .store(this.collectionName, data)
               .then(id => id);
  }

  storeWithContact(location: Location, contact: Contact): Promise<any> {
    return this.store(location)
        .then(id => {
          contact.locationId = id;
          return this.contactRepo
              .store(contact)
              .then(contactId => id)
        })
        .catch(error => error);
  }
  
}