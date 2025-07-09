 const turmas = [
    // Seu array de turmas aqui (igual ao exemplo anterior)
    
    'SEM TURMA','6º A','6º B','6º C','6º D','7º A','7º B','7º C','7º D',
    '8º A','8º B','8º C','8º D','8º E','9º A','9º B','9º C','9º D',
    '1º A','1º B','1º C','1º D','2º A','2º B','2º C','3º A','3º B','3º C',
    '1º FORMAÇÃO A','1º FORMAÇÃO B','2º FORMAÇÃO A','2º FORMAÇÃO B','3º FORMAÇÃO A',
    '1º ENF A','2º ENF A','1º TDS A','2º TDS A','3º TDS A','1º ADM A','2º ADM B','3º ADM C','1º ELETRO A'
  ];

const turmaSelect = document.getElementById("turma");
turmas.forEach(t => {
  const opt = document.createElement("option");
  opt.value = t;
  opt.textContent = t;
  turmaSelect.appendChild(opt);
});

let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

function somaMinutos(hora, minutosASomar) {
  const [h, m] = hora.split(':').map(Number);
  const total = h * 60 + m + minutosASomar;
  const horas = Math.floor(total / 60) % 24;
  const minutos = total % 60;
  return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
}

document.getElementById("formulario").addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const turma = turmaSelect.value;
  const entrada = document.getElementById("entrada").value;
  const fichas = Number(document.getElementById("fichas").value);
  const tipo = document.getElementById("tipo").value;

  if (!nome || !turma || !entrada || !fichas || !tipo) return alert("Preencha todos os campos.");

  const horaFinal = somaMinutos(entrada, fichas * 5);

  const duplicado = cadastros.find(c =>
    c.nome.toLowerCase() === nome.toLowerCase() &&
    c.turma === turma &&
    !c.liberado
  );

  if (duplicado) {
    alert(`${nome} já está cadastrado(a) na turma ${turma} e ainda não foi liberado.`);
    return;
  }

  cadastros.push({ nome, turma, entrada, horaFinal, tipo, fichas, liberado: false });
  localStorage.setItem("cadastros", JSON.stringify(cadastros));

  e.target.reset();
  alert("Cadastro realizado com sucesso!");
});
