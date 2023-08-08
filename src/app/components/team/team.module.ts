import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { MatIconModule } from '@angular/material/icon';
import { SelectTeamComponent } from '../select-team/select-team.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SelectedCharactersComponent } from '../selected-characters/selected-characters.component';
import { CharactersComponent } from '../characters/characters.component';

@NgModule({
  declarations: [
    TeamComponent,
    SelectTeamComponent,
    SelectedCharactersComponent,
    CharactersComponent,
  ],
  imports: [CommonModule, MatIconModule, MatDialogModule, MatInputModule],
  exports: [TeamComponent],
})
export class TeamModule {}
