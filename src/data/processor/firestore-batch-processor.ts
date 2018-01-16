import { Injectable } from '@angular/core';
import { BatchProcessor } from './batch-processor';
import { AngularFirestore } from 'angularfire2/firestore';

import { Room } from '../../model/room';
import { Fixture } from '../../model/fixture';
import { Evaluation } from '../../model/evaluation';
import { Replacement } from '../../model/replacement';

@Injectable()
export class FirestoreBatchProcessor implements BatchProcessor {

  constructor(private firestore: AngularFirestore) {}

  process<T>(data: T): Promise<any> {
    const firestore = this.firestore.firestore;
    const batch = firestore.batch();
    
    const content = data as any;

    // Location Data
    const locId = this.firestore.createId();
    const locRef = firestore.collection('locations').doc(locId);
    batch.set(locRef, { id: locId, ...content.location });

    // Contact Data
    const contId = this.firestore.createId();
    const contRef = firestore.collection('contacts').doc(contId);
    batch.set(contRef, { id: contId, locationId: locId, ...content.contact });

    // Evaluation Data
    const evalId = this.firestore.createId();
    const evalRef = firestore.collection('evaluations').doc(evalId);
    const evaluation: Evaluation = {
      timestamp: new Date(),
      locationId: locId,
      id: evalId
    };
    batch.set(evalRef, evaluation);
    
    const evaluations = content.evaluations;
    evaluations.forEach(value => {
      // Room Data
      const room: Room = value.room;
      const roomId = this.firestore.createId();
      const roomRef = firestore.collection('rooms').doc(roomId);
      batch.set(roomRef, { id: roomId, ...room, evaluationId: evalId });

      // Fixture Data
      const fixtures: Array<Fixture> = value.fixtures;
      fixtures.forEach((fixture: Fixture) => {
        const fixId = this.firestore.createId();
        const fixRef = firestore.collection('fixtures').doc(fixId);
        batch.set(fixRef, { id: fixId, ...fixture, roomId: roomId });
        
        // Replacement Data
        const replacements: Array<Replacement> = value.replacements;
        replacements.forEach((replacement: Replacement) => {
          const repId = this.firestore.createId();
          const repRef = firestore.collection('replacements').doc(repId);
          batch.set(repRef, { id: repId, ...replacement, fixtureId: fixId });
        });
      });
    });

    return batch.commit();
  }

}