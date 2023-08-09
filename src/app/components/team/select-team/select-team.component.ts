import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Character } from 'src/app/models/characters';
import { Team } from 'src/app/models/team';
import { CharactersService } from 'src/app/services/characters.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss'],
})
export class SelectTeamComponent implements OnInit {
  characters: Character[] = [];

  constructor(
    public dialogRef: MatDialogRef<SelectTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public idPosition: string,
    private _charactersService: CharactersService,
    private _teamService: TeamService
  ) {
    this._charactersService.list().subscribe((characters) => {
      this.characters = characters;
    });
  }

  team!: Team;

  ngOnInit(): void {
    this.team = this._teamService.getTeam(this.idPosition);
    if (!this.team) {
      const newTeam: Team = {
        name: this.idPosition,
        idPosition: this.idPosition,
        members: new Array(5),
      };
      this.team = newTeam;
    }
  }

  setTeam($event: Character) {
    if (this.team) {
      this.team = this._teamService.setTeamMembers(this.team, $event);
    }
  }

  saveTeam() {
    this._teamService.saveTeam(this.team);
    this.dialogRef.close(this.team);
  }
}
