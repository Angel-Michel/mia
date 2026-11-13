/**
 * Lógica del Nivel 2: Exploración en la Oscuridad (Terror Divertido)
 * Efecto linterna suave, mensajes ambientales dinámicos y rescate de objetivos.
 */
(function () {
    const contenedor = document.getElementById('contenedor');
    const nivel1 = document.getElementById('nivel-1');
    const nivel2 = document.getElementById('nivel-2');
    const nivel3 = document.getElementById('nivel-3');
    const linterna = document.getElementById('linterna');
    const perrito = document.getElementById('perrito');
    const taco = document.getElementById('taco');
    const mensajeTerror = document.getElementById('mensaje-terror');
    const contadorObjetivos = document.getElementById('contador-objetivos');

    if (!nivel2 || !linterna || !perrito || !taco) return;

    let pEncontrado = false;
    let tEncontrado = false;

    const FRASES_AMBIENTE = [
        'Shhh... ¿escuchaste eso? 👻',
        'Un fantasma hincha de fútbol pasó corriendo... ⚽👀',
        'Se detecta un aroma inconfundible a tacos... 🌮',
        'Tu guardián de cuatro patas te está esperando 🐶',
        'Cuidado con las sombras... pero sobre todo diviértete 🖤'
    ];
    let fraseTimer = null;

    function iniciarFrasesAmbiente() {
        let i = 0;
        fraseTimer = setInterval(() => {
            if (pEncontrado && tEncontrado) {
                clearInterval(fraseTimer);
                return;
            }
            if (mensajeTerror) {
                mensajeTerror.style.opacity = '0';
                setTimeout(() => {
                    mensajeTerror.innerText = FRASES_AMBIENTE[i % FRASES_AMBIENTE.length];
                    mensajeTerror.style.opacity = '1';
                    i++;
                }, 200);
            }
        }, 3200);
    }

    function actualizarLinterna(x, y) {
        linterna.style.background = `radial-gradient(circle 140px at ${x}px ${y}px, transparent 0%, rgba(2, 2, 4, 0.985) 100%)`;
    }

    nivel2.addEventListener('mousemove', (e) => actualizarLinterna(e.clientX, e.clientY));
    nivel2.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            actualizarLinterna(e.touches[0].clientX, e.touches[0].clientY);
        }
    });

    // Iniciar con linterna en el centro
    actualizarLinterna(window.innerWidth / 2, window.innerHeight / 2);

    function actualizarContador() {
        const total = (pEncontrado ? 1 : 0) + (tEncontrado ? 1 : 0);
        if (contadorObjetivos) {
            contadorObjetivos.innerText = `Objetivos asegurados: ${total}/2`;
        }
    }

    function checarVictoriaNivel2() {
        actualizarContador();
        if (pEncontrado && tEncontrado) {
            if (fraseTimer) clearInterval(fraseTimer);
            linterna.style.background = 'none';

            if (window.Sonidos) window.Sonidos.playFanfare();
            if (window.lanzarConfeti) window.lanzarConfeti(35, true);

            setTimeout(() => {
                window.mostrarAlerta('🎉 ¡Increíble! Perrito a salvo y tacos asegurados. Accediendo al escáner de identidad...', () => {
                    nivel2.classList.add('oculto');
                    if (contenedor) contenedor.classList.remove('oculto');
                    if (nivel1) nivel1.classList.add('oculto');
                    if (nivel3) nivel3.classList.remove('oculto');
                });
            }, 500);
        }
    }

    perrito.addEventListener('click', () => {
        if (pEncontrado) return;
        pEncontrado = true;
        perrito.classList.add('item-encontrado');
        if (window.Sonidos) window.Sonidos.playItem();
        checarVictoriaNivel2();
    });

    taco.addEventListener('click', () => {
        if (tEncontrado) return;
        tEncontrado = true;
        taco.classList.add('item-encontrado');
        if (window.Sonidos) window.Sonidos.playItem();
        checarVictoriaNivel2();
    });

    // Observar cuando se muestra el nivel 2 para activar los textos
    const observer = new MutationObserver(() => {
        if (!nivel2.classList.contains('oculto')) {
            iniciarFrasesAmbiente();
        }
    });
    observer.observe(nivel2, { attributes: true, attributeFilter: ['class'] });
})();
