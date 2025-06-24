const celulas = document.querySelectorAll('.celula');
const mensagem = document.getElementById('mensagem');
const vitoriasX = document.getElementById('vitoriasX');
const vitoriasO = document.getElementById('vitoriasO');
let jogador = 'X';
let jogoAtivo = true;
let modoJogo = 'humano';
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

const combinacoesVitoria = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function selecionarModo(radio) {
  modoJogo = radio.value;
  reiniciar();
}

function verificarVencedor() {
  for (let combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao;
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      jogoAtivo = false;
      mensagem.textContent = `Jogador ${tabuleiro[a]} venceu!`;

      if (tabuleiro[a] === 'X') {
        vitoriasX.textContent = parseInt(vitoriasX.textContent) + 1;
      } else {
        vitoriasO.textContent = parseInt(vitoriasO.textContent) + 1;
      }

      return;
    }
  }

  if (!tabuleiro.includes("")) {
    jogoAtivo = false;
    mensagem.textContent = "Empate!";
  }
}

function botJogada() {
  if (!jogoAtivo) return;
  let opcoes = tabuleiro.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  let jogada = opcoes[Math.floor(Math.random() * opcoes.length)];
  setTimeout(() => {
    tabuleiro[jogada] = 'O';
    celulas[jogada].textContent = 'O';
    celulas[jogada].classList.add('O');
    verificarVencedor();
    jogador = 'X';
  }, 500);
}

function clicarCelula(e) {
  const index = e.target.dataset.index;

  if (tabuleiro[index] !== "" || !jogoAtivo) return;

  tabuleiro[index] = jogador;
  e.target.textContent = jogador;
  e.target.classList.add(jogador);

  verificarVencedor();

  if (jogoAtivo) {
    jogador = jogador === "X" ? "O" : "X";

    if (modoJogo === 'bot' && jogador === 'O') {
      botJogada();
    }
  }
}

celulas.forEach(c => c.addEventListener('click', clicarCelula));

function reiniciar() {
  tabuleiro = ["", "", "", "", "", "", "", "", ""];
  celulas.forEach(c => {
    c.textContent = "";
    c.classList.remove("X", "O");
  });
  jogador = 'X';
  jogoAtivo = true;
  mensagem.textContent = "";
}
