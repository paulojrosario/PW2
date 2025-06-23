import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Game {
  id?: string;
  date: string;
  game: {
    board: any[][];
    winner: number | null;
    moves: number[]; // Adicionar esta linha
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
    // Ordena os jogos do mais recente para o mais antigo
    return this.http.get<Game[]>(`${this.apiUrl}/games`).pipe(
      map(games => games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    );
  }

  // Novo método para ir buscar apenas o último jogo
  getLastGame(): Observable<Game | undefined> {
    return this.getGames().pipe(
      map(games => games[0]) // O primeiro elemento é o mais recente
    );
  }

  getStatistics(): Observable<Stats> {
    return this.http.get<Stats>(`${this.apiUrl}/statistics/1`);
  }

  updateStatistics(stats: Stats): Observable<Stats> {
    return this.http.put<Stats>(`${this.apiUrl}/statistics/1`, stats);
  }
}