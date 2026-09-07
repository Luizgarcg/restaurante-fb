document.addEventListener("DOMContentLoaded", () => {
  // 1. MENU HAMBÚRGUER MOBILE
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Fechar o menu ao clicar em qualquer link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // 2. MÁSCARA DE TELEFONE/WHATSAPP EM TEMPO REAL
  const telInput = document.getElementById("telefone");

  if (telInput) {
    telInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove não numéricos

      if (value.length > 11) value = value.slice(0, 11);

      // Formatação (83) 9XXXX-XXXX
      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }

      e.target.value = value;
    });
  }

  // 3. ENVIO DA RESERVA DIRECIONADO PELA UNIDADE
  const contactForm = document.getElementById("contactForm");
  const errorNome = document.getElementById("error-nome");
  const errorTelefone = document.getElementById("error-telefone");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Impede o recarregamento da página

      const unidade = document.getElementById("unidade").value;
      const nome = document.getElementById("nome").value.trim();
      const telefone = telInput ? telInput.value.trim() : "";
      const pessoas = document.getElementById("pessoas").value;
      const mensagem = document.getElementById("mensagem").value.trim();

      // Reset de mensagens de erro
      if (errorNome) errorNome.textContent = "";
      if (errorTelefone) errorTelefone.textContent = "";

      let isValid = true;

      // Validação de Nome
      if (nome.length < 3) {
        if (errorNome)
          errorNome.textContent = "Por favor, informe seu nome completo.";
        isValid = false;
      }

      // Validação de Telefone
      const telUnformatted = telefone.replace(/\D/g, "");
      if (telUnformatted.length < 10) {
        if (errorTelefone)
          errorTelefone.textContent =
            "Por favor, informe um WhatsApp válido com DDD.";
        isValid = false;
      }

      if (!isValid) return;

      // 🟢 MAPEAMENTO DOS NÚMEROS DAS UNIDADES
      const numerosWhatsApp = {
        manaira: "5583999718429", // WhatsApp Manaíra
        bessa: "558382342232", // WhatsApp Bessa
      };

      const numeroDestino = numerosWhatsApp[unidade] || "5583999718429";
      const nomeUnidade =
        unidade === "bessa" ? "Unidade Bessa" : "Unidade Manaíra";

      // Montagem do texto formatado
      let textoMensagem = `*NOVA SOLICITAÇÃO DE RESERVA* 🌊🍺\n\n`;
      textoMensagem += `📍 *Unidade:* ${nomeUnidade}\n`;
      textoMensagem += `👤 *Nome:* ${nome}\n`;
      textoMensagem += `📞 *WhatsApp:* ${telefone}\n`;
      textoMensagem += `👥 *Pessoas:* ${pessoas}\n`;

      if (mensagem) {
        textoMensagem += `📝 *Observação/Data:* ${mensagem}\n`;
      }

      // Link para acionar a API do WhatsApp
      const urlWhatsapp = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${encodeURIComponent(textoMensagem)}`;

      // Abre o WhatsApp em uma nova guia
      window.open(urlWhatsapp, "_blank");
    });
  }

  // 4. TROCA DINÂMICA DO MAPA (MANAÍRA / BESSA)
  const btnManaira = document.getElementById("btn-manaira");
  const btnBessa = document.getElementById("btn-bessa");
  const mapIframe = document.getElementById("mapIframe");

  const mapUrls = {
    manaira:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2354.157374875667!2d-34.83665813684384!3d-7.102224654035136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7acdd2d71215549%3A0x15558676f3b73bb5!2sFabio%20Beach%20Bar%20e%20Restaurante%20especialista%20em%20frutos%20do%20mar%20e%20comida%20t%C3%ADpica%20nordestina%20-%20Mana%C3%ADra!5e0!3m2!1spt-BR!2sbr!4v1788804214494!5m2!1spt-BR!2sbr",
    bessa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7864.405395255936!2d-34.84584298227709!3d-7.06165406650398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7acdde3b9d00a55%3A0x9270a4adb5e0a43c!2sFabio%20Beach%20Bar%20e%20Restaurante!5e0!3m2!1spt-BR!2sbr!4v1788814666923!5m2!1spt-BR!2sbr",
  };

  if (btnManaira && btnBessa && mapIframe) {
    btnManaira.addEventListener("click", () => {
      btnManaira.classList.add("active");
      btnBessa.classList.remove("active");
      mapIframe.src = mapUrls.manaira;
    });

    btnBessa.addEventListener("click", () => {
      btnBessa.classList.add("active");
      btnManaira.classList.remove("active");
      mapIframe.src = mapUrls.bessa;
    });
  }

  // 5. NAVEGAÇÃO DO CARROSSEL DE ESPECIALIDADES
  const galeriaGrid = document.querySelector(".galeria-grid");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (galeriaGrid && prevBtn && nextBtn) {
    const scrollAmount = 300; // Distância do scroll a cada clique

    prevBtn.addEventListener("click", () => {
      galeriaGrid.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      galeriaGrid.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  }
});
