import { toast } from "react-toastify";


interface ModalOptions {
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;
    mode: "warning" | "info" | "success" | "error";
    confirmAction: () => void | Promise<void>;
    cancelAction: () => void | Promise<void>;
}

const defaultOptions: ModalOptions = {
    title: "¡Advertencia!",
    content: "¿Estás seguro de que deseas realizar esta acción?",
    confirmText: "Eliminar",
    cancelText: "Cancelar",
    confirmAction: () => { },
    cancelAction: () => { },
    mode: "warning",
}

export async function askModal(options: ModalOptions = defaultOptions): Promise<void> {
    const toastid = "ask-modal"
    const ps = new Promise((resolve, reject) => {
        const verifyAction = () => (
            <div>
                <div className="modal-body">
                    <div className="text-center">
                        <h4 className={`text-${options.mode}`}>{options.title}</h4>
                        <p>{options.content}</p>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-center w-100">
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
                        data-bs-dismiss="modal"
                        onClick={() => reject("Cancelled by user")}>{options.cancelText}</button>
                    <button
                        type="button"
                        className={`btn btn-${options.mode} btn-sm me-2 mb-2 hover-elevate-down`}
                        data-bs-dismiss="modal"
                        onClick={() => resolve("Accepted By user")}>{options.confirmText}</button>
                </div>
            </div>
        )

        toast[options.mode](verifyAction, { autoClose: false, icon: false, closeOnClick: false, closeButton: false, toastId: toastid })
    })

    await ps
        .then(() => {
            console.log("accepted")
            toast.dismiss(toastid)
            options.confirmAction()
        })
        .catch(() => {
            console.log("cancelled")
            toast.dismiss(toastid)
            options.cancelAction()
        })
}