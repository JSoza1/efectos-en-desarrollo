// Variable que controla si estamos en modo oscuro o no
let isDarkMode = false;

// Obtiene la referencia a la capa de oscurecimiento
const darkOverlay = document.getElementById('darkOverlay');

// Selecciona todos los elementos de texto (títulos y párrafos)
const textElements = document.querySelectorAll('h1, p');

// Función que divide el texto en caracteres individuales
function splitTextIntoChars(element) {
    // Guarda el texto original
    const text = element.innerText;
    // Limpia el contenido actual
    element.innerHTML = '';
    // Crea un span para cada carácter
    for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span');
        // Agrega clase especial si es un espacio
        charSpan.className = 'char' + (text[i] === ' ' ? ' space' : '');
        charSpan.innerText = text[i];
        element.appendChild(charSpan);
    }
}

// Procesa todos los elementos de texto encontrados
textElements.forEach(element => {
    splitTextIntoChars(element);
});

// Variable para controlar la animación
let animationFrameId = null;

// Función que se ejecuta al hacer clic en el botón
function toggleDarkMode() {
    if (!isDarkMode) {
        // Mueve el overlay a la vista
        darkOverlay.style.left = '0';
        startAnimation(true);
    } else {
        // Oculta el overlay
        darkOverlay.style.left = '-100%';
        startAnimation(false);
    }
    // Cambia el estado del modo
    isDarkMode = !isDarkMode;
}

// Función que maneja la animación de los caracteres
function startAnimation(toWhite) {
    // Detiene cualquier animación previa
    stopAnimation();

    // Obtiene todos los caracteres y el ancho de la ventana
    const chars = document.querySelectorAll('.char');
    const overlayWidth = window.innerWidth;

    // Función que actualiza el color de cada carácter
    function updateTextColors() {
        // Obtiene la posición actual del overlay
        const currentLeft = parseFloat(window.getComputedStyle(darkOverlay).left);
        
        // Procesa cada carácter
        chars.forEach((char) => {
            // Obtiene la posición del carácter
            const charRect = char.getBoundingClientRect();
            const charPosition = charRect.left + charRect.width / 2;

            // Determina si el carácter debe cambiar de color
            const isCovered = toWhite 
                ? charPosition <= currentLeft + overlayWidth
                : charPosition >= currentLeft + overlayWidth;

            // Aplica el color correspondiente
            char.style.color = isCovered ? (toWhite ? 'white' : 'black') : (toWhite ? 'black' : 'white');
        });

        // Continúa la animación si es necesario
        if (currentLeft > -overlayWidth && currentLeft < overlayWidth) {
            animationFrameId = requestAnimationFrame(updateTextColors);
        }
    }

    // Inicia la actualización de colores
    updateTextColors();
}

// Función para detener la animación
function stopAnimation() {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}