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
    this.finalists = JSON.parse(sessionStorage.getItem('finalists') || '');
  }

  getTeam(idPosition: string) {
    const teams = JSON.parse(sessionStorage.getItem('teams') || '[]');
    return teams?.find((team: Team) => team.idPosition == idPosition);
  }

  setTeamMembers(team: any, member: Character) {
    const memberIndex = team.members.findIndex(
      (item: Character) => item?.id === member?.id
    );

    if (memberIndex >= 0) {
      // Caso o membro já exista, remova-o mantendo o tamanho original
      team.members[memberIndex] = undefined;
    } else {
      // Caso o membro não exista, verifique se há um espaço vazio para adicionar
      const firstEmpty = team.members.findIndex(
        (item: Character) => item === undefined || item === null
      );

      if (firstEmpty >= 0) {
        team.members[firstEmpty] = member;
      } else {
        // Caso não haja espaço vazio, não faça nada
        console.log(
          'O time está cheio. Não é possível adicionar mais membros.'
        );
      }
    }

    return team;
  }

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

  getFinalist(key: string) {
    const finalist = JSON.parse(sessionStorage.getItem('finalists') || '');
    return finalist[key];
  }

  saveFinalist(finalist: Team, key: string) {
    this.finalists[key] = finalist.idPosition;
    sessionStorage.setItem('finalists', JSON.stringify(this.finalists));
  }

  getChampion() {
    const champion = JSON.parse(sessionStorage.getItem('champion') || '');
    return champion;
  }

  setChampion(champion: Team) {
    sessionStorage.setItem('champion', JSON.stringify(champion));
  }
}
