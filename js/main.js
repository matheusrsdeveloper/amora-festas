'use strict';
(function () {
  // ---- Configuração (altere aqui) ----
  var CONFIG = Object.freeze({
    whatsapp: '5511945327850',   // somente dígitos: 55 + DDD + número
    maxMessageLength: 300
  });

  // ---- Links do WhatsApp (montados só a partir de dados fixos do HTML) ----
  function buildWhatsAppUrl(message) {
    var text = String(message || '').slice(0, CONFIG.maxMessageLength);
    var url = new URL('https://wa.me/' + CONFIG.whatsapp);
    url.searchParams.set('text', text);
    return url.href;
  }
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', buildWhatsAppUrl(el.getAttribute('data-wa')));
    el.setAttribute('rel', 'noopener noreferrer');
    el.setAttribute('target', '_blank');
  });

  // ---- Menu mobile ----
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  function setMenu(open) {
    menu.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { setMenu(menu.classList.contains('hidden')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // ---- FAQ (acordeão) ----
  var buttons = document.querySelectorAll('.faq-btn');
  function closeAll() {
    buttons.forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.setAttribute('data-open', 'false');
      var icon = b.querySelector('svg'); if (icon) icon.classList.remove('rotate-45');
    });
  }
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wasOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.setAttribute('data-open', 'true');
        var icon = btn.querySelector('svg'); if (icon) icon.classList.add('rotate-45');
      }
    });
  });

  // ---- Ano do rodapé e ícones ----
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  if (window.lucide) window.lucide.createIcons();
})();
