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

  finalist1!: Team;
  finalist2!: Team;
  champion!: Team;

  ngOnInit(): void {
    const final1 = this._teamService.getFinalist('ab');
    const final2 = this._teamService.getFinalist('cd');

    if (final1) this.finalist1 = this._teamService.getTeam(final1);
    if (final2) this.finalist2 = this._teamService.getTeam(final2);

    /* Checks if there is a registered champion, 
       if so, redirects to the winner's screen. */
    this.champion = this._teamService.getChampion();
    if (this.champion) {
      this._router.navigate(['/battle/winners'], {
        queryParams: { champion: this.champion.idPosition },
      });
    }
  }

  // Validates that teams A and B exist and have all members
  get stageAB() {
    const t1 = this._teamService.getTeam('team-A');
    const t2 = this._teamService.getTeam('team-B');
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

  // Validates that teams C and D exist and have all members
  get stageCD() {
    const t1 = this._teamService.getTeam('team-C');
    const t2 = this._teamService.getTeam('team-D');
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
