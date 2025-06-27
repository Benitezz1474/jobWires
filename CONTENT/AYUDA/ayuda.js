// Función para mostrar/ocultar respuestas FAQ
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const arrow = element.querySelector('.faq-arrow');
    
    // Toggle de la clase 'open' en la respuesta
    answer.classList.toggle('open');
    
    // Toggle de la clase 'rotated' en la flecha
    arrow.classList.toggle('rotated');
}

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Funciones para los botones de soporte
function openChat() {
    alert('Función de chat en vivo próximamente disponible');
}

function sendEmail() {
    window.location.href = 'mailto:soporte@trabajoplus.com?subject=Consulta de Ayuda';
}

function callSupport() {
    alert('Puedes llamarnos al +598 99 123 456');
}

// Función de búsqueda en la ayuda
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('helpSearch');
    const searchBtn = document.querySelector('.help-search-btn');
    
    function searchHelp() {
        const searchTerm = searchInput.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (!searchTerm) {
            // Si no hay término de búsqueda, mostrar todo
            faqItems.forEach(item => {
                item.style.display = 'block';
            });
            return;
        }
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span:first-child').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                // Resaltar término encontrado (opcional)
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', searchHelp);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchHelp();
        }
    });
});