
import { Bulb } from './bulb';

export interface Replacement {
  specialNotes: string;
  replacementBulb: Bulb;
  fixtureId?: string;
}