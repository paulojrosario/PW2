import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { GameService, Stats, Game } from '../../services/game.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private gameService = inject(GameService);

  stats: Stats | null = null;
  games: Game[] = [];

  ngOnInit(): void {
    forkJoin({
      stats: this.gameService.getStatistics(),
      games: this.gameService.getGames()
    }).subscribe({
      next: (data) => {
        this.stats = data.stats;
        this.games = data.games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error: (err) => console.error('Erro ao carregar dados:', err)
    });
  }

  getWinnerName(winner: number | null): string {
    if (winner === 1) return 'Amarelo';
    if (winner === 2) return 'Vermelho';
    return 'Empate';
  }
}