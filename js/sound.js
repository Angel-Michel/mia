/**
 * Controlador de Audio y Efectos de Sonido
 * Utiliza Web Audio API nativo (0 dependencias) para efectos y gestiona la música de fondo.
 */
(function () {
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    const Sonidos = {
        /**
         * Golpe de impacto seco para el nivel 1
         */
        playHit: function () {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(120, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);
                gain.gain.setValueAtTime(0.4, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } catch (e) {
                // Silencioso si el navegador bloquea audio inicial
            }
        },

        /**
         * Sonido al encontrar un objeto en la oscuridad
         */
        playItem: function () {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                [440, 554, 659, 880].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.2, now + idx * 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.06);
                    osc.stop(now + idx * 0.06 + 0.15);
                });
            } catch (e) {}
        },

        /**
         * Bip de escaneo biométrico
         */
        playScanner: function () {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.12, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            } catch (e) {}
        },

        /**
         * Fanfarria / Éxito para celebrar niveles y la carta
         */
        playFanfare: function () {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                const notas = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do agudo
                notas.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.25, now + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.1);
                    osc.stop(now + i * 0.1 + 0.35);
                });
            } catch (e) {}
        },

        /**
         * Acorde suave para abrir ramos
         */
        playChime: function () {
            try {
                const ctx = getAudioContext();
                if (!ctx) return;
                const now = ctx.currentTime;
                [659, 830, 987, 1318].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.15, now + i * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.08);
                    osc.stop(now + i * 0.08 + 0.4);
                });
            } catch (e) {}
        }
    };

    window.Sonidos = Sonidos;

    // --- Control de Música de Fondo ---
    const musicaFondo = document.getElementById('musica-fondo');
    const btnAudioToggle = document.getElementById('btn-audio-toggle');
    const audioPulse = document.getElementById('audio-pulse');
    const textoAudio = document.getElementById('texto-audio');

    function actualizarEstadoAudio(reproduciendo) {
        if (!audioPulse || !textoAudio) return;
        if (reproduciendo) {
            audioPulse.classList.add('playing');
            textoAudio.innerText = 'Música: ON 🎵';
        } else {
            audioPulse.classList.remove('playing');
            textoAudio.innerText = 'Música: OFF 🔇';
        }
    }

    window.iniciarMusica = function () {
        if (!musicaFondo) return;
        musicaFondo.volume = 0.7;
        musicaFondo.play().then(() => {
            actualizarEstadoAudio(true);
        }).catch(() => {
            actualizarEstadoAudio(false);
        });
    };

    if (btnAudioToggle && musicaFondo) {
        btnAudioToggle.addEventListener('click', () => {
            getAudioContext();
            if (musicaFondo.paused) {
                musicaFondo.play().then(() => {
                    actualizarEstadoAudio(true);
                }).catch(() => {});
            } else {
                musicaFondo.pause();
                actualizarEstadoAudio(false);
            }
        });

        musicaFondo.addEventListener('ended', () => {
            // Loop automático
            musicaFondo.currentTime = 0;
            musicaFondo.play();
        });
    }
})();
