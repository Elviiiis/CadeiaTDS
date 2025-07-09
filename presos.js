let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
const tabela = document.getElementById("tabela");

function atualizarTabela() {
  tabela.innerHTML = "";
  const agora = new Date();
  const horaAtual = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

  cadastros.forEach((item, index) => {
    if (item.liberado) return;

    const passouTempo = horaAtual >= item.horaFinal;
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.turma}</td>
      <td>${item.entrada}</td>
      <td>${item.horaFinal}</td>
      <td>${item.tipo}</td>
      <td>
        <button onclick="liberar(${index})">Liberar</button>
        <button onclick="removerCadastro(${index})">Remover</button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

function liberar(index) {
  cadastros[index].liberado = true;
  cadastros[index].liberadoHora = new Date().toLocaleTimeString();
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
  atualizarTabela();
}

function removerCadastro(index) {
  if (confirm("Deseja remover este cadastro?")) {
    cadastros.splice(index, 1);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));
    atualizarTabela();
  }
}

atualizarTabela();
