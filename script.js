const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const screenContract = document.getElementById('screen-contract');
const screenLetter = document.getElementById('screen-letter');

let noCount = 0;
const frasesNo = [
    "¿Segura? 🥺",
    "Piénsalo bien... 💔",
    "¡MIRA EL OTRO BOTÓN! 👉",
    "No vale decir que no 😜",
    "¡Error: Botón roto!"
];

// Botón "NO" que se mueve al tocarlo o pasar el ratón
btnNo.addEventListener('touchstart', moverBotonNo);
btnNo.addEventListener('mouseover', moverBotonNo);

function moverBotonNo(e) {
    e.preventDefault();
    
    if (noCount < frasesNo.length) {
        btnNo.innerText = frasesNo[noCount];
        noCount++;
    }

    // El botón SÍ se hace más grande
    const scale = 1 + (noCount * 0.12);
    btnYes.style.transform = `scale(${scale})`;

    // Posición aleatoria
    const padding = 20;
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth - padding * 2);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight - padding * 2);

    btnNo.style.position = 'fixed';
    btnNo.style.left = `${Math.max(padding, x)}px`;
    btnNo.style.top = `${Math.max(padding, y)}px`;
}

// Al pulsar SÍ
btnYes.addEventListener('click', () => {
    screenContract.classList.remove('active');
    screenContract.classList.add('hidden');

    setTimeout(() => {
        screenContract.style.display = 'none';
        screenLetter.style.display = 'block';
        
        setTimeout(() => {
            screenLetter.classList.remove('hidden');
            screenLetter.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }, 400);

    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4b6e', '#ff758c', '#ffffff']
    });
});

// INTERACCIÓN DE LA PILA DE POLAROIDS
const stack = document.getElementById('polaroid-stack');

stack.addEventListener('click', () => {
    const topPolaroid = stack.lastElementChild;
    if (!topPolaroid) return;

    // Animación de deslizar hacia afuera
    topPolaroid.style.transform = 'translateY(-120%) rotate(15deg)';
    topPolaroid.style.opacity = '0';

    setTimeout(() => {
        // Mover al fondo de la pila
        topPolaroid.style.transform = '';
        topPolaroid.style.opacity = '1';
        stack.insertBefore(topPolaroid, stack.firstElementChild);
    }, 350);
});

// ANIMACIÓN INTERACTIVA AL PULSAR "TE AMO"
function lluviaCorazones() {
    // 1. Confeti desde las dos esquinas
    confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4b6e', '#ff758c', '#ffffff']
    });
    confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4b6e', '#ff758c', '#ffffff']
    });

    // 2. Activar la pantalla emergente animada
    const loveModal = document.getElementById('love-modal');
    loveModal.classList.add('active');

    // 3. Generar la lluvia continua de corazones flotantes
    crearCorazonesFlotantes();
}

function cerrarLoveModal() {
    const loveModal = document.getElementById('love-modal');
    loveModal.classList.remove('active');
}

function crearCorazonesFlotantes() {
    const container = document.getElementById('floating-hearts-container');
    container.innerHTML = ''; // Limpiar anteriores
    const emojis = ['❤️', '💖', '💕', '💗', '✨', '💘'];

    for (let i = 0; i < 16; i++) {
        const heart = document.createElement('span');
        heart.classList.add('mini-floating-heart');
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 85 + 5 + '%';
        heart.style.animationDelay = Math.random() * 1.5 + 's';
        heart.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
        container.appendChild(heart);
    }
}