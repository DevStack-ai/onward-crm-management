import React from "react";
import { toast } from "react-toastify";
import { AuthModel } from "./_models";
import axios, { AxiosRequestConfig } from "axios";


const AUTH_LOCAL_STORAGE_KEY = "accounting-suite";
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

interface AxiosConfig extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
    currentCompany?: string;
    "Content-Type"?: string;
  }
}


export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    async (config: AxiosConfig) => {
      const auth = getAuth();
      if (auth && auth.token) {
        const currentCompany = localStorage.getItem("currentCompany");
        if (currentCompany) {
          config.headers["currentCompany"] = currentCompany;
        }
        config.headers.Authorization = `Bearer ${auth.token}`;
      }


      //check if method is DELETE
      if (config.method === "delete") {
        const PromiseDelete = new Promise((resolve, reject) => {
          const verifyAction = () => (
            <div>
              <div className="modal-body">
                <div className="text-center">
                  <h4 className="text-danger">¡Advertencia!</h4>
                  <p>¿Estás seguro de eliminar este registro?</p>
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
                  onClick={() => resolve("Accepted By user")}>Eliminar</button>
              </div>
            </div>
          )

          toast.error(verifyAction, { autoClose: false, icon: false })
        })

        // //add timeout to wait for user action


        await PromiseDelete
          .then(() => {
            toast.success("Eliminando registro")
            return config;
          })
          .catch(() => {
            throw new axios.Cancel('Operation canceled by the user.');
          })
      }
      return config;

    },
    (err: any) => {
      //check if status code is 403
      Promise.reject(err)
      if (err.response.status === 403) {
        removeAuth();
        window.location.href = "/auth/login";
      }
    },
  );
}

export { AUTH_LOCAL_STORAGE_KEY, getAuth, removeAuth, setAuth };
