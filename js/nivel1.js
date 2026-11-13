/**
 * Lógica del Nivel 1: Impacto y Demolición del Cerrojo
 * Minijuego de ritmo y acción con barra de progreso, combos, efectos y vibración háptica.
 */
(function () {
    const contenedor = document.getElementById('contenedor');
    const nivel2 = document.getElementById('nivel-2');
    const btnGolpear = document.getElementById('btn-golpear');
    const puertaGrafico = document.getElementById('puerta-grafico');
    const barraProgreso = document.getElementById('barra-progreso-relleno');
    const barraTiempo = document.getElementById('barra-tiempo-relleno');
    const comboTexto = document.getElementById('combo-texto');

    if (!btnGolpear || !contenedor) return;

    let golpes = 0;
    let temporizador = null;
    let intervaloTiempo = null;
    let juegoIniciado = false;
    let tiempoRestante = 100; // Porcentaje
    const META = 20; // Número de golpes balanceado y divertido

    const MENSAJES_COMBO = [
        '¡BUEN GOLPE! 💥',
        '¡CON FUERZA! ⚡',
        '¡LA PUERTA CRUJE! 🚪',
        '¡GOLPE CRÍTICO! 🔥',
        '¡YA CASI CAE! 💣'
    ];

    function actualizarBarra() {
        const porcentaje = Math.min(100, Math.round((golpes / META) * 100));
        if (barraProgreso) {
            barraProgreso.style.width = `${porcentaje}%`;
        }

        const intensidad = golpes / META;
        const resplandor = 15 + (intensidad * 45);
        const blanco = Math.round(255 * (1 - intensidad));
        const colorActual = `rgb(255, ${blanco}, ${blanco})`;

        contenedor.style.boxShadow = `0 0 ${resplandor}px ${colorActual}`;
        contenedor.style.borderColor = colorActual;
    }

    function aplicarEfectoImpacto() {
        btnGolpear.classList.remove('shake');
        contenedor.classList.remove('shake-fuerte');
        void btnGolpear.offsetWidth; // Forzar reflow

        btnGolpear.classList.add('shake');
        contenedor.classList.add('shake-fuerte');

        if (puertaGrafico) {
            puertaGrafico.style.transform = `scale(${1 + (golpes / META) * 0.3}) rotate(${(golpes % 2 === 0 ? 3 : -3)}deg)`;
        }

        if (comboTexto) {
            comboTexto.innerText = MENSAJES_COMBO[golpes % MENSAJES_COMBO.length];
        }

        if (window.Sonidos) window.Sonidos.playHit();
        if (navigator.vibrate) navigator.vibrate(40);
    }

    function perderNivel1() {
        limpiarTimers();
        juegoIniciado = false;
        golpes = 0;
        tiempoRestante = 100;
        btnGolpear.innerText = `¡DERRIBAR! (0/${META})`;
        if (barraProgreso) barraProgreso.style.width = '0%';
        if (barraTiempo) {
            barraTiempo.style.width = '100%';
            barraTiempo.style.backgroundColor = '#00ffaa';
        }
        if (comboTexto) comboTexto.innerText = '';
        if (puertaGrafico) puertaGrafico.style.transform = 'scale(1)';

        contenedor.classList.remove('shake-fuerte');
        contenedor.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.2)';
        contenedor.style.borderColor = 'rgba(255, 255, 255, 0.14)';

        window.mostrarAlerta('¡Por poquito! Agarra aire y dale con todo el poder ⚡');
    }

    function limpiarTimers() {
        if (temporizador) clearTimeout(temporizador);
        if (intervaloTiempo) clearInterval(intervaloTiempo);
    }

    function iniciarTemporizador() {
        const duracionTotalMs = 7000; // 7 segundos generosos
        const intervaloMs = 50;
        const decremento = 100 / (duracionTotalMs / intervaloMs);

        intervaloTiempo = setInterval(() => {
            tiempoRestante -= decremento;
            if (barraTiempo) {
                barraTiempo.style.width = `${Math.max(0, tiempoRestante)}%`;
                if (tiempoRestante < 30) {
                    barraTiempo.style.backgroundColor = '#ff0044';
                } else if (tiempoRestante < 60) {
                    barraTiempo.style.backgroundColor = '#ffbe0b';
                }
            }

            if (tiempoRestante <= 0) {
                perderNivel1();
            }
        }, intervaloMs);
    }

    btnGolpear.addEventListener('click', () => {
        if (!juegoIniciado) {
            juegoIniciado = true;
            tiempoRestante = 100;
            iniciarTemporizador();
        }

        golpes++;
        btnGolpear.innerText = `¡GOLPEA! (${golpes}/${META})`;
        actualizarBarra();
        aplicarEfectoImpacto();

        if (golpes >= META) {
            limpiarTimers();
            contenedor.classList.remove('shake-fuerte');
            document.body.classList.add('explosion');

            if (window.Sonidos) window.Sonidos.playFanfare();
            if (window.lanzarConfeti) window.lanzarConfeti(40, true);

            setTimeout(() => {
                document.body.classList.remove('explosion');
                window.mostrarAlerta('💥 ¡BOOM! Puerta derribada con éxito. Accediendo a los túneles oscuros...', () => {
                    contenedor.classList.add('oculto');
                    if (nivel2) {
                        nivel2.classList.remove('oculto');
                    }
                });
            }, 180);
        }
    });
})();
