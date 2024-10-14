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


export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.email, values.password);
        const { data: user } = await getUserByToken(auth.token);
        
        saveAuth(auth);
        setCurrentUser(user);

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
      {/* begin::Heading */}
      <div className="text-center mb-11">
        <h1 className="text-dark fw-bolder mb-3">Bienvenido</h1>

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
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />

        {/* begin::Link */}
        <Link to="/auth/forgot-password" className="link-primary">
          Olvidaste tu contraseña ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
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
