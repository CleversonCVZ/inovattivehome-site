// Formulário de contato: monta a mensagem e abre o WhatsApp
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var WHATSAPP_NUMBER = '5541991510243';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = form.nome.value.trim();
    var telefone = form.telefone.value.trim();
    var tipo = form.tipo.value;
    var mensagem = form.mensagem.value.trim();

    var texto = 'Olá! Meu nome é ' + nome + '.' +
      '\nTelefone: ' + telefone +
      '\nTipo de projeto: ' + tipo +
      (mensagem ? '\nDetalhes: ' + mensagem : '');

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
    window.open(url, '_blank');
  });
})();
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Menu mobile: abre/fecha o nav ao clicar no hambúrguer
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  function closeMenu() {
    toggle.classList.remove('open');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // fecha ao clicar em qualquer link do menu (inclusive antes da transição de página)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // fecha se a tela for redimensionada pra desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeMenu();
  });
})();

// Keypad de cenas: destaca o botão selecionado e rola até a seção de serviços correspondente
document.querySelectorAll('.scene-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.scene-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
  });
});

// Transição suave entre páginas: fade-out antes de navegar, e rolagem
// animada até a âncora quando a página de destino carrega com um #hash
(function () {
  var DURATION = 260;

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest('a[href]');
    if (!link) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    if (link.hostname !== window.location.hostname) return;

    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return; // âncora na própria página: mantém o scroll suave nativo

    e.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(function () {
      window.location.href = link.href;
    }, DURATION);
  });

  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      // evita o salto instantâneo padrão do navegador até a âncora
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      window.addEventListener('load', function () {
        window.setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      });
    }
  }
})();

// Mini carrossel de fotos dentro de cards de produto (setas esquerda/direita)
document.querySelectorAll('.product-carousel').forEach(function (wrap) {
  var images = [];
  try {
    images = JSON.parse(wrap.getAttribute('data-images') || '[]');
  } catch (e) {
    images = [];
  }
  if (images.length < 2) return;

  var img = wrap.querySelector('.service-card-img');
  var prevBtn = wrap.querySelector('.carousel-arrow-prev');
  var nextBtn = wrap.querySelector('.carousel-arrow-next');
  var idx = 0;

  function show(i) {
    idx = (i + images.length) % images.length;
    img.src = images[idx];
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { show(idx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { show(idx + 1); });
});

// Carrossel de projetos: navegação por setas
(function () {
  var track = document.getElementById('carousel-track');
  var carousel = document.getElementById('portfolio-carousel');
  if (!track || !carousel) return;

  var prevBtn = carousel.querySelector('.carousel-prev');
  var nextBtn = carousel.querySelector('.carousel-next');
  var scrollAmount = 360;

  prevBtn.addEventListener('click', function () {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', function () {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
})();
