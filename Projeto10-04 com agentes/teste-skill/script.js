document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('testeBtn');
    
    btn.addEventListener('click', () => {
        // Criando nova notificação com fade
        const message = document.createElement('p');
        message.textContent = "Script rodando! Cor, borda e animação validados com sucesso.";
        message.style.color = "var(--azul-primario)";
        message.style.fontWeight = "bold";
        message.classList.add('fade-in');
        
        document.querySelector('.container').appendChild(message);
        
        // Remove o botão para não adicionar múltiplas mensagens
        btn.style.display = 'none';
    });
});
