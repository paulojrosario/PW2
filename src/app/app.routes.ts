import { Routes } from '@angular/router';
import { Board } from './board/board';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { SimulationComponent } from './pages/simulation/simulation.component';

export const routes: Routes = [
    { path: '', redirectTo: '/play', pathMatch: 'full' },
    { path: 'play', component: Board },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'game/:id', component: GameDetailComponent },
    { path: 'simulation', component: SimulationComponent },
];