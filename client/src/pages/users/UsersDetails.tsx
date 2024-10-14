import React, { useCallback, useEffect, useState } from "react";

import { initialValues } from "./helpers/_schemas";

import { ListLoading } from "metronic/helpers/components/table/components/loading/ListLoading";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "./helpers/_requests";
import { getTag } from "./helpers/_columns";
import moment from "moment";
import AddressSection from "./components/AddressSection";
import ContactsSection from "./components/ContactsSection";
import { Dropdown } from "react-bootstrap";
import BackButton from "metronic/helpers/components/backbutton";

const DetailsWrapper = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [documentData, setDocument] = useState<any>(initialValues);
  const id = params.id;

  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    const query = await getUser(id);
    setDocument(query.data);
    setIslOading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);





  if (!id) return <div>Registro no encontrado</div>;

  if (isLoading) {
    return <ListLoading />;
  }

  const [text, color] = getTag(documentData.cli_situacion);

  return (


    <div className="px-10 pt-lg-10">
      <div>
        <BackButton />
        <div className="row mb-6 ms-0 px-0">
          <span className="text-muted">
            Nombre empresa
          </span>
          <h2 className="mx-2">
            {documentData.cli_nombre}
          </h2>
          <span className="text-muted">
            Estado
          </span>
          <h2 className="mx-2">
            <span className={`badge badge-light-${color} badge-pill`}>{text}</span>
          </h2>
          <span className="text-muted">
            Fecha registro
          </span>
          <h2 className="mx-2">
            {moment(documentData.cli_fecha_registro).format("DD/MM/YYYY hh:mm A")}
          </h2>
          <span className="text-muted">
            Abreviación
          </span>
          <h2 className="mx-2">
            {documentData.cli_abreviacion || "N/A"}
          </h2>
          <span className="text-muted">
            Razon Social
          </span>
          <h2 className="mx-2">
            {documentData.cli_razon_social || "N/A"}
          </h2>

        </div>
        <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="#general"
            >
              Información de usuario
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="tab"
              href="#address"
            >
              Direcciones
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="tab"
              href="#contacts"
            >
              Contactos
            </a>
          </li>

        </ul>
        <div className="tab-content" id="company-content">
          <div
            className="tab-pane fade active show"
            id="general"
            role="tabpanel"
          >


            <Dropdown className="btn-group">
              <Dropdown.Toggle
                as="button"
                className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
              >
                Acciones
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/users/details/${id}/approve`}
                >
                  Aprobar
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
            <div className="row mb-6 ms-0 px-0">


              <label className="col-sm-12 col-lg-2 col-form-label text-muted fw-bold fs-6 mt-4">
                Usario
              </label>
              <div className="col-lg-4 col-form-label fw-bold fs-6 mt-4">
                {documentData.cli_usuario || "N/A"}
              </div>

              <label className="col-sm-12 col-lg-2 col-form-label text-muted fw-bold fs-6 mt-4">
                Ultimo inicio de sesión
              </label>
              <div className="col-lg-4 col-form-label fw-bold fs-6 mt-4">
                {documentData.cli_inicio_sesion ? moment(documentData.cli_inicio_sesion).format("DD/MM/YYYY hh:mm A") : "N/A"}
              </div>

            </div>

          </div>
          <div className="tab-pane fade" id="address" role="tabpanel">
            {documentData.cli_codigo && <AddressSection row={Number(id)} />}
          </div>
          <div className="tab-pane fade" id="contacts" role="tabpanel">
            {documentData.cli_codigo && <ContactsSection row={Number(id)} />}
          </div>
        </div>

      </div>
    </div>

  );
};
export { DetailsWrapper };
