import { FormikValues } from "formik";
import clsx from "clsx";
import { checkStrength } from "./helpers";
import { useEffect, useState } from "react";
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
    <div className="mb-10 mt-2">
      <div className="form-check form-switch form-check-custom form-check-solid">
        <input
          {...form.getFieldProps(name)}
          {...args}
          className="form-check-input"
          type="checkbox"
          checked={value}

        />

      </div>
    </div>
  );
}
