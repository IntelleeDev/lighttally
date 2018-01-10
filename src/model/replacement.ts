
import { Bulb } from './bulb';

export interface Replacement {
  id?: string;
  specialNotes: string;
  replacementBulb: Bulb;
  fixtureId?: string;
}