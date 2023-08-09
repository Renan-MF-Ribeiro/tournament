import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectTeamComponent } from './select-team/select-team.component';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @Input() idPosition!: string;
  team!: Team | undefined;
  constructor(public dialog: MatDialog, private _teamService: TeamService) {}

  ngOnInit(): void {
    this.team = this._teamService.getTeam(this.idPosition);
  }

  openSelect() {
    const selectRef = this.dialog.open(SelectTeamComponent, {
      data: this.idPosition,
      width: '50%',
      height: '70%',
    });

    selectRef.afterClosed().subscribe((team) => {
      if (team) {
        this.team = team;
      }
    });
  }
}
