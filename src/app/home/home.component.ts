import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Character } from '../models/characters';
import { Team } from '../models/team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _teamService: TeamService) {}

  finalist1!: Team;
  finalist2!: Team;
  champion!: Team;

  ngOnInit(): void {
    const final1 = this._teamService.getFinalist('ab');
    const final2 = this._teamService.getFinalist('cd');

    if (final1) this.finalist1 = this._teamService.getTeam(final1);
    if (final2) this.finalist2 = this._teamService.getTeam(final2);

    this.champion = this._teamService.getChampion();
  }

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

  get final() {
    return this.finalist1 && this.finalist2;
  }
}
