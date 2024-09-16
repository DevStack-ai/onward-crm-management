import { BasicTable } from "metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { Search } from "metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/profiles/actions";
import { useNavigate } from "react-router-dom";

const ProfilesList = () => {

  const navigate = useNavigate()
  const profiles: BasicTableState = useSelector((state: ReduxState) => state.profiles);
  const { dataList, helpers } = useBasicTable("/profiles", profiles, actions);

  useEffect(() => {
    if (profiles.isFirstTime) {
      helpers.fetchData();
    }
  }, []);



  return (

    <>
      <div id="kt_app_toolbar" className="app-toolbar pt-5 ">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-fluid d-flex flex-stack flex-wrap"
        >
          <div className="app-toolbar-wrapper justify-content-end d-flex flex-stack flex-wrap gap-4 w-100">
            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <a
                href="#"
                className="btn btn-flex btn-primary h-40px fs-7 fw-bold"
                onClick={() => navigate("../create")}
              >
                Nuevo perfil
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container "
        >
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9">
            {dataList.map((profile: any, key: any) => (
              <div className="col-md-4" key={key}>
                <div className="card card-flush h-md-100">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>{profile.auth_profile_name}</h2>
                    </div>
                  </div>

                  <div className="card-body pt-1">
                    <div className="fw-bold text-gray-600 mb-5">
                      Usuarios con este perfil: {profile.auth_user_count}
                    </div>

                    <div className="d-flex flex-column text-gray-600">
                      <div className="d-flex align-items-center py-2">
                        <span className="bullet bg-primary me-3"></span>All
                        Admin Controls
                      </div>
                      <div className="d-flex align-items-center py-2">
                        <span className="bullet bg-primary me-3"></span>View and
                        Edit Financial Summaries
                      </div>
                      <div className="d-flex align-items-center py-2">
                        <span className="bullet bg-primary me-3"></span>Enabled
                        Bulk Reports
                      </div>
                      <div className="d-flex align-items-center py-2">
                        <span className="bullet bg-primary me-3"></span>View and
                        Edit Payouts
                      </div>

                      <div className="d-flex align-items-center py-2">
                        <span className="bullet bg-primary me-3"></span>
                        <em>and 7 more...</em>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer flex-wrap pt-0">
                    <a
                      href="../../demo42/dist/apps/user-management/roles/view.html"
                      className="btn btn-light btn-active-primary my-1 me-2"
                    >
                      Ver
                    </a>
                    <button
                      type="button"
                      className="btn btn-light btn-active-light-primary my-1"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_update_role"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { ProfilesList };
