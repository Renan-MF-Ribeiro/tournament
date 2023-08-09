import { Component } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Character } from '../models/characters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private _teamService: TeamService) {}

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
}
