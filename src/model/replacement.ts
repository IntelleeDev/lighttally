
import { Bulb } from './bulb';

export interface Replacement {
  specialNotes: string;
  replacementBulb?: Array<Bulb>;
  roomId?: string;
}