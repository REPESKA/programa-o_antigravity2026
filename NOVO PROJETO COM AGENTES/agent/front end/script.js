/**
 * script.js - Funções de controle e interações padronizadas
 * para atender à Regra 4: Aplique um efeito de transição fade entre páginas ou elementos.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Ao carregar a página inteira, aplica-se o efeito fade na tag Body
    // Visto que o index.html inicializa o body com opacity: 0;
    const bodyEl = document.body;
    bodyEl.classList.add("fade-in");

    // Intercepta todos os links <a href="..."> para aplicar fade out antes de ir para a proxima pagina
    const pageLinks = document.querySelectorAll("a:not([target='_blank'])");
    
    pageLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            // Se for link interno (# algo) a gente ignora pra n dar refresh
            if (this.getAttribute("href").startsWith("#")) return;

            e.preventDefault();
            const targetUrl = this.href;

            // Dispara fade out
            bodyEl.classList.remove("fade-in");
            bodyEl.classList.add("fade-out");

            // Aguarda duracao da animacao (0.4s configurada no CSS) antes do redirecionamento
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 400); 
        });
    });
});

/**
 * Função utilitária para aplicar Transição/Fade in/out em qualquer elemento HTML pelo ID
 * Pode ser usada pelos agentes de front-end quando criarem modais e containers interativos.
 * @param {string} elementId - IDs definidos no HTML
 */
function toggleElementFade(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (el.classList.contains("fade-in") || (el.style.display !== 'none' && !el.classList.contains("fade-hidden") && !el.classList.contains("fade-out"))) {
        // Elemento está ativo, devemos desligar
        el.classList.remove("fade-in");
        el.classList.add("fade-out");

        // Após animar, aplicar display none para soltar o espaço do fluxo flexível do CSS
        setTimeout(() => {
            el.style.display = "none";
            el.classList.add("fade-hidden");
        }, 400); // 400ms bate com --transition-speed no CSS global
    } else {
        // Elemento está escondido, vamos mostrar
        el.classList.remove("fade-hidden");
        el.style.display = "block"; // Removendo display:none do inline js pra preparar no DOM
        
        // Timeout minimo assíncrono pro browser entender o block e só depois ativar classe opacity/translate
        setTimeout(() => {
            el.classList.remove("fade-out");
            el.classList.add("fade-in");
        }, 15);
    }
}
