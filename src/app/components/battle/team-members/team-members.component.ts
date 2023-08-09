import { Component, Input } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss'],
})
export class TeamMembersComponent {
  @Input() team!: Team;
  @Input() side!: string;
}
