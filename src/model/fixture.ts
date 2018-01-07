
import { Bulb } from './bulb';

export interface Fixture {
  numberOfFixtures: number;
  numberOfBulbs: number;
  balastType: string;
  existingBulb: Bulb;
  wrongBulb: boolean;
  image: string;  
  roomId?: string;
}