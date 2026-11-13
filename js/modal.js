/**
 * Sistema de Ventanas Modales Personalizadas
 * Sustituye a alert() del navegador manteniendo la estética del juego.
 */
(function () {
    const modalSistema = document.getElementById('modal-sistema');
    const textoModal = document.getElementById('texto-modal');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    let callbackModal = null;

    /**
     * Muestra un mensaje modal en pantalla.
     * @param {string} mensaje - Texto a mostrar.
     * @param {Function} [callback] - Acción a ejecutar al cerrar el modal.
     */
    window.mostrarAlerta = function (mensaje, callback) {
        if (!textoModal || !modalSistema) return;
        textoModal.innerText = mensaje;
        modalSistema.classList.remove('oculto');
        callbackModal = callback || null;
    };

    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', () => {
            modalSistema.classList.add('oculto');
            if (callbackModal) {
                const cb = callbackModal;
                callbackModal = null;
                cb();
            }
        });
    }
})();
