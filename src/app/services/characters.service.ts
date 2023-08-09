import { Injectable } from '@angular/core';

import { Observable, map, of } from 'rxjs';
import { Character } from '../models/characters';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private dataUrl = 'assets/mock/db.json';
  constructor(private http: HttpClient) {}

  // Get from fake backend for all available characters
  list(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((value) => {
        const charactersWhithPath = value.map((character: Character) => ({
          ...character,
          thumb: `/assets/characters/${character.id}_small.png`,
          full: `/assets/characters/${character.id}_full.png`,
          bust: `/assets/characters/${character.id}_bust.png`,
        }));
        return charactersWhithPath;
      })
    );
  }
}
