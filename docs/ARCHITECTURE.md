# Arquitetura — 4 em Linha (PW2)

## Visão Geral
```
Browser
  ↓
Angular 20 (standalone components, http://localhost:4200)
  ├── Navbar + <router-outlet>
  ├── Board · Statistics · GameDetail · Simulation
  └── GameService (HttpClient)
          ↓  REST JSON
json-server (http://localhost:3000)  →  src/app/db.json
```

## Stack
| Camada | Escolha |
|---|---|
| Framework | Angular 20 (standalone components, `provideRouter`, `provideHttpClient`) |
| Linguagem | TypeScript ~5.8 |
| Estado assíncrono | RxJS 7.8 (`switchMap`, `forkJoin`, `map`) |
| API | `json-server` 1.0 beta sobre `src/app/db.json` |
| Testes | Karma + Jasmine |

## Estrutura do Projeto
```
src/
  main.ts, index.html, styles.css
  app/
    app.ts / app.html        raiz: <app-navbar> + <router-outlet>
    app.config.ts            router + HttpClient
    app.routes.ts            '' → /play, play, statistics, game/:id, simulation
    db.json                  dados do json-server
    navbar/                  barra de navegação
    board/                   tabuleiro e lógica do jogo
    services/game.service.ts GameService + interfaces Game, Stats
    pages/
      statistics/  statistics.component.*   (em uso)
      game-detail/ game-detail.component.*
      simulation/  simulation.component.*   (em uso)
docs/                        PRD, DESIGN_SYSTEM, ARCHITECTURE
```
Ficheiros de scaffold **não usados** (gerados pelo CLI, sem rota): `pages/statistics/statistics.ts|html|css`, `pages/simulation/simulation.ts|html|css`, `services/game.ts`. Os `*.spec.ts` respetivos testam estes ficheiros e não os componentes reais.

## Modelo de Dados
```ts
interface Game {
  id?: string;               // gerado pelo json-server
  date: string;              // ISO
  game: {
    board: (0|1|2)[][];      // [coluna][linha], linha 0 = topo; 0 vazio, 1 amarelo, 2 vermelho
    winner: 1 | 2 | null;    // null = empate
    moves: number[];         // índices das colunas por ordem de jogada
  };
}
interface Stats { id: '1'; red: number; yellow: number; draw: number; }
```

## Fluxo de Dados
1. `Board.play(col)` coloca a peça na primeira célula vazia de baixo para cima e regista `moves`.
2. Fim de jogo → `GameService.saveGame()` (`POST /games`).
3. Em paralelo → `getStatistics()` (`GET /statistics/1`) → incrementa → `updateStatistics()` (`PUT /statistics/1`).
4. Estatísticas: `forkJoin` de `GET /statistics/1` + `GET /games` (ordenados por data desc).
5. Simulação: `getLastGame()` → reproduz `moves` num tabuleiro vazio.

## Endpoints (json-server)
| Método | Caminho | Uso |
|---|---|---|
| GET | `/games` | lista de jogos |
| GET | `/games/:id` | detalhe |
| POST | `/games` | guardar jogo |
| GET / PUT | `/statistics/1` | contador global |

## Serviços Externos
Nenhum. Só o `json-server` local. O URL está fixo em `GameService.apiUrl` — se mudar, passar para `environment`.

## Deploy
Projeto académico, corre localmente: `npm run api` + `npm start`. `ng build` gera `dist/`. Sem deploy público.

## Notas de Escalabilidade
- O PUT de estatísticas é ler-incrementar-escrever: com dois separadores abertos pode perder contagens. Alternativa: calcular estatísticas a partir de `/games`.
- Os jogos ficam em ficheiro JSON; não serve para produção.
