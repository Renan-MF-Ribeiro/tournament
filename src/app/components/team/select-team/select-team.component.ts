import { Component, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Character } from 'src/app/models/characters';
import { Team } from 'src/app/models/team';
import { CharactersService } from 'src/app/services/characters.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss'],
})
export class SelectTeamComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  characters: Character[] = [];

  constructor(
    public dialogRef: MatDialogRef<SelectTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public idPosition: string,
    private _charactersService: CharactersService,
    private _teamService: TeamService
  ) {
    //Get All Characters
    this._charactersService
      .list()
      .pipe(takeUntil(this._destroy$))
      .subscribe((characters) => {
        this.characters = characters;
      });
  }

  team!: Team;

  ngOnInit(): void {
    //Start/pick up team
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

  //Add member to team by service
  setTeam($event: Character) {
    if (this.team) {
      this.team = this._teamService.setTeamMembers(this.team, $event);
    }
  }

  // Save/Update team
  saveTeam() {
    this._teamService.saveTeam(this.team);
    this.dialogRef.close(this.team);
  }

  // Populates the team with members at random
  getRandom() {
    const shuffledArray = this.characters.slice(); // Copies the original array so as not to modify
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap the elements
    }

    const team = shuffledArray.slice(0, 5); // Returns the first "team" elements of the shuffled array
    team.forEach((ch) => {
      this.setTeam(ch);
    });
  }

  //Unsubscribe observables
  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
