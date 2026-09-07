document.addEventListener("DOMContentLoaded", () => {
  // 1. MENU HAMBÚRGUER MOBILE
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Fechar o menu ao clicar em qualquer link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // 2. MÁSCARA DE TELEFONE/WHATSAPP EM TEMPO REAL
  const telInput = document.getElementById("telefone");

  telInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número

    if (value.length > 11) value = value.slice(0, 11);

    // Formatação de DD + Número: (83) 9XXXX-XXXX
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    e.target.value = value;
  });

  // 3. ENVIO DA RESERVA DIRETO PARA O WHATSAPP DO FÁBIO
  const contactForm = document.getElementById("contactForm");
  const errorNome = document.getElementById("error-nome");
  const errorTelefone = document.getElementById("error-telefone");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const nome = document.getElementById("nome").value.trim();
    const telefone = telInput.value.trim();
    const pessoas = document.getElementById("pessoas").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    // Reset de mensagens de erro na tela
    if (errorNome) errorNome.textContent = "";
    if (errorTelefone) errorTelefone.textContent = "";

    let isValid = true;

    // Validação de Nome
    if (nome.length < 3) {
      if (errorNome)
        errorNome.textContent = "Por favor, informe seu nome completo.";
      isValid = false;
    }

    // Validação de Telefone (Apenas os dígitos numéricos)
    const telUnformatted = telefone.replace(/\D/g, "");
    if (telUnformatted.length < 10) {
      if (errorTelefone)
        errorTelefone.textContent =
          "Por favor, informe um WhatsApp válido com DDD.";
      isValid = false;
    }

    if (!isValid) return;

    // 🟢 NÚMERO DO FÁBIO (55 + DDD 83 + Número)
    const numeroFabio = "558335788325";

    // Montagem do texto formatado
    let textoMensagem = `*NOVA SOLICITAÇÃO DE RESERVA* 🌊🍺%0A%0A`;
    textoMensagem += `*Nome:* ${encodeURIComponent(nome)}%0A`;
    textoMensagem += `*Telefone:* ${encodeURIComponent(telefone)}%0A`;
    textoMensagem += `*Pessoas:* ${encodeURIComponent(pessoas)}%0A`;

    if (mensagem) {
      textoMensagem += `*Observação/Data:* ${encodeURIComponent(mensagem)}%0A`;
    }

    // Link para acionar a API do WhatsApp
    const urlWhatsapp = `https://wa.me/${numeroFabio}?text=${textoMensagem}`;

    // Abre o WhatsApp em uma nova guia
    window.open(urlWhatsapp, "_blank");
  });
});
