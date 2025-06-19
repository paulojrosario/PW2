// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Board } from './board/board'; // Mudei para o componente Board
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const routes: Routes = [
    { path: '', redirectTo: '/play', pathMatch: 'full' }, // Redireciona a raiz para /play
    { path: 'play', component: Board },
    { path: 'statistics', component: StatisticsComponent },
    // Adicionar aqui a rota para a simulação quando a criar
];