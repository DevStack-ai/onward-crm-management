import React from "react";
import { AccountantsSectionProps } from "./_types";
import { assignAccountant, notIn } from "./_requests";
import Select, { components, MultiValue, StylesConfig } from 'react-select'
import clsx from "clsx";
import chroma from "chroma-js";
import { toast } from "react-toastify";
const AssignAccountantModal = (props: AccountantsSectionProps) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [accountants, setAccountants] = React.useState<any[]>([])
    const [selectedAccountants, setSelectedAccountants] = React.useState<MultiValue<{ label: string, value: number }>>([])
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false)

    const fetchAccountants = async () => {
        setIsLoading(true)
        const query = await notIn(props.companyId);
        setAccountants(query.data);
        setIsLoading(false)

    }
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
    React.useEffect(() => {
        fetchAccountants()
    }, [props.refresh])

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsUpdating(true)
        const queue = []
        for (const accountant of selectedAccountants) {

            const query = assignAccountant(props.companyId, String(accountant.value))
            queue.push(query)
        }
        await toast.promise(Promise.all(queue), {
            pending: "Asignando",
            success: "Asignado/s correctamente",
            error: "Error al asignar",
        })

        props.onAssign && props.onAssign()

        const closeButton = document.getElementById('closeButton') as HTMLButtonElement
        if (closeButton) closeButton.click()

        setSelectedAccountants([])
        setIsUpdating(false)

    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#assignAccountantModal">
                Asignar Contador
            </button>
            <div className="modal fade" id="assignAccountantModal" tabIndex={-1} aria-labelledby="assignAccountantModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="assignAccountantModalLabel">Asignar Contador</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="modal-body">
                                <div className='mb-10'>
                                    <label className='form-label'>Contadores</label>

                                    <Select
                                        isSearchable
                                        isMulti
                                        onChange={(selectedOption: any) => setSelectedAccountants(selectedOption)}
                                        isLoading={isLoading}
                                        styles={colorStyles}
                                        value={selectedAccountants}
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
                                        options={accountants.map((accountant) => ({ value: accountant.id, label: `${accountant.name} (${accountant.email})` }))}
                                        placeholder='Select an option'
                                    />


                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeButton">Cancelar</button>
                                <button type="submit" className="btn btn-primary" disabled={isLoading || isUpdating || !selectedAccountants.length}>
                                    {isUpdating ? 'Asignando...' : 'Asignar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AssignAccountantModal;