import React, { useCallback, useEffect, useState } from "react";
import { initialValues } from "./helpers/_schemas";

import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";
import ImportAccountsModal from "./components/ImportAccounts";
import { useNavigate, useParams } from "react-router-dom";
import { getCompany } from "./helpers/_requests";
import moment from "moment";
import { KTIcon } from "metronic/helpers";
import BackButton from "metronic/helpers/components/backbutton";
import AccountantsSection from "./components/AccountantsSection";
import NotFound from "metronic/helpers/components/notfound";
import { ListWrapper } from "../branchs/BranchList"
import { Dropdown } from "react-bootstrap";


const DetailsWrapper = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIslOading] = useState(true);
    const [notfound, setNotFound] = useState(false);
    const [document, setDocument] = useState<any>(initialValues);
    const id = params.id || "";

    const fetchDocument = useCallback(async () => {
        setIslOading(true);
        try {
            const query = await getCompany(id);
            setDocument(query.data);
        } catch (error) {
            setNotFound(true);
            console.log("Error", error);

        } finally {
            setIslOading(false);
        }

    }, [id]);

    useEffect(() => {
        fetchDocument();
    }, []);

    if (notfound) {
        return <NotFound />
    }

    if (isLoading) {
        return <ListLoading />;
    }
    return (

        <div className="px-10 pt-lg-10">
            <ImportAccountsModal
                companyId={id}
            />
            <div className="toolbar pb-7 d-flex justify-content-between">
                <div>
                    <BackButton />
                </div>
                <div>
                    <Dropdown className="btn-group">
                        <Dropdown.Toggle
                            as="button"
                            className="btn btn-primary btn-sm me-2 mb-2 hover-elevate-down"
                        >
                            Acciones
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="btn-sm me-2 mb-2 hover-elevate-down" onClick={() => navigate(`/company/${id}/edit`)}>
                                <KTIcon iconName="pencil" className="pr-2" />
                                Editar
                            </Dropdown.Item>
                            <Dropdown.Item className="btn-sm me-2 mb-2 hover-elevate-down" data-bs-toggle="modal" data-bs-target="#importAccountsModal">
                                <KTIcon iconName="tablet-down" className="pr-2" />
                                Importar cuentas
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="my-4">
                <div className="d-flex">
                    <div className="symbol symbol-50px me-10 mb-10">
                        <img src="https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg" alt="" />
                    </div>
                    <div>
                        <h1 className="fw-bold">
                            {document.name}
                        </h1>
                        <span>
                            {document.address}
                        </span>
                    </div>
                </div>
            </div>
            <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                <li className="nav-item">
                    <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#general"
                    >
                        Información de la Empresa
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#users"
                    >
                        Contadores
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#branches"
                    >
                        Sucursales
                    </a>
                </li>
            </ul>
            <div className="tab-content" id="company-content">
                <div
                    className="tab-pane fade active show"
                    id="general"
                    role="tabpanel"
                >
                    <div className="row mb-6 ms-0 px-0">


                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            NIT
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.nit}
                        </div>

                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            Departamento
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.adm_department?.name}
                        </div>
                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            Municipio
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.adm_municipality?.name}
                        </div>
                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            Nombre representante legal
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.legal_representative_name}
                        </div>
                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            Apertura fiscal
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.init_operations_date ? moment(document.init_operations_date, "YYYY-MM-DD").format("DD/MM/YYYY") : ""}
                        </div>
                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            Número de teléfono
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.phone}
                        </div>
                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            Régimen ISR
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.adm_isr_regime?.name}
                        </div>
                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            Tipo de Empresa
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.adm_company_type?.name}
                        </div>
                        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6 mt-4">
                            Moneda local
                        </label>
                        <div className="col-lg-4 col-form-label fs-6 mt-4">
                            {document.currency}
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="users" role="tabpanel">
                    <AccountantsSection
                        companyId={id}
                    />
                </div>
                <div className="tab-pane fade" id="branches" role="tabpanel">
                    <ListWrapper
                        companyId={id}
                    />
                </div>
            </div>
        </div>

    );
};
export { DetailsWrapper };
