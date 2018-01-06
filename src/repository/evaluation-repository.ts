import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { Evaluation } from '../model/evaluation';
import { FirestoreDataSourceProvider } from '../providers/firestore-data-source/firestore-data-source';

export class EvaluationRepository implements Repository<Evaluation> {
  private collectionName: string = 'evaluations';

  constructor(private dataSource: FirestoreDataSourceProvider<Evaluation>) {}

  findByFilter(whereFilter: Array<any>): Observable<Evaluation> {
    throw new Error("Method not implemented.");
  }

  store(data: Evaluation): Promise<any> {
    return this.dataSource
        .store(this.collectionName, data)
        .then(id => id)
        .catch(error => error);
  }
  
}