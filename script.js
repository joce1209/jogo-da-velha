const celulas = document.querySelectorAll('.celula');
const mensagem = document.getElementById('mensagem');
let jogador = 'X';
let jogoAtivo = true;
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

const combinacoesVitoria = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function verificarVencedor() {
  for (let combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao;
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      jogoAtivo = false;
      mensagem.textContent = `Jogador ${tabuleiro[a]} venceu!`;
      return;
    }
  }

  if (!tabuleiro.includes("")) {
    jogoAtivo = false;
    mensagem.textContent = "Empate!";
  }
}

function clicarCelula(e) {
  const index = e.target.dataset.index;
  if (tabuleiro[index] === "" && jogoAtivo) {
    tabuleiro[index] = jogador;
    e.target.textContent = jogador;
    verificarVencedor();
    jogador = jogador === "X" ? "O" : "X";
  }
}

celulas.forEach(celula => celula.addEventListener('click', clicarCelula));

function reiniciar() {
  tabuleiro = ["", "", "", "", "", "", "", "", ""];
  celulas.forEach(celula => celula.textContent = "");
  jogador = "X";
  jogoAtivo = true;
  mensagem.textContent = "";
}