import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
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
    this._activedRoute.queryParams
      .pipe(takeUntil(this._destroy$))
      .subscribe((keys) => {
        this.team1 = this._teamService.getTeam(keys['team1']);
        this.team2 = this._teamService.getTeam(keys['team2']);
        this.final = keys['final'] == 'true';
      });
  }

  //Defines and saves the result of the match
  winner(winner: string) {
    this.result.team1 =
      winner == 'team1'
        ? '/assets/images/win.png'
        : '/assets/images/defeat.png';
    this.result.team2 =
      winner == 'team2'
        ? '/assets/images/win.png'
        : '/assets/images/defeat.png';

    const winnerTeam = winner == 'team1' ? this.team1 : this.team2;

    //Validates if it's the final battle
    if (this.final) {
      this._teamService.setChampion(winnerTeam);
    } else {
      const key = this.team1.idPosition == 'team-A' ? 'ab' : 'cd';
      this._teamService.saveFinalist(winnerTeam, key);
    }
  }

  //Unsubscribe observables
  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
