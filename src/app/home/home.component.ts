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
    const finalist1 = this._teamService.getWinner('q12');
    const finalist2 = this._teamService.getWinner('q34');

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

  // Validate if there are finalists
  get final() {
    return this.finalist1 && this.finalist2;
  }
}
