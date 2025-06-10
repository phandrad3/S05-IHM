document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (event) {
    const curso = document.getElementById("curso").value;
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (!curso || !usuario || !senha) {
      event.preventDefault(); // Impede envio se faltar algum campo
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  });
});
