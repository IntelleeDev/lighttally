import { Observable } from 'rxjs/Rx';
import { Repository } from './base';

import { Evaluation } from '../model/evaluation';

export class EvaluationRepository implements Repository<Evaluation> {
  findByFilter(whereFilter: string): Observable<Evaluation> {
    throw new Error("Method not implemented.");
  }
  store(data: Evaluation): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
}