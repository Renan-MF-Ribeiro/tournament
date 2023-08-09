import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/characters';

@Component({
  selector: 'app-selected-characters',
  templateUrl: './selected-characters.component.html',
  styleUrls: ['./selected-characters.component.scss'],
})
export class SelectedCharactersComponent {
  @Input() character!: Character;
}
