/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { getUserByToken, login } from "../../../../providers/_requests";
import { useAuth } from "../../../../providers/Auth";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato incorrecto")
    .min(3, "Minimo 3 digitos")
    .max(50, "Maximo 50 digitos")
    .required("Correo es obligatorio"),
  password: Yup.string()
    .min(3, "Minimo 3 digitos")
    .max(50, "Maximo 50 digitos")
    .required("Contraseña es obligatoria"),
});

const initialValues = {
  email: "",
  password: "",
};


export function SuperLogin() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.email, values.password, 'superadmin');

        const { data: user } = await getUserByToken(auth.token);

        if (user && user.permissions && user.permissions.length > 0) {
          const permissions = user.permissions || [];
          console.log('Permissions', permissions)
          if (permissions.length > 0) {
            console.log("has permissions")
            const previusCompany = localStorage.getItem('currentCompany') ? JSON.parse(localStorage.getItem('currentCompany') as string) : null;
            if (previusCompany) {
              console.log('Previous company found', previusCompany)

              const companyExists = permissions.find(company => company.id === previusCompany.id);
              console.log('Company exists', companyExists)

              if (!companyExists) {

                const currentCompany = permissions[0];
                console.log('Setting current company', currentCompany)

                localStorage.setItem('currentCompany', JSON.stringify(currentCompany));
                user.currentCompany = currentCompany;
              } else {

                user.currentCompany = previusCompany;
              }

            } else {
              console.log('No previous company')

              const currentCompany = permissions[0];
              localStorage.setItem('currentCompany', JSON.stringify(currentCompany));

              user.currentCompany = currentCompany;
            }
          }
          saveAuth(auth);
          setCurrentUser(user);

        } else {
          console.log('No permissions found')
          saveAuth(undefined);
          setStatus("No tienes permisos configurados");
          setSubmitting(false);
          setLoading(false);
        }

      } catch (error) {
        console.log(error);
        saveAuth(undefined);
        setStatus("Tu correo o contraseña son incorrectos");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      <div className="text-center mb-11">
 
      </div>

      <div className="separator separator-content my-14">

      </div>

      {formik.status
        ? (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )
        : null}

      {/* begin::Form group */}
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-dark">Usuario</label>
        <input
          placeholder="Usuario"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            },
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-dark fs-6 mb-0">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="Contraseña"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.password && formik.errors.password,
            },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            },
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-dark"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Ingresar</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Ingresando...
              <span className="spinner-border spinner-border-sm align-middle ms-2">
              </span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  );
}
