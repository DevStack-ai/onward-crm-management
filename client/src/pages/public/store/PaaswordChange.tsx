import { useAuth } from "../../../providers"
import { changePassword } from "../../users/helpers/_requests"
import { KTIcon } from "metronic/helpers"
import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import { toast } from "react-toastify"
import { Base64 } from "js-base64";

function PasswordChange() {

    const [show, setShow] = useState(false)

    const { currentUser, logout } = useAuth()
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function submit() {

        try {

            setLoading(true)
            toast.loading('Cambiando contraseña')

            const payload = {
                password: Base64.encode(password)
            }

            await changePassword(currentUser?.cli_codigo || 0, payload)
            toast.dismiss()
            toast.success('Contraseña cambiada correctamente')

            setTimeout(() => {
                logout()
            }, 3000)

        } catch (e) {

            toast.dismiss()
            toast.error('Error al cambiar contraseña')

        } finally {
            setLoading(false)
        }
    }

    return (
        <>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group'>
                        <label>Nueva contraseña</label>
                        <input
                            type="password"
                            className='form-control form-control-solid'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Repetir contraseña</label>
                        <input
                            type="password"
                            className='form-control form-control-solid'
                            onChange={e => setRePassword(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className='btn btn-secondary'
                        disabled={loading}
                        type="button" onClick={() => setShow(false)}
                    >Cancelar</button>

                    <button
                        className='btn btn-primary'
                        disabled={password !== rePassword || !password}
                        onClick={submit}
                        type="button"
                    >Guardar</button>
                </Modal.Footer>
            </Modal>

            { }
            <div className='d-flex align-items-center pointer' onClick={() => setShow(true)}>
                <KTIcon iconName='setting' className='h6' style={{ fontSize: "20px" }} />
                <h2 className='mx-4'>
                    Cambiar contraseña
                </h2>
            </div>
        </>
    )
}


export default PasswordChange