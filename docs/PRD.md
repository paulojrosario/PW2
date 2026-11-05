# Documento de Requisitos do Produto — 4 em Linha (PW2)

## Visão Geral
- **Produto:** 4 em Linha — trabalho final de PW2 (Programação Web 2).
- **Descrição:** jogo de 4 em linha para dois jogadores no mesmo browser, com histórico de jogos, estatísticas e repetição animada do último jogo.
- **Visão:** demonstrar uma aplicação Angular completa (componentes standalone, rotas, serviços, HttpClient) ligada a uma API REST simulada.

## Problema
O trabalho final precisa de mostrar domínio de Angular numa aplicação real com estado, navegação e persistência, e não apenas páginas estáticas.

## Objetivo
Dois jogadores conseguem jogar uma partida completa, o resultado fica guardado, e é possível consultar estatísticas, ver o detalhe de cada jogo e rever o último jogo jogada a jogada.

## Utilizadores-Alvo
- Dois jogadores locais no mesmo computador.
- Docente / avaliador de PW2.

## Funcionalidades Principais
| Rota | Ecrã | O que faz |
|---|---|---|
| `/play` (por defeito) | Tabuleiro | grelha 7×6, jogador inicial aleatório, pré-visualização da peça ao passar na coluna, aviso de coluna cheia, botão "New Game" |
| `/statistics` | Estatísticas | vitórias Amarelo / Vermelho / empates e lista de jogos (mais recente primeiro) |
| `/game/:id` | Detalhe do jogo | tabuleiro final e informação de um jogo guardado |
| `/simulation` | Simulação | repete o último jogo jogada a jogada a partir do histórico `moves` |

## Fluxos de Utilizador
1. **Jogar:** abrir `/play` → jogadores alternam cliques nas colunas → vitória ou empate → jogo guardado + estatísticas atualizadas → "New Game".
2. **Consultar:** Navbar → Estatísticas → clicar num jogo → `/game/:id`.
3. **Rever:** Navbar → Simulação → iniciar → o último jogo é reproduzido passo a passo.

## Requisitos
**Funcionais**
- Detetar vitória (4 em linha horizontal, vertical e nas duas diagonais) e empate (tabuleiro cheio).
- Guardar cada jogo terminado com data, tabuleiro, vencedor e lista de jogadas (`moves`).
- Atualizar o contador de estatísticas (`red`, `yellow`, `draw`) no fim de cada jogo.

**UX**
- Interface em português (pt-PT): "Jogar", "Estatísticas", "Simulação", "Amarelo", "Vermelho", "Empate".
- Jogador atual sempre visível enquanto o jogo está ativo.

**Plataforma**
- Angular 20, browser desktop. API local com `json-server` em `http://localhost:3000`.

## Métricas de Sucesso
- Uma partida completa termina corretamente em vitória ou empate.
- Cada jogo terminado aparece nas Estatísticas e no Detalhe.
- A Simulação reproduz o último jogo exatamente como foi jogado.
- `ng build` e `ng test` passam.

## Fora de Âmbito
- Jogo online / multijogador remoto, contas de utilizador.
- Adversário controlado por IA.
- Backend real ou base de dados (só `json-server`).
- Versão mobile otimizada.

## Lacunas Conhecidas
- **`checkWinner()` em `board.ts` ainda é um placeholder que devolve sempre `null`** — hoje nenhum jogo termina em vitória.
- Os jogos antigos em `db.json` (abril 2024) usam outro formato (`player`, `isOver`, booleanos) — decidir se se migram ou apagam.
