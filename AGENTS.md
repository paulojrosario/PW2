# Instruções para Agentes — 4 em Linha (PW2)

## Contexto
Trabalho final de PW2: jogo de 4 em linha em Angular 20 (standalone components) com
`json-server` como API. UI e comentários em português (pt-PT).

## Antes de Começar
Ler, e tratar como fonte de verdade:
- `docs/PRD.md` — o que se constrói e o que está fora de âmbito
- `docs/DESIGN_SYSTEM.md` — aspeto
- `docs/ARCHITECTURE.md` — estrutura, modelo de dados, endpoints
Depois, ver os componentes existentes antes de criar um novo.
Se os ficheiros se contradisserem ou faltar uma decisão importante, perguntar antes de assumir.

## Regras Gerais
- Componentes standalone, um por pasta, com `.ts`, `.html` e `.css`.
- Os componentes em uso seguem o padrão `*.component.ts` (`StatisticsComponent`,
  `SimulationComponent`, `GameDetailComponent`). Seguir esse padrão.
- Todo o acesso à API passa pelo `GameService`; os componentes não chamam `HttpClient` diretamente.
- Não adicionar dependências nem mudar de arquitetura (ex.: NgRx, backend real) sem perguntar.
- Quando uma decisão de produto, design ou arquitetura muda, atualizar o ficheiro de `docs/` correspondente.

## Código
- TypeScript estrito; usar as interfaces `Game` e `Stats` do serviço, nada de `any` novo.
- Tabuleiro é `[coluna][linha]`, linha 0 = topo; 1 = Amarelo, 2 = Vermelho, 0 = vazio.
- Injeção com `inject()`, como no código atual.
- Subscrições: tratar `error` (pelo menos `console.error`) e mostrar mensagem ao utilizador quando fizer sentido.

## Design
Seguir `docs/DESIGN_SYSTEM.md`: tabuleiro azul, peças amarela/vermelha, reutilizar `.cell`,
`.yellow`, `.red`. Textos visíveis em português.

## Segurança
- O URL da API está em `GameService.apiUrl`; não espalhar URLs pelos componentes.
- Não renderizar HTML vindo da API (sem `innerHTML` com dados).
- Não há segredos neste projeto; se surgirem, ficam fora do git.

## Comandos
```bash
npm install
npm run api      # json-server em http://localhost:3000 (src/app/db.json)
npm start        # ng serve em http://localhost:4200
npm run build
npm test         # Karma + Jasmine
```

## Definição de Concluído
`npm run build` sem erros, `npm test` a passar, e testar no browser com `npm run api` +
`npm start`: jogar uma partida até ao fim, ver nas Estatísticas, abrir o detalhe e correr a Simulação.

## Problemas Conhecidos (não esconder, corrigir quando pedido)
- `checkWinner()` em `src/app/board/board.ts` devolve sempre `null`.
- `README.md` tem marcadores de conflito de merge (`<<<<<<<`, `>>>>>>>`).
- Ficheiros de scaffold não usados: `pages/statistics/statistics.*`, `pages/simulation/simulation.*`, `services/game.ts`.
- `.gitignore.rtf` é um ficheiro RTF, não um `.gitignore`.
- Cores de amarelo/vermelho diferentes entre páginas.

## Limites (perguntar primeiro)
- Apagar ou reescrever dados de `db.json`.
- Alterar o formato de `Game` (quebra jogos guardados e a Simulação).
- Mudar o fluxo de entrega (push direto para `main` é o atual; confirmar se é o desejado).
