/**
 * Lógica de la Sección de Ramos con Mensajes
 * Gestiona los ramos interactivos y el recolector de pétalos con dedicatorias
 */
(function () {
    const RAMOS_DATOS = [
        {
            id: 'medianoche',
            icono: '🥀🖤',
            nombre: 'Ramo Medianoche',
            subtitulo: 'Terror & Misterio',
            mensaje: 'Para la niña con la que puedo compartir ese gusto raro por las historias y películas de terror sin que me juzgue 👻. Me encanta lo divertida que eres, nuestras pláticas y cómo encontramos risas donde otros tendrían miedo. Eres única y fascinante.'
        },
        {
            id: 'goleador',
            icono: '⚽💐',
            nombre: 'Ramo Goleador',
            subtitulo: 'Pasión Futbolera',
            mensaje: 'Me fascina cómo te apasionas y cómo te brillan los ojos cuando hablas de fútbol ⚽. Ni el mejor gol de volea en una final de Champions se compara con lo lindo que se siente verte emocionada. ¡Siempre serás mi delantera estrella! 🏆'
        },
        {
            id: 'taquero',
            icono: '🌮🌻',
            nombre: 'Ramo Taquero',
            subtitulo: 'Antojo & Cita Perfecta',
            mensaje: 'Nuestra cita ya es una promesa sellada: una buena orden de tacos bien servidos, una plática de horas donde nos riamos de todo y un postre delicioso para cerrar con broche de oro. Te aseguro que la vamos a pasar genial.'
        },
        {
            id: 'ternura',
            icono: '🐶🌷',
            nombre: 'Ramo Cariño Puro',
            subtitulo: 'Ternura & Perritos',
            mensaje: 'Tu nobleza, la ternura que tienes con los perritos y tu energía tan transparente alegran el día de quien sea. Tienes un corazón hermoso y me encanta la persona que eres. Gracias por ser tan linda conmigo.'
        }
    ];

    const FRASES_PETALOS = [
        '⚽ Tu emoción al hablar de fútbol es mi jugada favorita de la vida.',
        '👻 Contigo hasta las cosas de terror se vuelven divertidas y especiales.',
        '🌮 Te ganaste unos tacos con salsa especial y una plática interminable.',
        '🐶 Tu perrito y yo coincidimos en algo: eres la persona más linda.',
        '🏆 Eres el gol en el minuto 90 que alegra toda la semana.',
        '🍰 El postre de nuestra cita va por mi cuenta, prometido.',
        '✨ Tienes una vibra que contagia alegría a donde vayas.',
        '🖤 Me encanta la complicidad que tenemos, Mía.'
    ];

    let indicePetalo = 0;

    // Elementos del Modal de Ramo
    const modalRamo = document.getElementById('modal-ramo');
    const modalIcono = document.getElementById('modal-ramo-icono');
    const modalTitulo = document.getElementById('modal-ramo-titulo');
    const modalMensaje = document.getElementById('modal-ramo-mensaje');
    const btnCerrarRamo = document.getElementById('btn-cerrar-ramo');

    function abrirRamo(ramo) {
        if (!modalRamo) return;
        modalIcono.innerText = ramo.icono;
        modalTitulo.innerText = ramo.nombre;
        modalMensaje.innerText = `"${ramo.mensaje}"`;
        modalRamo.classList.remove('oculto');

        if (window.Sonidos) window.Sonidos.playChime();
        if (window.lanzarConfeti) window.lanzarConfeti(35, true);
    }

    if (btnCerrarRamo && modalRamo) {
        btnCerrarRamo.addEventListener('click', () => {
            modalRamo.classList.add('oculto');
        });
    }

    // Inicializar tarjetas de ramos
    document.addEventListener('DOMContentLoaded', () => {
        const gridRamos = document.getElementById('ramos-grid');
        if (gridRamos) {
            gridRamos.innerHTML = '';
            RAMOS_DATOS.forEach((ramo) => {
                const card = document.createElement('div');
                card.className = 'ramo-card';
                card.innerHTML = `
                    <div class="ramo-icono">${ramo.icono}</div>
                    <div class="ramo-nombre">${ramo.nombre}</div>
                    <div class="ramo-badge">${ramo.subtitulo}</div>
                    <span style="font-size: 11px; color: #ff0044; margin-top: 4px;">Abrir carta 💌</span>
                `;
                card.addEventListener('click', () => abrirRamo(ramo));
                gridRamos.appendChild(card);
            });
        }

        // Minijuego: Deshojar pétalos
        const btnPetalo = document.getElementById('btn-deshojar-petalo');
        const textoPetalo = document.getElementById('texto-petalo');

        if (btnPetalo && textoPetalo) {
            btnPetalo.addEventListener('click', () => {
                const frase = FRASES_PETALOS[indicePetalo % FRASES_PETALOS.length];
                indicePetalo++;
                textoPetalo.style.opacity = '0';
                setTimeout(() => {
                    textoPetalo.innerText = frase;
                    textoPetalo.style.opacity = '1';
                }, 150);

                if (window.Sonidos) window.Sonidos.playHit();
                if (window.lanzarConfeti) window.lanzarConfeti(15);
            });
        }
    });
})();
