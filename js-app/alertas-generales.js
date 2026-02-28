function mostrarAlerta({
    titulo = "Mensaje",
    mensaje = "",
    tipo = "primary" // success | danger | warning | info | primary
}) {

    const modalId = "modalAlertaDinamico";

    // Eliminar si ya existe
    const modalExistente = document.getElementById(modalId);
    if (modalExistente) {
        modalExistente.remove();
    }

    const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header bg-${tipo} text-white">
                        <h5 class="modal-title">${titulo}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        ${mensaje}
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-${tipo}" data-bs-dismiss="modal">
                            Aceptar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();

    // Eliminar del DOM cuando se cierre
    document.getElementById(modalId).addEventListener("hidden.bs.modal", function () {
        this.remove();
    });
}