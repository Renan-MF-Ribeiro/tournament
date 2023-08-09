import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/characters';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-quarterfinals',
  templateUrl: './quarterfinals.component.html',
  styleUrls: ['./quarterfinals.component.scss'],
})
export class QuarterfinalsComponent implements OnInit {
  constructor(private _teamService: TeamService) {}

  team1!: Team;
  team2!: Team;
  team3!: Team;
  team4!: Team;

  finalist1!: Team;
  finalist2!: Team;

  ngOnInit(): void {
    const teams = this._teamService.fillTeams();

    this.team1 = teams.team1;
    this.team2 = teams.team2;
    this.team3 = teams.team3;
    this.team4 = teams.team4;

    const finalist1 = this._teamService.getWinner('q12');
    const finalist2 = this._teamService.getWinner('q34');

    if (finalist1) this.finalist1 = this._teamService.getTeam(finalist1);
    if (finalist2) this.finalist2 = this._teamService.getTeam(finalist2);
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
}
