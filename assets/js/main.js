/* =========================================================
   SpintaOnline — main.js (JavaScript vanilla)
   Configurazione centralizzata + menu mobile, reveal,
   modulo → messaggio WhatsApp.
   ========================================================= */

/* ---------- Configurazione ---------- */
var CONFIG = {
  // Numero WhatsApp in formato internazionale senza "+" e senza spazi
  whatsappNumber: "393663365553",
  // Messaggio iniziale del contatto
  messageIntro: "Ciao SpintaOnline, vorrei informazioni per un progetto"
};

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var waBase = "https://wa.me/" + CONFIG.whatsappNumber;

  /* ---------- Link WhatsApp centralizzati ---------- */
  function applyWhatsappLinks() {
    var links = document.querySelectorAll("[data-wa-base]");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", waBase);
    }
  }

  /* ---------- Anno nel footer ---------- */
  function applyYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ---------- Header: superficie bianca dopo lo scorrimento ---------- */
  function initHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.querySelector(".sr-only").textContent = open ? "Chiudi il menu" : "Apri il menu";
      syncFloatingCta();
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1100) setOpen(false);
    });
  }

  /* ---------- Animazioni d'ingresso (una sola volta) ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }

  /* ---------- Preselezione del servizio nel modulo ---------- */
  function initPreselect() {
    var select = document.getElementById("f-servizio");
    if (!select) return;

    function choose(wanted) {
      for (var k = 0; k < select.options.length; k++) {
        if (select.options[k].value === wanted) {
          select.selectedIndex = k;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          return;
        }
      }
    }

    // Cross-page links work as static relative URLs, including under file://.
    choose(new URLSearchParams(window.location.search).get("servizio"));
    var links = document.querySelectorAll("[data-preselect]");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        choose(this.getAttribute("data-preselect"));
      });
    }
  }

  /* ---------- Modulo: validazione e messaggio WhatsApp ---------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var textarea = document.getElementById("f-descrizione");
    var counter = document.getElementById("f-count");
    if (textarea && counter) {
      textarea.addEventListener("input", function () {
        counter.textContent = textarea.value.length + " / 800 caratteri";
      });
    }

    function showError(input, message) {
      var field = input.closest(".field");
      var box = field ? field.querySelector(".error") : null;
      if (field) field.classList.add("has-error");
      if (box) {
        box.textContent = message;
        box.hidden = false;
      }
      input.setAttribute("aria-invalid", "true");
    }

    function clearError(input) {
      var field = input.closest(".field");
      var box = field ? field.querySelector(".error") : null;
      if (field) field.classList.remove("has-error");
      if (box) {
        box.textContent = "";
        box.hidden = true;
      }
      input.removeAttribute("aria-invalid");
    }

    var required = [
      { el: document.getElementById("f-nome"), msg: "Inserisci il tuo nome." },
      { el: document.getElementById("f-servizio"), msg: "Seleziona un servizio o un pacchetto." },
      { el: document.getElementById("f-descrizione"), msg: "Descrivi brevemente il progetto." }
    ];

    for (var i = 0; i < required.length; i++) {
      (function (item) {
        if (!item.el) return;
        item.el.addEventListener("input", function () {
          if (item.el.value.trim()) clearError(item.el);
        });
        item.el.addEventListener("change", function () {
          if (item.el.value.trim()) clearError(item.el);
        });
      })(required[i]);
    }

    // Compone il messaggio, escludendo le righe facoltative vuote
    function buildMessage(values) {
      var lines = [CONFIG.messageIntro, ""];
      lines.push("Nome: " + values.nome);
      if (values.attivita) lines.push("Attivit\u00e0: " + values.attivita);
      lines.push("Servizio o pacchetto: " + values.servizio);
      if (values.sito) lines.push("Sito attuale: " + values.sito);
      lines.push("", "Descrizione:", values.descrizione);
      return lines.join("\n");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;

      for (var k = 0; k < required.length; k++) {
        var item = required[k];
        if (!item.el) continue;
        if (!item.el.value.trim()) {
          showError(item.el, item.msg);
          if (!firstInvalid) firstInvalid = item.el;
        } else {
          clearError(item.el);
        }
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var values = {
        nome: document.getElementById("f-nome").value.trim(),
        attivita: document.getElementById("f-attivita").value.trim(),
        servizio: document.getElementById("f-servizio").value.trim(),
        sito: document.getElementById("f-sito").value.trim(),
        descrizione: document.getElementById("f-descrizione").value.trim()
      };

      var url = waBase + "?text=" + encodeURIComponent(buildMessage(values));
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- CTA WhatsApp: testo coerente con la scelta corrente ---------- */
  function syncWhatsappSelection() {
    var select = document.getElementById("f-servizio");
    if (!select) return;
    function update() {
      var message = CONFIG.messageIntro;
      if (select.value) message += "\n\nServizio o pacchetto: " + select.value;
      var links = document.querySelectorAll("[data-wa-base]");
      for (var i = 0; i < links.length; i++) {
        links[i].href = select.value ? waBase + "?text=" + encodeURIComponent(message) : waBase;
      }
    }
    select.addEventListener("change", update);
    update();
  }

  /* ---------- CTA fissa: lascia liberi comandi e contenuti ---------- */
  var floatingSections = {};
  function syncFloatingCta() {
    var float = document.getElementById("wa-float");
    if (!float) return;
    var toggle = document.getElementById("nav-toggle");
    var shouldHide = toggle && toggle.getAttribute("aria-expanded") === "true";
    Object.keys(floatingSections).forEach(function (key) {
      if (floatingSections[key]) shouldHide = true;
    });
    float.classList.toggle("is-hidden", Boolean(shouldHide));
  }

  function initFloatingCta() {
    var float = document.getElementById("wa-float");
    if (!float || !("IntersectionObserver" in window)) return;

    var sections = document.querySelectorAll("#contatti, #pacchetti, #lavori, .site-footer");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var key = entry.target.id || "footer";
          floatingSections[key] = entry.isIntersecting;
        });
        syncFloatingCta();
      },
      { threshold: 0 }
    );
    for (var i = 0; i < sections.length; i++) io.observe(sections[i]);
  }

  /* ---------- Avvio ---------- */
  applyWhatsappLinks();
  applyYear();
  initHeader();
  initNav();
  initReveal();
  initForm();
  initPreselect();
  syncWhatsappSelection();
  initFloatingCta();
})();
