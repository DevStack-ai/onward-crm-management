import React, { useCallback, useEffect, useState } from "react";
import { initialValues } from "./helpers/_schemas";
import { ListLoading } from "table/components/loading/ListLoading";
import NotFound from "metronic/helpers/components/notfound";

import { Dropdown } from "react-bootstrap";
import BackButton from "metronic/helpers/components/backbutton";

import { useNavigate, useParams } from "react-router-dom";
import { get, getCompanies } from "./helpers/_requests";
import { toast } from "react-toastify";
import { numberToCurrency, currencyToNumber } from "utils/index";
import { KTIcon } from "metronic/helpers";

import { useKeypress } from "hooks/useEscape";
import UsersTable from "./components/UsersTable";
import CompaniesTable from "./components/CompaniesTable";


const DocumentWrapper = () => {
  const navigate = useNavigate();
  useKeypress("Escape", () => navigate(-1), [])

  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [notfound, setNotFound] = useState(false);

  const [document, setDocument] = useState(initialValues);
  const [companies, setCompanies] = React.useState([{ id: -1, name: "Todos" }, { id: 0, name: "Sin Empresa" }]);

  const id = params.id;


  const fetchCompanies = async () => {
    if (!id) return;
    try {
      const query = await getCompanies(id);
      setCompanies(prev => [...prev, ...query.data]);
    } catch (error) {
      console.log("Error", error);
    }
  }
  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    try {
      const query = await get(id);
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
    fetchCompanies();
  }, []);

  if (notfound) {
    return <NotFound />
  }

  if (isLoading) {
    return <ListLoading />;
  }
  return (

    <div className="px-10 pt-lg-10" >
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
              <Dropdown.Item className="btn-sm me-2 mb-2 hover-elevate-down" onClick={() => navigate(`/tenants/${id}/edit`)}>
                <KTIcon iconName="pencil" className="pr-2" />
                Editar
              </Dropdown.Item>
              <Dropdown.Item className="btn-sm me-2 mb-2 hover-elevate-down text-danger" >
                <KTIcon iconName="pencil" className="pr-2" />
                Suspender
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
            <span>
              Tenant
            </span>
            <h1 className="fw-bold">
              {document.name}
            </h1>
          </div>
        </div>
      </div>
      <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#companies"
          >
            Empresas
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#users"
          >
            Usuarios
          </a>
        </li>

      </ul>
      <div className="tab-content" id="company-content">
        <div
          className="tab-pane fade active show"
          id="companies"
          role="tabpanel"
        >
          <div className="row mb-6 ms-0 px-0">
            {id && <CompaniesTable tenantId={id} companies={companies} />}
          </div>
        </div>
        <div
          className="tab-pane fade "
          id="users"
          role="tabpanel"
        >
          <div className="row mb-6 ms-0 px-0">
            {id && <UsersTable tenantId={id} companies={companies} />}
          </div>
        </div>
      </div>
    </div>

  );
};
export { DocumentWrapper };
