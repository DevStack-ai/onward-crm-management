import { FormikValues } from "formik";
import clsx from "clsx";
import { checkStrength } from "./helpers";
import { useEffect } from "react";
type Props = {
  form: FormikValues;
  name: string;
  type?: string;
  placeholder?: string;
  isConfirmation?: boolean;
  onDebounce?: Function,
  [key: string]: any;
};

export default function Field({
  form,
  name,
  type = "text",
  placeholder = name,
  isConfirmation,
  onDebounce,
  ...args
}: Props) {
  const { value } = form.getFieldProps(name);
  const isValid = form.touched[name] && !form.errors[name];
  const isInvalid = form.touched[name] && form.errors[name];

  //implement debounce of 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onDebounce) {
        try {
          onDebounce(value);
        } catch (err) {
          console.log(err);
        }
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [value]);


  return (
    <div data-kt-password-meter="true">
      <div>
        <input
          placeholder={placeholder}
          {...form.getFieldProps(name)}
          {...args}
          type={type}
          name={name}
          value={type === "date" ? value.split("T")[0] : value}
          className={clsx(
            "form-control form-control-solid mb-3 mb-lg-0",
            { "is-invalid": isInvalid },
            { "is-valid": isValid },
          )}
          autoComplete="off"
          disabled={form.isSubmitting || args.disabled}
        />
      </div>
      {form.touched[name] && form.errors[name] && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{form.errors[name]}</span>
          </div>
        </div>
      )}
    </div>
  );
}
