import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Character } from '../models/characters';
import { Team } from '../models/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _teamService: TeamService, private _router: Router) {}

  team1!: Team;
  team2!: Team;
  team3!: Team;
  team4!: Team;

  finalist1!: Team;
  finalist2!: Team;

  champion!: Team;

  ngOnInit(): void {
    const team1 = this._teamService.getWinner('ab');
    const team2 = this._teamService.getWinner('cd');
    const team3 = this._teamService.getWinner('ef');
    const team4 = this._teamService.getWinner('gh');

    const finalist1 = this._teamService.getWinner('q12');
    const finalist2 = this._teamService.getWinner('q34');

    if (team1) this.team1 = this._teamService.getTeam(team1);
    if (team2) this.team2 = this._teamService.getTeam(team2);
    if (team3) this.team3 = this._teamService.getTeam(team3);
    if (team4) this.team4 = this._teamService.getTeam(team4);

    if (finalist1) this.finalist1 = this._teamService.getTeam(finalist1);
    if (finalist2) this.finalist2 = this._teamService.getTeam(finalist2);

    /* Checks if there is a registered champion, 
       if so, redirects to the winner's screen. */
    this.champion = this._teamService.getChampion();
    if (this.champion) {
      this._router.navigate(['/battle/winners'], {
        queryParams: { champion: this.champion.idPosition },
      });
    }
  }

  // Validates that teams exist and have all members
  validateTeam(team1: string, team2: string) {
    const t1 = this._teamService.getTeam(team1);
    const t2 = this._teamService.getTeam(team2);
    if (t1 && t2) {
      const validT1 = t1.members.every((item: Character) =>
        item?.hasOwnProperty('id')
      );
      const validT2 = t2.members.every((item: Character) =>
        item?.hasOwnProperty('id')
      );
      return !validT1 || !validT2;
    }
    return true;
  }

  // Validate if there are finalists
  get final() {
    return this.finalist1 && this.finalist2;
  }
}
