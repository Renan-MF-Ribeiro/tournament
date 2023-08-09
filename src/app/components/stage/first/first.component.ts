import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  constructor(private _teamService: TeamService) {}

  team1!: Team;
  team2!: Team;
  team3!: Team;
  team4!: Team;

  ngOnInit(): void {
    const teams = this._teamService.fillTeams();

    this.team1 = teams.team1;
    this.team2 = teams.team2;
    this.team3 = teams.team3;
    this.team4 = teams.team4;
  }
}
