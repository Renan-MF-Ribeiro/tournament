import { Character } from './characters';

export interface Team {
  idPosition: string;
  name: string;
  members: Character[];
}
