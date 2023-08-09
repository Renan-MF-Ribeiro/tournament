import { Injectable, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { Character } from '../models/characters';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teams: Team[] = [];
  private finalists: {
    [x: string]: string;
    ab: string;
    cd: string;
  } = { ab: '', cd: '' };

  constructor() {
    this.teams = JSON.parse(sessionStorage.getItem('teams') || '[]');
    this.finalists = JSON.parse(sessionStorage.getItem('finalists') || '{}');
  }

  //returns the team requested by id
  getTeam(idPosition: string) {
    const teams = JSON.parse(sessionStorage.getItem('teams') || '[]');
    return teams?.find((team: Team) => team.idPosition == idPosition);
  }

  // Adds a member to the designated team keeping the same number of elements
  setTeamMembers(team: any, member: Character) {
    const memberIndex = team.members.findIndex(
      (item: Character) => item?.id === member?.id
    );

    if (memberIndex >= 0) {
      // If the member already exists, remove it keeping the original size
      team.members[memberIndex] = undefined;
    } else {
      // In case the member does not exist, check if there is an empty space to add
      const firstEmpty = team.members.findIndex(
        (item: Character) => item === undefined || item === null
      );

      if (firstEmpty >= 0) {
        team.members[firstEmpty] = member;
      } else {
        // If there is no empty space, do nothing.
        console.log('The team is full. Unable to add more members.');
      }
    }

    return team;
  }

  // Save/Update team
  saveTeam(team: Team) {
    const find = this.teams.find((t) => t.idPosition == team.idPosition);
    if (find) {
      this.teams = this.teams.map((t) => {
        if (team.idPosition == t.idPosition) {
          t = team;
        }
        return t;
      });
    } else {
      this.teams.push(team);
    }
    sessionStorage.setItem('teams', JSON.stringify([...this.teams]));
  }

  //Returns the id of the finalist team by the requested key
  getFinalist(key: string) {
    const finalist = JSON.parse(sessionStorage.getItem('finalists') || '{}');
    return finalist[key];
  }

  // saves the id of the finalist team in the selected key
  saveFinalist(finalist: Team, key: string) {
    this.finalists[key] = finalist.idPosition;
    sessionStorage.setItem('finalists', JSON.stringify(this.finalists));
  }

  // Returns the tournament champion if it has one
  getChampion() {
    const champion = JSON.parse(sessionStorage.getItem('champion') || '{}');
    if (!Object.keys(champion).length) return;
    return champion;
  }
  // Save the Tournament Champion
  setChampion(champion: Team) {
    sessionStorage.setItem('champion', JSON.stringify(champion));
  }

  // Restarts the tournament, clearing recorded information
  restart() {
    sessionStorage.clear();
    this.finalists = { ab: '', cd: '' };
    this.teams = [];
  }
}
