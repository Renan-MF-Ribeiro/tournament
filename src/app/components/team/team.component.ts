import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectTeamComponent } from '../select-team/select-team.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  constructor(public dialog: MatDialog) {}
  openSelect() {
    const selectRef = this.dialog.open(SelectTeamComponent, {
      width: '50%',
      height: '70%',
    });

    selectRef.afterClosed().subscribe((team) => {
      console.log(`Dialog result: ${team}`);
    });
  }
}
