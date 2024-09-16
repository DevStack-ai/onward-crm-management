import { FormikValues } from "formik";
import clsx from "clsx";
import { useEffect } from "react";
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

type Props = {
  form: FormikValues;
  name: string;
  type?: string;
  placeholder?: string;
  isConfirmation?: boolean;
  onDebounce?: Function,
  [key: string]: any;
};

const currentCompany = JSON.parse(localStorage.getItem("currentCompany") || "{}");

const defaultMaskOptions = {
  prefix: currentCompany.currency || '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  allowNegative: false,
  allowLeadingZeroes: false,
}

export default function Currency({
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
  const currencyMask = createNumberMask(defaultMaskOptions)
  //implement debounce of 500ms

  useEffect(() => {
    if(args.value){
      form.setFieldValue(name, args.value)
    }
  }, [args.value])

  return (
    <div data-kt-password-meter="true">
      <div>
        <MaskedInput
          mask={currencyMask}
          placeholder={placeholder}
          {...form.getFieldProps(name)}
          {...args}
          name={name}
          value={value}
          className={clsx(
            "form-control form-control-solid mb-3 mb-lg-0",
            { "is-invalid": isInvalid },
            { "is-valid": isValid },
          )}
          style={{ textAlign: 'right' }}
          inputMode="numeric"
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
