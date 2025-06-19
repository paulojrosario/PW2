import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.html',
  styleUrls: ['./board.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Board {
  rows = 6;
  cols = 7;
  board: number[][] = [];
  currentPlayer = 1;
  hoveredCol: number | null = null;
  winner: number | null = null;
  gameActive: boolean = false;
  gameOver: boolean = false;
  colFull: boolean = false;

  constructor() {
    this.resetBoard();
    this.newGame();
  }

  resetBoard() {
    this.board = Array.from({ length: this.cols }, () => Array(this.rows).fill(0));
  }

  play(colIdx: number) {
    if (!this.gameActive || this.winner !== null) return;

    if (this.board[colIdx][0]) {
      this.colFull = true;
      return;
    }
    this.colFull = false;

    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[colIdx][row] === 0) {
        this.board[colIdx][row] = this.currentPlayer;

        const winner = this.checkWinner();
        if (winner) {
          this.winner = winner;
          this.gameActive = false;
          this.gameOver = true;
          return;
        }

        if (this.checkDraw()) {
          this.gameActive = false;
          this.gameOver = true;
          this.winner = null;
          return;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        break;
      }
    }
}

newGame() {
    this.resetBoard();
    this.winner = null;
    this.gameActive = true;
    this.gameOver = false;
    this.currentPlayer = Math.floor(Math.random() * 2) + 1;
  }

checkWinner(): number | null {

    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.board[col][row] !== 0) {
          const player = this.board[col][row];

          // Check horizontal
          if (col + 3 < this.cols &&
              player === this.board[col + 1][row] &&
              player === this.board[col + 2][row] &&
              player === this.board[col + 3][row]) {
            return player;
          }

          // Check vertical
          if (row + 3 < this.rows &&
              player === this.board[col][row + 1] &&
              player === this.board[col][row + 2] &&
              player === this.board[col][row + 3]) {
            return player;
          }

          // Check diagonal /
          if (col - 3 >= 0 && row + 3 < this.rows &&
              player === this.board[col - 1][row + 1] &&
              player === this.board[col - 2][row + 2] &&
              player === this.board[col - 3][row + 3]) {
            return player;
          }

          // Check diagonal \
          if (col + 3 < this.cols && row + 3 < this.rows &&
              player === this.board[col + 1][row + 1] &&
              player === this.board[col + 2][row + 2] &&
              player === this.board[col + 3][row + 3]) {
            return player;
          }
        }
      }
    }
    return null;
  }

  checkDraw() {
    for (let col = 0; col < this.cols; col++) {
      if (this.board[col][0] === 0) {
        this.winner = null;
        return false;
      }
    }
    return true;
  }

}
