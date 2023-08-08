import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/characters';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  @Input() character!: Character;
  profile: boolean = false;

  openProfile(value: boolean) {
    this.profile = value;
  }
}
