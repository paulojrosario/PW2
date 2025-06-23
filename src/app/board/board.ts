import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, Game } from '../services/game.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrls: ['./board.css']
})
export class Board implements OnInit {
  private gameService = inject(GameService);

  // Propriedades do jogo
  rows = 6;
  cols = 7;
  board: (0 | 1 | 2)[][] = []; // 0: Vazio, 1: Amarelo, 2: Vermelho
  currentPlayer: 1 | 2 = 1;
  winner: 1 | 2 | null = null;
  gameOver = false;
  gameActive = true;
  hoveredCol: number | null = null;
  colFull = false;
  moveHistory: number[] = []; // Array para guardar o histórico de jogadas

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    // Reinicia o tabuleiro
    this.board = Array(this.cols).fill(0).map(() => Array(this.rows).fill(0));
    this.winner = null;
    this.gameOver = false;
    this.gameActive = true;
    this.colFull = false;
    this.moveHistory = []; // Limpa o histórico

    // Lógica para jogador inicial aleatório
    this.currentPlayer = Math.random() > 0.5 ? 1 : 2;
  }

  play(colIdx: number): void {
    if (!this.gameActive || this.winner !== null) return;
    this.colFull = false;

    // Encontra a primeira célula vazia na coluna, de baixo para cima
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[colIdx][row] === 0) {
        this.board[colIdx][row] = this.currentPlayer;
        this.moveHistory.push(colIdx); // Guarda a jogada

        if (this.checkEndCondition()) {
          return;
        }

        // Troca de jogador
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        return;
      }
    }
    
    // Se o loop terminar, a coluna está cheia
    this.colFull = true; 
  }

  checkEndCondition(): boolean {
    const winner = this.checkWinner();
    if (winner) {
      this.winner = winner;
      this.gameActive = false;
      this.gameOver = true;
      this.handleEndGame(winner); // Jogo terminou com vitória
      return true;
    }

    if (this.checkDraw()) {
      this.gameActive = false;
      this.gameOver = true;
      this.winner = null;
      this.handleEndGame(null); // Jogo terminou com empate
      return true;
    }

    return false;
  }

  handleEndGame(winner: number | null) {
    const gameToSave: Game = {
      date: new Date().toISOString(),
      game: {
        board: this.board,
        winner: winner,
        moves: this.moveHistory // Guarda o array de jogadas
      }
    };
    
    // 1. Guardar o jogo
    this.gameService.saveGame(gameToSave).subscribe({
      next: (savedGame) => console.log('Jogo guardado:', savedGame),
      error: (err) => console.error('Erro ao guardar jogo:', err)
    });

    // 2. Atualizar as estatísticas
    this.gameService.getStatistics().pipe(
      switchMap((stats) => {
        if (winner === 2) { // Vermelho
          stats.red++;
        } else if (winner === 1) { // Amarelo
          stats.yellow++;
        } else { // Empate
          stats.draw++;
        }
        return this.gameService.updateStatistics(stats);
      })
    ).subscribe({
      next: (updatedStats) => console.log('Estatísticas atualizadas:', updatedStats),
      error: (err) => console.error('Erro ao atualizar estatísticas:', err)
    });
  }

  checkWinner(): 1 | 2 | null {
    // Lógica para verificar vencedor (horizontal, vertical, diagonal)
    // ... (Esta lógica precisa ser implementada ou recuperada)
    // Placeholder - Implementar a lógica de verificação completa
    return null;
  }

  checkDraw(): boolean {
    // Verifica se todas as células do topo estão preenchidas
    return this.board.every(col => col[0] !== 0);
  }
}