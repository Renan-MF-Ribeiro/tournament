import { Component } from '@angular/core';
import { Character } from 'src/app/models/characters';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss'],
})
export class SelectTeamComponent {
  characters: Character[] = [];

  constructor(private _charactersService: CharactersService) {
    this._charactersService.list().subscribe((characters) => {
      this.characters = characters;
    });
  }
}
