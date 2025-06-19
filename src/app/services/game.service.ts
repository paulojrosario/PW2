// src/app/services/game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id?: string;
  date: string;
  game: {
    board: any[][];
    winner: number | null;
  };
}

export interface Stats {
  id: string;
  red: number;
  yellow: number;
  draw: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000'; // URL do seu json-server

  constructor(private http: HttpClient) { }

  saveGame(gameData: Game): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/games`, gameData);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }

  getStatistics(): Observable<Stats> {
    return this.http.get<Stats>(`${this.apiUrl}/statistics/1`);
  }

  updateStatistics(stats: Stats): Observable<Stats> {
    return this.http.put<Stats>(`${this.apiUrl}/statistics/1`, stats);
  }
}