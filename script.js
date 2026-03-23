document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    
    // Efecto de scroll en navbar y animaciones reveal
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        
        document.querySelectorAll('.reveal').forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - 150) reveal.classList.add('active');
        });
    });

// --- LÓGICA DE CARRUSELES ---
function iniciarCarrusel(containerId, intervalo = 5000) {
    const container = document.getElementById(containerId);
    if (!container) return; // Seguridad por si el ID no existe

    const slides = container.querySelectorAll(".slide");
    const dots = container.querySelectorAll(".dot");
    let index = 0;
    let timer;

    // Función para mostrar un slide específico
    function show(n) {

    // 1. Limpiar el temporizador actual para que no salte mientras procesamos
        clearInterval(timer);

        const currentSlide = slides[index];
        if (currentSlide && currentSlide.tagName === "VIDEO") {
            currentSlide.pause();
            currentSlide.currentTime = 0;
        }

        index = (n + slides.length) % slides.length; 
        
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        const nextSlide = slides[index];
        if (nextSlide) {
            nextSlide.classList.add("active");
            
            if (nextSlide.tagName === "VIDEO") {
                // --- LÓGICA ESPECIAL PARA VIDEO ---
                nextSlide.play();

                // Cuando el video termine, pasamos al siguiente automáticamente
                nextSlide.onended = () => {
                    show(index + 1);
                    resetTimer(); // Reanudamos el carrusel normal
                };
            } else {
                // Si es imagen, reanudamos el temporizador normal (3s, 4s, etc.)
                resetTimer();
            }
        }
        if (dots[index]) dots[index].classList.add("active");        
    }

    // Función para reiniciar el temporizador cuando el usuario interactúa
    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => show(index + 1), intervalo);
    }

    // Configurar eventos para los DOTS
    dots.forEach((dot, i) => {
        dot.onclick = () => {
            show(i);
            resetTimer();
        };
    });

    // Configurar botones (Siguiente/Anterior) si existen
    const btnNext = container.querySelector(".next");
    const btnPrev = container.querySelector(".prev");

    if(btnNext) btnNext.onclick = () => { show(index + 1); resetTimer(); };
    if(btnPrev) btnPrev.onclick = () => { show(index - 1); resetTimer(); };
    

    // Iniciar el auto-play
    timer = setInterval(() => show(index + 1), intervalo);
    
    // Mostrar el primero por defecto al cargar
    show(0);
}

// --- INICIALIZACIÓN DE CADA CARRUSEL ---
iniciarCarrusel("carousel-historia", 5000);
iniciarCarrusel("carousel-galeria", 4000);
iniciarCarrusel("carousel-padres", 3000);

});

// --- Años de experiencia ---

// Definimos el año de inicio
const startYear = 2013;
// Obtenemos el año actual del sistema
const currentYear = new Date().getFullYear();
// Calculamos la diferencia
const experience = currentYear - startYear;
// Insertamos el resultado en el HTML
document.getElementById('years-xp').textContent = experience;

// /*Anuncios*/
const modal = document.getElementById('promo-modal');
const closeBtn = document.getElementById('close-modal');

// Mostrar el anuncio 2 segundos después de cargar la página
window.onload = function() {
    setTimeout(() => {
        // Solo lo mostramos si no tiene la clase 'manual-off' (por si quieres apagarlo del todo)
        modal.classList.remove('hidden');
    }, 2000); 
};

// Cerrar al hacer clic en la X
closeBtn.onclick = () => modal.classList.add('hidden');

// Cerrar al hacer clic fuera de la tarjeta (en el fondo oscuro)
window.onclick = (event) => {
    if (event.target == modal) modal.classList.add('hidden');
};