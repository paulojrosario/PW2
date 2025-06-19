import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Board } from './board/board';

@Component({
  selector: 'app-root',
  imports: [Navbar, Board],
  templateUrl: './app.html',                                                                                                                                                                                                                                                                                                
  styleUrl: './app.css'
})
export class App {
  protected title = 'Projeto';
}
