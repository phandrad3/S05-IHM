// MENU E PERFIL
function openMenu() {
  document.getElementById("menu_aba").style.display = "block";
}

function closeMenu() {
  document.getElementById("menu_aba").style.display = "none";
}

function openPerfil() {
  document.getElementById("perfil_aba").style.display = "block";
}

function closePerfil() {
  document.getElementById("perfil_aba").style.display = "none";
}

function togglePerfil() {
  const aba = document.getElementById("perfil_aba");
  aba.style.display = aba.style.display === "block" ? "none" : "block";
}

// TEMA
function temaInatel() {
  document.documentElement.style.setProperty('--cor-click', '#126ae2');
  document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
  document.documentElement.style.setProperty('--cor-text', 'black');
  document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
  document.documentElement.style.setProperty('--cor-back2', '#6a937a');
  document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');
}

function temaDark() {
  const cores = {
    '--cor-click': '#CEF09D',
    '--cor-sombra': '#9b0a59',
    '--cor-text': 'black',
    '--cor-back1': '#38184C',
    '--cor-back2': '#4f6a93',
    '--md-sys-color-primary': '#CEF09D'
  };

  for (const [variavel, valor] of Object.entries(cores)) {
    document.documentElement.style.setProperty(variavel, valor);
  }
}

// PERFIL TOGGLE + FECHAR AO CLICAR FORA
const perfilIcon = document.querySelector('#perfil');
const perfilMenu = document.querySelector('#perfilMenu');

if (perfilIcon && perfilMenu) {
  perfilIcon.addEventListener('click', () => {
    perfilMenu.style.display = (perfilMenu.style.display === 'none' || perfilMenu.style.display === '') ? 'block' : 'none';
  });

  document.addEventListener('click', (event) => {
    if (!perfilMenu.contains(event.target) && !perfilIcon.contains(event.target)) {
      perfilMenu.style.display = 'none';
    }
  });
}

// EVENTOS (CARROSSEL)
document.addEventListener("DOMContentLoaded", function () {
  const eventos = [
    {
      id: 1,
      title: 'Semana do Software 2025',
      date: '12/05',
      time: '10:00',
      location: 'Salão de Eventos',
      type: 'tech',
      description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
      id: 2,
      title: 'Workshop de IoT',
      date: '12/01',
      time: '08:00',
      location: 'Laboratório CS&I',
      type: 'tech',
      description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
      id: 3,
      title: 'Festa dos Alunos 2025',
      date: '18/05',
      time: '19:00',
      location: 'Área Esportiva',
      type: 'cultural',
      description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
      id: 4,
      title: 'Feira de Oportunidades',
      date: '04/05',
      time: '10:00',
      location: 'Salão de Eventos',
      type: 'academic',
      description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
  ];

  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  function createCards() {
    eventos.forEach(event => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <div class="info">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
        </div>
      `;
      carousel.appendChild(card);
    });
  }

  let index = 0;
  let autoSlide;

  function startAutoSlide() {
    autoSlide = setInterval(nextCard, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  function nextCard() {
    index = (index + 1) % eventos.length;
    updateCarousel();
  }

  function prevCard() {
    index = (index - 1 + eventos.length) % eventos.length;
    updateCarousel();
  }

  function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  document.getElementById('nextBtn')?.addEventListener('click', nextCard);
  document.getElementById('prevBtn')?.addEventListener('click', prevCard);

  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
  });

  createCards();
  startAutoSlide();
});

// EXIBE MENSAGEM DE RESERVA
window.addEventListener("DOMContentLoaded", () => {
  const reserva = JSON.parse(localStorage.getItem("reservaSala"));
  if (reserva) {
    const existente = document.getElementById("mns_box");
    if (!existente) {
      const mnsContainer = document.createElement("div");
      mnsContainer.id = "mns_box";

      const mensagem = document.createElement("div");
      mensagem.id = "mns";
      mensagem.className = "font";
      mensagem.textContent = `📌 Você reservou a ${reserva.sala} para o dia ${reserva.data}, das ${reserva.horario}.`;

      mnsContainer.appendChild(mensagem);

      document.body.prepend(mnsContainer); // ou escolha outro contêiner se quiser exibir em lugar específico
    }
  }
});

function mostrarMensagemReserva(reserva) {
  // Remove mensagem antiga, se existir
  const msgAntiga = document.getElementById("mns_box");
  if (msgAntiga) msgAntiga.remove();

  // Cria a mensagem
  const mnsContainer = document.createElement("div");
  mnsContainer.id = "mns_box";

  const mensagem = document.createElement("div");
  mensagem.id = "mns";
  mensagem.className = "font";
  mensagem.textContent = `📌 Você reservou a ${reserva.sala} para o dia ${reserva.data}, das ${reserva.horario}.`;

  mnsContainer.appendChild(mensagem);

  // Adiciona no topo do body ou onde preferir
  document.body.prepend(mnsContainer);
}
