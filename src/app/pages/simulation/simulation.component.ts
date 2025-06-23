import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game, GameService } from '../../services/game.service';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  private gameService = inject(GameService);

  rows = 6;
  cols = 7;
  board: (0 | 1 | 2)[][] = [];
  isSimulating = false;
  isPlaying = false;
  currentStep = 0;
  totalSteps = 0;
  lastGame: Game | undefined;

  ngOnInit(): void {
    this.resetBoard();
    this.gameService.getLastGame().subscribe(game => {
      this.lastGame = game;
      if (game && game.game.moves) {
        this.totalSteps = game.game.moves.length;
      }
    });
  }

  get currentBoard(): (0 | 1 | 2)[][] {
    return this.board;
  }

  getWinnerName(winner: number | null): string {
    if (winner === 1) return 'Amarelo';
    if (winner === 2) return 'Vermelho';
    return 'Empate';
  }

  getCellClass(cell: 0 | 1 | 2): string {
    if (cell === 1) return 'yellow';
    if (cell === 2) return 'red';
    return 'empty';
  }

  resetBoard(): void {
    this.board = Array(this.cols).fill(0).map(() => Array(this.rows).fill(0));
    this.currentStep = 0;
    this.isPlaying = false;
  }

  startSimulation(): void {
    if (!this.lastGame || !this.lastGame.game.moves || this.isSimulating) {
      return;
    }

    this.isSimulating = true;
    this.isPlaying = true;
    this.resetBoard();

    const moves = this.lastGame.game.moves;
    let moveIndex = 0;
    let currentPlayer: 1 | 2 = Math.random() > 0.5 ? 1 : 2; // Simula um jogador inicial aleatório para a cor

    const interval = setInterval(() => {
      if (moveIndex >= moves.length) {
        clearInterval(interval);
        this.isSimulating = false;
        this.isPlaying = false;
        return;
      }

      const colIdx = moves[moveIndex];

      // Encontra a primeira posição livre na coluna
      const rowIdx = this.board[colIdx].findIndex(cell => cell === 0);
      if (rowIdx !== -1) {
        this.board[colIdx][rowIdx] = currentPlayer;
      }

      // Troca de jogador para a próxima jogada
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      moveIndex++;
      this.currentStep = moveIndex;

    }, 500); // 500ms entre cada jogada
  }

  stopSimulation(): void {
    this.isSimulating = false;
    this.isPlaying = false;
  }
}