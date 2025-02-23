// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;

  // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);

  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }

  // Caso exista armário(s) disponíveil, seguimos sorteando uma opção. 
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

  // Registrar a data e hora da reserva
  let dataReserva = new Date();

  // Calcular a data e hora de entrega das chaves (24 horas depois)
  let dataEntrega = new Date(dataReserva);
  dataEntrega.setHours(dataEntrega.getHours() + 24);

  // Adicionar as informações no armário reservado
  armarioSorteado.dataReserva = dataReserva;
  armarioSorteado.dataEntrega = dataEntrega;

  // Depois localizamos o armário emprestado na lista de armarios e mudamos o status do armário.
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id).status = false;

  // Finalmente, mudamos a pendencia do usuário para verdadeira.
  usuario.pendencia = true;

  // Impmimimos uma mensagem de reserva para o usuário, incluindo a data de entrega das chaves.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! A chave deve ser devolvida até: ${dataEntrega.toLocaleString()}`;

  console.log(usuario);
  console.log(armarios);
}
