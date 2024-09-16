import React from "react";
import { AccountantsSectionProps } from "./_types";
import { importAccounts } from "./_requests";
import Select, { components, StylesConfig } from 'react-select'
import clsx from "clsx";
import chroma from "chroma-js";
import { toast } from "react-toastify";
import { useAuth } from "../../../providers";
const ImportAccountsModal = (props: AccountantsSectionProps) => {

    const { currentUser } = useAuth();
    const options = currentUser?.permissions?.map((company) => ({
        value: company.id,
        label: company.name,
    })).filter((company) => company.value !== Number(props.companyId))

    const [askWarning, setAskWarning] = React.useState<boolean>(false)
    const [company, SetCompanies] = React.useState<{ value: number, label: string } | null>(null)
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false)

    const MenuList = (
        props: any,
    ) => {
        return (
            <div>
                <components.MenuList {...props} className="bg-app dark-text-white bg-select-hover">
                    {props.children}
                </components.MenuList>
            </div>
        );
    };
    const colorStyles: StylesConfig = {
        option: (styles, { isDisabled, isFocused, isSelected }) => {
            const data_color = "#EAEAEA"
            const color = chroma(data_color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? "#0d6efd"
                        : isFocused
                            ? color.alpha(0.2).css()
                            : undefined,

                cursor: isDisabled ? 'not-allowed' : 'default',


            }
        },
    }

    async function warning(event: React.FormEvent<HTMLFormElement>) {
        try {

            setAskWarning(true)
            event.preventDefault();
            const PromiseDelete = new Promise((resolve, reject) => {
                const verifyAction = () => (
                    <div>
                        <div className="modal-body">
                            <div className="text-center">
                                <h4 className="text-danger">¡Advertencia!</h4>
                                <p>Se eliminaran las cuentas contables de este empresa y se importaran de la seleccionada</p>
                                <p>¿Desea continuar?</p>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center w-100">
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
                                data-bs-dismiss="modal"
                                onClick={() => reject("Cancelled by user")}>Cancelar</button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm me-2 mb-2 hover-elevate-down"
                                data-bs-dismiss="modal"
                                onClick={() => resolve("Accepted By user")}>Aceptar</button>
                        </div>
                    </div>
                )

                toast.error(verifyAction, { autoClose: false, icon: false })
            })

            await PromiseDelete
            onSubmit(event)
        } catch (error) {
            console.log(error)
        } finally {
            //close modal

            setAskWarning(false)
            const button = document.getElementById('closeButton') as HTMLButtonElement
            if (button) button.click()

        }
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsUpdating(true)
        if (!company) return toast.error('Seleccione una empresa', { autoClose: 2000 })
        console.log(company)

        const query = importAccounts(String(company.value), props.companyId)
        await toast.promise(query, {
            pending: 'Importando cuentas contables...',
            success: 'Cuentas contables importadas con exito',
            error: 'Error al importar cuentas contables'
        })

        const closeButton = document.getElementById('closeButton') as HTMLButtonElement
        if (closeButton) closeButton.click()

        setIsUpdating(false)

    }

    return (
        <>

            <div className="modal fade center" id="importAccountsModal" tabIndex={-1} aria-labelledby="importAccountsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="importAccountsModalLabel">Importar Cuentas Contables</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={warning}>
                            <div className="modal-body">
                                <div className='mb-10'>
                                    <label className='form-label'>Escoge La empresa</label>
                                    <Select
                                        isSearchable
                                        onChange={(selectedOption: any) => SetCompanies(selectedOption)}
                                        styles={colorStyles}
                                        value={company}
                                        classNames={{
                                            singleValue: () => clsx("text-gray-700"),
                                            placeholder: () => clsx("bg-input-placeholder"),
                                            input: () => clsx("bg-text"),
                                            control: () => clsx("form-select form-select-solid p-1"),
                                            container: () => "p-0 b-0",
                                        }}
                                        components={{ MenuList }}
                                        className='react-select-styled react-select-solid'
                                        classNamePrefix='react-select'
                                        options={options}
                                        placeholder='Select an option'
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeButton">Cancelar</button>
                                <button type="submit" className="btn btn-primary" disabled={isUpdating || !company || askWarning}>
                                    {isUpdating ? 'Importando...' : 'Importar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImportAccountsModal;