import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/models/characters';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  @Input() character!: Character;
  @Input() selected!: Character[];
  @Output() select = new EventEmitter<Character>();
  profile: boolean = false;

  openProfile(value: boolean) {
    this.profile = value;
  }

  //Disable character already selected
  get inSelected() {
    return (this.selected || []).find((ch) => ch?.id == this.character?.id);
  }
}
