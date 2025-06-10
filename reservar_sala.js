let salaAtual = "";
let salaNumero = null;

function selecionarSala(nomeSala, numeroSala) {
  salaAtual = nomeSala;
  salaNumero = numeroSala;

  document.getElementById("salaSelecionada").innerText = `Reservar ${nomeSala}`;
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");

  const dataInput = document.getElementById("dataSelecionadaInput");

  // Define o mínimo para hoje (bloqueia datas anteriores)
  const hoje = new Date();
  const dataHojeFormatada = hoje.toISOString().split("T")[0];
  dataInput.setAttribute("min", dataHojeFormatada);

  dataInput.valueAsDate = hoje; // pré-seleciona hoje

  atualizarDataSelecionada();
}

// Ouvinte do input data para atualizar data e horários
document.addEventListener("DOMContentLoaded", () => {
  const dataInput = document.getElementById("dataSelecionadaInput");
  if (dataInput) {
    dataInput.addEventListener("change", atualizarDataSelecionada);
  }
});

function voltarParaEtapa(etapa) {
  document.querySelectorAll(".screen").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(`step${etapa}`).classList.remove("hidden");
}

function avancarParaConfirmacao() {
  const data = document.getElementById("dataSelecionadaInput").value;
  const horario = document.querySelector("input[name='horario']:checked");
  const pessoas = document.getElementById("qtdPessoas").value;

  if (!data || !horario || !pessoas || pessoas <= 0) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const dataFormatada = new Date(data + "T00:00:00").toLocaleDateString("pt-BR");

  document.getElementById("infoSala").innerText = `${salaAtual} - Biblioteca Inatel`;
  document.getElementById("infoData").innerText = dataFormatada;
  document.getElementById("infoHorario").innerText = horario.value;
  document.getElementById("infoPessoas").innerText = `${pessoas} pessoa(s)`;

  voltarParaEtapa(3);
}

function confirmarReserva() {
  const sala = document.getElementById("infoSala").textContent;
  const data = document.getElementById("infoData").textContent;
  const horario = document.getElementById("infoHorario").textContent;

  const reserva = {
    sala,
    data,
    horario
  };

  localStorage.setItem("reservaSala", JSON.stringify(reserva));

  // Salva a mensagem para mostrar no menu
  const mensagem = `📌 Você reservou a ${reserva.sala} para o dia ${reserva.data}, das ${reserva.horario}.`;
  localStorage.setItem("mensagemReservaSala", mensagem);

  // Redireciona para o menu
  window.location.href = "menu_inatel.html";
}


function atualizarDataSelecionada() {
  const dataInput = document.getElementById("dataSelecionadaInput");
  const dataSelecionadaSpan = document.getElementById("dataSelecionada");

  const [ano, mes, dia] = dataInput.value.split('-').map(Number);
  if (!ano || !mes || !dia) {
    dataSelecionadaSpan.textContent = ""; // vazio se data inválida
    return;
  }

  const data = new Date(ano, mes - 1, dia);

  // Formata no estilo "09 junho 2025"
  const formatada = data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  dataSelecionadaSpan.textContent = formatada;

  gerarHorariosDisponiveis(data);
}

function gerarHorariosDisponiveis(dataSelecionada) {
  const container = document.querySelector("#step2 .box:nth-of-type(2) > div");
  container.innerHTML = "";

  // Limpa seleções anteriores
  document.querySelectorAll("input[name='horario']").forEach(input => input.checked = false);

  const agora = new Date();
  const horarios = [
    { inicio: 8, fim: 10 },
    { inicio: 10, fim: 12 },
    { inicio: 12, fim: 14 },
    { inicio: 14, fim: 16 },
    { inicio: 16, fim: 18 },
    { inicio: 18, fim: 20 },
  ];

  const ehHoje = dataSelecionada.toDateString() === agora.toDateString();
  const horaAtual = agora.getHours();

  const horariosFiltrados = horarios.filter(h => {
    return !ehHoje || h.inicio > horaAtual;
  });

  if (horariosFiltrados.length === 0) {
    container.innerHTML = "<p>⛔ Nenhum horário disponível para hoje.</p>";
    return;
  }

  horariosFiltrados.forEach(h => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "horario";
    radio.value = `${h.inicio}h - ${h.fim}h`;
    radio.setAttribute("title", `${h.inicio}h - ${h.fim}h`);

    label.appendChild(radio);
    label.append(` ${h.inicio}h - ${h.fim}h`);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
}

function buscarSalas() {
  const termo = prompt("Digite o nome ou número da sala:");
  if (!termo) return;

  const salas = document.querySelectorAll("#listaSalas .sala");
  const termoMinusculo = termo.toLowerCase();

  salas.forEach(sala => {
    const nome = sala.dataset.nome.toLowerCase();
    const numero = sala.dataset.numero.toLowerCase();

    if (nome.includes(termoMinusculo) || numero.includes(termoMinusculo)) {
      sala.style.display = ""; // mostra
    } else {
      sala.style.display = "none"; // esconde
    }
  });
}

function filtrarSalas() {
  const termo = document.getElementById("buscaSala").value.toLowerCase();
  const salas = document.querySelectorAll(".sala");

  let algumaSalaVisivel = false;

  salas.forEach((sala) => {
    const nome = sala.querySelector("strong").textContent.toLowerCase();
    const corresponde = nome.includes(termo);
    sala.style.display = corresponde ? "block" : "none";
    if (corresponde) algumaSalaVisivel = true;
  });

  // Verifica se precisa exibir a mensagem "Sala indisponível"
  let aviso = document.getElementById("avisoSala");
  if (!aviso) {
    aviso = document.createElement("p");
    aviso.id = "avisoSala";
    aviso.style.color = "red";
    aviso.style.marginTop = "10px";
    aviso.textContent = "⛔ Sala indisponível.";
    document.getElementById("listaSalas").appendChild(aviso);
  }

  aviso.style.display = algumaSalaVisivel ? "none" : "block";
}
