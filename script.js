document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MENU HAMBÚRGUER MOBILE
  // ==========================================
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // ==========================================
  // 2. TROCA DINÂMICA DE MAPAS (UNIDADE 1 E 2)
  // ==========================================
  const btnUnidade1 = document.getElementById("btn-unidade1");
  const btnUnidade2 = document.getElementById("btn-unidade2");
  const mapIframe = document.getElementById("mapIframe");

  // Insira os links embed do Google Maps de cada unidade
  const mapUrls = {
    unidade1:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0000!2d-34.8000!3d-7.1000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0LDRgNGC!5e0!3m2!1spt-BR!2sbr",
    unidade2:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.1000!2d-34.8100!3d-7.1100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0LDRgNGC!5e0!3m2!1spt-BR!2sbr",
  };

  if (btnUnidade1 && btnUnidade2 && mapIframe) {
    btnUnidade1.addEventListener("click", (e) => {
      e.preventDefault();
      btnUnidade1.classList.add("active");
      btnUnidade2.classList.remove("active");
      mapIframe.src = mapUrls.unidade1;
    });

    btnUnidade2.addEventListener("click", (e) => {
      e.preventDefault();
      btnUnidade2.classList.add("active");
      btnUnidade1.classList.remove("active");
      mapIframe.src = mapUrls.unidade2;
    });
  }

  // ==========================================
  // 3. MÁSCARA DE TELEFONE / WHATSAPP
  // ==========================================
  const telInput = document.getElementById("telefone");

  if (telInput) {
    telInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);

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

  // ==========================================
  // 4. ENVIO DA RESERVA VIA WHATSAPP
  // ==========================================
  const contactForm = document.getElementById("contactForm");
  const errorNome = document.getElementById("error-nome");
  const errorTelefone = document.getElementById("error-telefone");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const unidadeSelect = document.getElementById("unidade");
      const unidadeTexto = unidadeSelect
        ? unidadeSelect.options[unidadeSelect.selectedIndex].text
        : "Não especificada";
      const nome = document.getElementById("nome").value.trim();
      const telefone = telInput ? telInput.value.trim() : "";
      const pessoas = document.getElementById("pessoas")
        ? document.getElementById("pessoas").value
        : "";
      const mensagem = document.getElementById("mensagem")
        ? document.getElementById("mensagem").value.trim()
        : "";

      if (errorNome) errorNome.textContent = "";
      if (errorTelefone) errorTelefone.textContent = "";

      let isValid = true;

      if (nome.length < 3) {
        if (errorNome)
          errorNome.textContent = "Por favor, informe seu nome completo.";
        isValid = false;
      }

      const telUnformatted = telefone.replace(/\D/g, "");
      if (telUnformatted.length < 10) {
        if (errorTelefone)
          errorTelefone.textContent =
            "Por favor, informe um WhatsApp válido com DDD.";
        isValid = false;
      }

      if (!isValid) return;

      // Substitua pelo número real no formato 55 + DDD + Número
      const numeroDestino = "5500000000000";

      let textoMensagem = `*NOVA SOLICITAÇÃO DE RESERVA*\n\n`;
      textoMensagem += `📍 *Unidade:* ${unidadeTexto}\n`;
      textoMensagem += `👤 *Nome:* ${nome}\n`;
      textoMensagem += `📞 *WhatsApp:* ${telefone}\n`;
      if (pessoas) textoMensagem += `👥 *Pessoas:* ${pessoas}\n`;
      if (mensagem) textoMensagem += `📝 *Observação/Data:* ${mensagem}\n`;

      const urlWhatsapp = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${encodeURIComponent(textoMensagem)}`;
      window.open(urlWhatsapp, "_blank");
    });
  }

  // ==========================================
  // 5. CARROSSEL DE ESPECIALIDADES
  // ==========================================
  const galeriaGrid = document.getElementById("galeriaGrid");
  const prevBtn = document.getElementById("slideLeft");
  const nextBtn = document.getElementById("slideRight");

  if (galeriaGrid && prevBtn && nextBtn) {
    const scrollAmount = 320;

    prevBtn.addEventListener("click", () => {
      galeriaGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      galeriaGrid.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
});
