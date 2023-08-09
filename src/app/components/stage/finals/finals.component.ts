import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-finals',
  templateUrl: './finals.component.html',
  styleUrls: ['./finals.component.scss'],
})
export class FinalsComponent implements OnInit {
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
}
