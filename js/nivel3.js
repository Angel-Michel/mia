/**
 * Lógica del Nivel 3: Escáner Biométrico de Identidad (Canvas Neón)
 * Permite dibujar trazos luminosos, limpiar la pizarra y ejecutar una animación de análisis.
 */
(function () {
    const canvas = document.getElementById('pizarra');
    const btnLimpiar = document.getElementById('btn-limpiar-canvas');
    const btnRevelar = document.getElementById('btn-revelar');
    const scannerStatus = document.getElementById('scanner-status');
    const nivel3 = document.getElementById('nivel-3');
    const mensajeFinal = document.getElementById('mensaje-final');
    const contenedor = document.getElementById('contenedor');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let pintando = false;
    let haDibujado = false;

    // Configurar pincel con resplandor neón
    function configurarPincel() {
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#ff0044';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ff0044';
    }

    function obtenerCoordenadas(e) {
        const rect = canvas.getBoundingClientRect();
        const clienteX = e.clientX || (e.touches && e.touches[0].clientX);
        const clienteY = e.clientY || (e.touches && e.touches[0].clientY);
        return {
            x: clienteX - rect.left,
            y: clienteY - rect.top
        };
    }

    function iniciarPosicion(e) {
        pintando = true;
        haDibujado = true;
        configurarPincel();
        dibujar(e);
    }

    function terminarPosicion() {
        pintando = false;
        ctx.beginPath();
    }

    function dibujar(e) {
        if (!pintando) return;
        e.preventDefault();
        const coord = obtenerCoordenadas(e);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(coord.x, coord.y);
    }

    canvas.addEventListener('mousedown', iniciarPosicion);
    canvas.addEventListener('mouseup', terminarPosicion);
    canvas.addEventListener('mousemove', dibujar);

    canvas.addEventListener('touchstart', iniciarPosicion);
    canvas.addEventListener('touchend', terminarPosicion);
    canvas.addEventListener('touchmove', dibujar);

    // Botón para limpiar pizarra
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            haDibujado = false;
            if (scannerStatus) scannerStatus.innerText = 'Pizarra limpia. Dibuja un corazón ❤️';
        });
    }

    // Análisis biométrico y confirmación de identidad
    if (btnRevelar && nivel3 && mensajeFinal && contenedor) {
        btnRevelar.addEventListener('click', () => {
            if (!haDibujado) {
                if (scannerStatus) {
                    scannerStatus.innerText = '⚠️ Por favor, dibuja tu corazón antes de escanear.';
                    scannerStatus.style.color = '#ffbe0b';
                }
                return;
            }

            btnRevelar.disabled = true;
            btnRevelar.innerText = 'ESCANEANDO... ⏳';
            if (window.Sonidos) window.Sonidos.playScanner();

            if (scannerStatus) {
                scannerStatus.style.color = '#00ffaa';
                scannerStatus.innerText = '🔍 Escaneando trazo biométrico...';
            }

            setTimeout(() => {
                if (scannerStatus) scannerStatus.innerText = '⚡ Verificando coincidencia en la base de datos...';
                if (window.Sonidos) window.Sonidos.playScanner();
            }, 800);

            setTimeout(() => {
                if (scannerStatus) scannerStatus.innerText = '💖 Coincidencia: 1000% | Identidad: MÍA';
                if (window.Sonidos) window.Sonidos.playFanfare();
                if (window.lanzarConfeti) window.lanzarConfeti(60, true);
            }, 1600);

            setTimeout(() => {
                nivel3.classList.add('oculto');
                mensajeFinal.classList.remove('oculto');
                contenedor.style.borderColor = 'rgba(255, 0, 68, 0.4)';
                contenedor.style.boxShadow = '0 0 35px rgba(255, 0, 68, 0.3)';

                if (window.iniciarMusica) window.iniciarMusica();
            }, 2400);
        });
    }
})();
