import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GameService, Game } from '../../services/game.service';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);

  game: Game | null = null;
  gameId: string | null = null;

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.loadGame();
    }
  }

  loadGame(): void {
    if (this.gameId) {
      this.gameService.getGames().subscribe({
        next: (games) => {
          this.game = games.find(g => g.id === this.gameId) || null;
          if (!this.game) {
            console.error('Game not found');
            this.router.navigate(['/statistics']);
          }
        },
        error: (err) => {
          console.error('Error loading game:', err);
          this.router.navigate(['/statistics']);
        }
      });
    }
  }

  getWinnerName(winner: number | null): string {
    if (winner === 1) return 'Amarelo';
    if (winner === 2) return 'Vermelho';
    return 'Empate';
  }

  getCellClass(cell: any): string {
    if (cell === 1) return 'yellow';
    if (cell === 2) return 'red';
    return '';
  }
}
