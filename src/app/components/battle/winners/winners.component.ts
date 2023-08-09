import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
})
export class WinnersComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() team!: Team;

  constructor(
    private _activedRoute: ActivatedRoute,
    private _teamService: TeamService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    //Get Chapion team
    this._activedRoute.queryParams
      .pipe(takeUntil(this._destroy$))
      .subscribe((keys) => {
        this.team = this._teamService.getTeam(keys['champion']);
      });
  }

  //Restart tournament
  restart() {
    this._teamService.restart();
    this._router.navigate(['/']);
  }

  //Unsubscribe observables
  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
