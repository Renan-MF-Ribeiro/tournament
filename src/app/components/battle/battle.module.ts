import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const routes: Routes = [
  {
    path: '',
    component: BattleComponent,
  },
];

@NgModule({
  declarations: [BattleComponent, TeamMembersComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(routes),
    MatButtonToggleModule,
  ],
})
export class BattleModule {}
