import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  constructor(
    private _activedRoute: ActivatedRoute,
    private _teamService: TeamService
  ) {}
  team1!: Team;
  team2!: Team;

  final: boolean = false;

  result = {
    team1: '',
    team2: '',
  };

  ngOnInit(): void {
    this._activedRoute.queryParams.subscribe((keys) => {
      this.team1 = this._teamService.getTeam(keys['team1']);
      this.team2 = this._teamService.getTeam(keys['team2']);
      this.final = keys['final'] == 'true';
    });
  }

  winner(winner: string) {
    this.result.team1 =
      winner == 'team1'
        ? '/assets/images/win.png'
        : '/assets/images/defeat.png';
    this.result.team2 =
      winner == 'team2'
        ? '/assets/images/win.png'
        : '/assets/images/defeat.png';

    if (!this.final) {
      const key = this.team1.idPosition == 'team-A' ? 'ab' : 'cd';

      this._teamService.saveFinalist(
        winner == 'team1' ? this.team1 : this.team2,
        key
      );
    } else {
      this._teamService.setChampion(
        winner == 'team1' ? this.team1 : this.team2
      );
    }
  }
}
