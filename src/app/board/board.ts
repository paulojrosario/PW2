import { Component, inject } from '@angular/core'; // Importar inject
import { CommonModule } from '@angular/common';
import { GameService, Game, Stats } from '../services/game.service'; // Importar o serviço e as interfaces
import { switchMap } from 'rxjs/operators';

@Component({
})
export class Board {
  // ... (as suas propriedades atuais)
  private gameService = inject(GameService); // Injetar o serviço

  // ... (resto do código)

  // Modifique o método play para chamar a função que guarda o jogo
  play(colIdx: number) {
    if (!this.gameActive || this.winner !== null) return;
    
    // (a sua lógica de jogada existente...)

    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[colIdx][row] === 0) {
        this.board[colIdx][row] = this.currentPlayer;

        const winner = this.checkWinner();
        if (winner) {
          this.winner = winner;
          this.gameActive = false;
          this.gameOver = true;
          this.handleEndGame(winner); // Chamar a nova função
          return;
        }

        if (this.checkDraw()) {
          this.gameActive = false;
          this.gameOver = true;
          this.winner = null;
          this.handleEndGame(null); // Chamar a nova função para empate
          return;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        break;
      }
    }
  }

  handleEndGame(winner: number | null) {
    // 1. Guardar o jogo
    const gameToSave: Game = {
      date: new Date().toISOString(),
      game: {
        board: this.board,
        winner: winner,
      }
    };

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
}