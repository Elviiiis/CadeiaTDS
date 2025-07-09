
const turmas = [
  'SEM TURMA','6º A','6º B','6º C','6º D','7º A','7º B','7º C','7º D',
  '8º A','8º B','8º C','8º D','8º E','9º A','9º B','9º C','9º D',
  '1º A','1º B','1º C','1º D','2º A','2º B','2º C','3º A','3º B','3º C',
  '1º FORMAÇÃO A','1º FORMAÇÃO B','2º FORMAÇÃO A','2º FORMAÇÃO B','3º FORMAÇÃO A',
  '1º ENF A','2º ENF A','1º TDS A','2º TDS A','3º TDS A','1º ADM A','2º ADM B','3º ADM C','1º ELETRO A'
];

const filtroSelect = document.getElementById("filtroTurma");
const tabelaLiberados = document.getElementById("tabelaLiberados");

let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

// Função para preencher filtro só com turmas que têm liberados e mostrar contagem
function preencherFiltroComContagem() {
  filtroSelect.innerHTML = "";

  // Conta liberados por turma
  const contagem = {};

  cadastros.forEach(c => {
    if (c.liberado) {
      contagem[c.turma] = (contagem[c.turma] || 0) + 1;
    }
  });

  // Opção para mostrar todos
  const optTodos = document.createElement("option");
  optTodos.value = "";
  optTodos.textContent = "Todas as turmas";
  filtroSelect.appendChild(optTodos);

  // Adiciona turmas que têm liberados com a contagem
  Object.entries(contagem).forEach(([turma, total]) => {
    const opt = document.createElement("option");
    opt.value = turma;
    opt.textContent = `${turma} (${total})`;
    filtroSelect.appendChild(opt);
  });

  // Se nenhuma turma tiver liberados, manter só "Todas as turmas"
  if (Object.keys(contagem).length === 0) {
    filtroSelect.innerHTML = "";
    filtroSelect.appendChild(optTodos);
  }
}

// Atualiza a tabela exibindo os liberados filtrados ou todos
function atualizarTabelaLiberados(lista = cadastros) {
  tabelaLiberados.innerHTML = "";

  // Só liberados
  const liberados = lista.filter(c => c.liberado);

  if (liberados.length === 0) {
    tabelaLiberados.innerHTML = `<tr><td colspan="5">Nenhum preso liberado encontrado.</td></tr>`;
    return;
  }

  liberados.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.turma}</td>
      <td>${item.entrada}</td>
      <td>${item.horaFinal}</td>
      <td>${item.tipo}</td>
    `;
    tabelaLiberados.appendChild(tr);
  });
}

function filtrarTurma() {
  const turma = filtroSelect.value;
  if (turma === "") {
    atualizarTabelaLiberados();
    return;
  }
  const filtrados = cadastros.filter(c => c.liberado && c.turma === turma);
  atualizarTabelaLiberados(filtrados);
}

function mostrarTodos() {
  filtroSelect.value = "";
  atualizarTabelaLiberados();
}

// Eventos
document.getElementById("btnFiltrar").addEventListener("click", filtrarTurma);
document.getElementById("btnMostrarTodos").addEventListener("click", mostrarTodos);

// Inicializa filtro e tabela
preencherFiltroComContagem();
atualizarTabelaLiberados();

  document.getElementById('btnLimpar').addEventListener('click', () => {
    localStorage.clear();
    alert('Local Storage apagado!');
  });
