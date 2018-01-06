
import { Bulb } from './bulb';

export interface Fixture {
  image: string;
  balastType: string;
  existingBulbs?: Array<Bulb>;
  numberOfBulbs: number;
  numberOfFixtures: number;
  roomId?: string;
}