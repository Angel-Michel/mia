/**
 * Generador de Confeti Personalizado con Canvas
 * Dibuja formas geométricas, corazones, flores y emojis (⚽, 🌮, ❤️, 🌹, ✨)
 */
(function () {
    const canvas = document.getElementById('canvas-confetti');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particulas = [];
    let animando = false;
    let animId = null;

    function redimensionar() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', redimensionar);
    redimensionar();

    const EMOJIS = ['❤️', '💖', '⚽', '🌮', '🌹', '✨', '🖤'];
    const COLORES = ['#ff0044', '#ff4d79', '#00ff88', '#ffbe0b', '#ffffff', '#9b5de5'];

    class Particula {
        constructor(x, y, opciones = {}) {
            this.x = x !== undefined ? x : Math.random() * canvas.width;
            this.y = y !== undefined ? y : -20;
            this.esEmoji = Math.random() < 0.45;
            this.emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
            this.color = COLORES[Math.floor(Math.random() * COLORES.length)];
            this.tamano = this.esEmoji ? Math.random() * 16 + 18 : Math.random() * 8 + 6;
            this.vx = (Math.random() - 0.5) * (opciones.explosion ? 14 : 4);
            this.vy = opciones.explosion ? -(Math.random() * 12 + 6) : (Math.random() * 3 + 2);
            this.gravedad = 0.25;
            this.rotacion = Math.random() * Math.PI * 2;
            this.vRotacion = (Math.random() - 0.5) * 0.15;
            this.opacidad = 1;
            this.vida = 0;
            this.maxVida = Math.random() * 120 + 80;
        }

        actualizar() {
            this.vy += this.gravedad;
            this.x += this.vx;
            this.y += this.vy;
            this.rotacion += this.vRotacion;
            this.vida++;
            if (this.vida > this.maxVida - 30) {
                this.opacidad -= 0.035;
            }
            return this.opacidad > 0 && this.y < canvas.height + 50;
        }

        dibujar(contexto) {
            contexto.save();
            contexto.translate(this.x, this.y);
            contexto.rotate(this.rotacion);
            contexto.globalAlpha = Math.max(0, this.opacidad);

            if (this.esEmoji) {
                contexto.font = `${this.tamano}px serif`;
                contexto.textAlign = 'center';
                contexto.textBaseline = 'middle';
                contexto.fillText(this.emoji, 0, 0);
            } else {
                contexto.fillStyle = this.color;
                contexto.fillRect(-this.tamano / 2, -this.tamano / 2, this.tamano, this.tamano * 0.7);
            }

            contexto.restore();
        }
    }

    function bucleAnimacion() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particulas = particulas.filter((p) => {
            const vive = p.actualizar();
            if (vive) p.dibujar(ctx);
            return vive;
        });

        if (particulas.length > 0) {
            animId = requestAnimationFrame(bucleAnimacion);
        } else {
            animando = false;
        }
    }

    /**
     * Dispara una lluvia festiva de confeti temático
     * @param {number} cantidad - Cantidad de partículas
     * @param {boolean} explosion - Si nacen de una explosión central
     */
    window.lanzarConfeti = function (cantidad = 80, explosion = false) {
        const origenX = canvas.width / 2;
        const origenY = explosion ? canvas.height * 0.6 : 0;

        for (let i = 0; i < cantidad; i++) {
            particulas.push(new Particula(
                explosion ? origenX + (Math.random() - 0.5) * 60 : undefined,
                explosion ? origenY : undefined,
                { explosion }
            ));
        }

        if (!animando) {
            animando = true;
            bucleAnimacion();
        }
    };
})();
