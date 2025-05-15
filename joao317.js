//script para o menu fixo
    const sections = document.querySelectorAll("section[id]");
    const menuLinks = document.querySelectorAll(".menu a");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 80; // compensa o menu fixo
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      menuLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
        //script para o scroll suave

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // anima apenas uma vez
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(element => {
      observer.observe(element);
    });



       //script para o scroll suave
    (() => {
      const elements = document.querySelectorAll('[data-anim]');
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // anima só uma vez
          }
        });
      }, { threshold: 0.2 });

      elements.forEach(el => observer.observe(el));
    })();

  //Script para a animação de valores

    const container = document.querySelector(".card-container");
    const cards = document.querySelectorAll(".card");

    // Mouse hover
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        container.classList.add("hovering");
        card.classList.add("active");
        cards.forEach(c => {
          if (c !== card) c.classList.remove("active");
        });
      });

      card.addEventListener("mouseleave", () => {
        container.classList.remove("hovering");
        card.classList.remove("active");
      });
    });

    // Toque (mobile)
    cards.forEach(card => {
      card.addEventListener("touchstart", (e) => {
        container.classList.add("touching");
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        e.stopPropagation();
      });
    });

    document.addEventListener("touchstart", (e) => {
      if (!e.target.closest(".card")) {
        container.classList.remove("touching");
        cards.forEach(c => c.classList.remove("active"));
      }
    });
 
//script para o formulário de contato

  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();
    const telefone = form.telefone?.value?.trim() || "";

    // Honeypot: campo escondido deve estar vazio
    if (telefone !== "") {
      alert("Spam detectado.");
      return;
    }

    // Verificação de campos
    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Validação de e-mail simples
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      alert("E-mail inválido.");
      return;
    }

    // Envio via fetch
    fetch(form.action, {
      method: form.method,
      body: new FormData(form)
    })
    .then(response => response.text())
    .then(data => {
      if (data.trim() === "OK") {
        form.style.display = 'none';
        document.getElementById('mensagem-enviada').style.display = 'block';
      } else {
        alert("Erro ao enviar: " + data);
      }
    })
    .catch(() => {
      alert("Erro de conexão. Verifique se o servidor com PHP está ativo.");
    });
  });

  //responsividade/ hamburguer
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const menuItems = navLinks.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Fecha o menu ao clicar em um link
  menuItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Animação do menu transparente no topo
  if (scrollTop < 100) {
    headerMenu.classList.add("menu-top");
    headerMenu.classList.remove("menu-normal");
  } else {
    headerMenu.classList.remove("menu-top");
    headerMenu.classList.add("menu-normal");
  }

  // Ativar link de navegação conforme seção visível
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  }); 


  // Sincronizar animação da seção "Nossa História" com a imagem #promo
const promoElement = document.querySelector('#promo');
const historiaElements = document.querySelectorAll('.reveal');

const promoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      historiaElements.forEach(element => {
        element.classList.add('animate');
      });
    } else {
      historiaElements.forEach(element => {
        element.classList.remove('animate');
      });
    }
  });
}, {
  threshold: 0.5 // Ajuste o valor conforme necessário
});

promoObserver.observe(promoElement);

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".depoimento-card");

  cards.forEach((card, index) => {
    // Adiciona delay progressivo para efeito cascata
    card.style.setProperty('--delay', `${index * 0.2}s`);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => {
    observer.observe(card);
  });
});

