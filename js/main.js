/**
 * Orquestador Principal del Juego y Respuestas de la Cita
 * Conecta los eventos de navegación, desbloqueo de la carta y confirmación de la cita.
 */
(function () {
    const btnIniciar = document.getElementById('btn-iniciar');
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const nivel1 = document.getElementById('nivel-1');
    const mensajeFinal = document.getElementById('mensaje-final');
    const cartaSecreta = document.getElementById('carta-secreta');
    const btnAbrirCarta = document.getElementById('btn-abrir-carta');

    // Botones de la cita
    const btnCitaSi = document.getElementById('btn-cita-si');
    const btnCitaObvio = document.getElementById('btn-cita-obvio');
    const respuestaCita = document.getElementById('respuesta-cita');

    // 1. Iniciar la aventura
    if (btnIniciar && pantallaInicio && nivel1) {
        btnIniciar.addEventListener('click', () => {
            pantallaInicio.classList.add('oculto');
            nivel1.classList.remove('oculto');
            if (window.Sonidos) window.Sonidos.playHit();
        });
    }

    // 2. Desencriptar Carta Secreta
    if (btnAbrirCarta && mensajeFinal && cartaSecreta) {
        btnAbrirCarta.addEventListener('click', () => {
            mensajeFinal.classList.add('oculto');
            cartaSecreta.classList.remove('oculto');

            if (window.Sonidos) window.Sonidos.playFanfare();
            if (window.lanzarConfeti) window.lanzarConfeti(80, true);

            // Desplazar suavemente hacia la carta
            cartaSecreta.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 3. Confirmación de la Cita con Tacos y Postre
    function confirmarCita(tipo) {
        if (!respuestaCita) return;

        if (tipo === 'si') {
            respuestaCita.innerHTML = '🌮🖤 ¡Trato hecho! Ya aparté el lugar para los mejores tacos, postre y risas garantizadas.';
        } else {
            respuestaCita.innerHTML = '⚽✨ ¡Gooooolazo! Ya está agendado el día. Va a ser una cita legendaria.';
        }

        if (window.Sonidos) window.Sonidos.playFanfare();
        if (window.lanzarConfeti) {
            window.lanzarConfeti(120, true);
            setTimeout(() => window.lanzarConfeti(80, false), 600);
        }

        if (btnCitaSi) btnCitaSi.style.transform = 'scale(1.05)';
        if (btnCitaObvio) btnCitaObvio.style.transform = 'scale(1.05)';
    }

    if (btnCitaSi) {
        btnCitaSi.addEventListener('click', () => confirmarCita('si'));
    }

    if (btnCitaObvio) {
        btnCitaObvio.addEventListener('click', () => confirmarCita('obvio'));
    }
})();
