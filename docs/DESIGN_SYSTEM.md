# Design System — 4 em Linha (PW2)

Os estilos vivem por componente (`*.component.css` / `board.css`). `src/styles.css` está vazio: qualquer regra global nova vai para lá, não repetida em cada componente.

## Direção
Simples e de jogo de tabuleiro: tabuleiro azul, peças redondas amarelas e vermelhas, sem decoração extra. Clareza acima de efeitos.

## Cores
Valores atualmente usados (proposta: passar a variáveis em `:root` de `src/styles.css`):

| Token sugerido | Valor | Uso |
|---|---|---|
| `--board` | `#4357A0` | fundo do tabuleiro |
| `--board-dark` | `#3B4EA0` | variação do tabuleiro (detalhe/simulação) |
| `--cell-empty` | `#001773` | célula vazia |
| `--yellow` | `#FFDE03` | peça amarela (jogador 1) |
| `--red` | `#FF0266` | peça vermelha (jogador 2) |
| `--surface` | `#f0f0f0` | caixas e painéis |
| `--border` | `#ccc` / `#ddd` | bordas |
| `--text-muted` | `#666` | texto secundário |

Há também `#FFD700`, `#DC143C`, `#B22222`, `#FFA500` nas páginas de detalhe/simulação — **unificar com `--yellow` e `--red`** para o amarelo e o vermelho serem iguais em todo o lado.

## Tipografia
Fonte por defeito do browser (nenhuma `font-family` definida). Títulos com `h1` (navbar "4 em Linha") e `h2` (jogador atual). Se se escolher uma fonte, definir só em `src/styles.css`.

## Espaçamento
Valores em uso: 4px (margem das células), 10px (padding do tabuleiro), 20px (margem superior do tabuleiro). Manter múltiplos de 4.

## Raios e Sombras
- Tabuleiro: `border-radius: 10px`.
- Células/peças: `border-radius: 100%`, `aspect-ratio: 1`.
- Sem sombras.

## Componentes
- **Navbar** (`navbar/`): título à esquerda, botões "Jogar", "Estatísticas", "Simulação" com `routerLink`, altura 50px.
- **Tabuleiro** (`board/`): 7 colunas flex; cada coluna é clicável; `.cell` + `.yellow` / `.red`; `.cell.preview` mostra a peça do jogador atual ao passar o rato.
- **Mensagens:** `.player`, `.winnerMessage`, `.drawMessage`, `.errorMessage`.
- Antes de criar um tabuleiro novo noutra página, reutilizar as classes `.cell`, `.yellow`, `.red`.

## Estados
- **Hover:** pré-visualização da peça na coluna.
- **Erro:** "Esta coluna está cheia!".
- **Fim de jogo:** mensagem de vencedor ou "Empate!", pré-visualização escondida.
- **Vazio:** Estatísticas e Simulação devem mostrar uma frase quando não há jogos.

## Responsivo
Não há media queries. O tabuleiro ocupa 40% da largura. Desktop é o alvo; em ecrãs pequenos, considerar `width: min(90vw, 560px)`.

## Acessibilidade
- Colunas são `div` clicáveis: idealmente `button` ou `role="button"` com `tabindex` e teclas.
- Amarelo e vermelho não devem ser a única pista — o texto já indica "Amarelo"/"Vermelho".
- `lang="en"` em `index.html` deve passar a `pt-PT`.
