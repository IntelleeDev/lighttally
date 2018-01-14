import { BatchProcessor } from './batch-processor';
import { AngularFirestore } from 'angularfire2/firestore';

import { Room } from '../../model/room';
import { Fixture } from '../../model/fixture';
import { Evaluation } from '../../model/evaluation';
import { Replacement } from '../../model/replacement';

export class FirestoreBatchProcessor implements BatchProcessor {

  constructor(private firestore: AngularFirestore) {}

  process<T>(data: T): Promise<any> {
    const firestore = this.firestore.firestore;
    const batch = firestore.batch();

    const evalId = this.firestore.createId();
    const evalRef = firestore.collection('evaluations').doc(evalId);
    const evaluation: Evaluation = {
      timestamp: new Date(),
      locationId: '',
      userId: '',
      id: evalId
    };
    batch.set(evalRef, evaluation);

    const evaluations = data as any;
    evaluations.forEach(value => {
      const room: Room = value.room;
      const roomId = this.firestore.createId();
      const roomRef = firestore.collection('rooms').doc(roomId);
      batch.set(roomRef, { id: roomId, ...room, evaluationId: evalId });

      const fixtures: Array<Fixture> = value.fixtures;
      fixtures.forEach((fixture: Fixture) => {
        const fixId = this.firestore.createId();
        const fixRef = firestore.collection('fixtures').doc(fixId);
        batch.set(fixRef, { id: fixId, ...fixture, roomId: roomId });
        
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