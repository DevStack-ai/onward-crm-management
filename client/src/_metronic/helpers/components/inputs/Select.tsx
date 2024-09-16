import React from "react";
import { FormikValues } from "formik";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { KTIcon } from "../KTIcon";
import { useField } from "formik";
import Select, { components, StylesConfig } from "react-select";
import chroma from "chroma-js";
import { Modal } from "react-bootstrap";

type Props = {
  form: FormikValues;
  name: string;
  type?: string;
  placeholder?: string;
  source: string;
  options?: Array<{}>;
  optionsFilter?: Function;
  parent?: string;
  createOnScreen?: boolean;
  onInputChange?: Function;
  autoSelect?: boolean;
  createComponent?: any;
  disabled?: boolean;
};

export default function Field({
  form,
  name,
  placeholder = name,
  source,
  options = [],
  optionsFilter,
  createOnScreen = false,
  onInputChange,
  autoSelect = false,
  createComponent,
  ...args
}: Props) {

  const [showCreate, setShowCreate] = useState(false);
  const [_options, setOptions] = useState([...options]);
  const [disabled, setDisabled] = useState(args.disabled || false);
  const [isLoading, setIsLoading] = useState(!!source);
  const [field, _meta, _form] = useField({ name });

  const fetchOptions = useCallback(async () => {
    setIsLoading(true);

    const baseUrl = `${import.meta.env.VITE_API_URL}/${source}/select`;

    const query = await axios.get(baseUrl);
    const result = query.data;
    const _options = result;
    if (autoSelect && _options.length === 1) {
      form.setFieldValue(name, _options[0].id);
      setDisabled(true);
    }
    setOptions(_options);
    setIsLoading(false);
  }, [source]);

  useEffect(() => {
    if (source) {
      fetchOptions();
    }
  }, [source]);

  const MenuList = (
    props: any,
  ) => {
    return (
      <div>
        <components.MenuList {...props} className="bg-app dark-text-white bg-select-hover">
          {props.children}
        </components.MenuList>
        {!!createOnScreen && createComponent && (
          <div className="bg-white" onClick={() => setShowCreate(true)}>
            <div className="text-center text-primary cursor-pointer py-3 border-top border-primary">
              <KTIcon iconName="plus" className="mt-1 " />{" "}
              <span className="fw-1">Crear {placeholder}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getOptions = (datalist: Array<{}>) => {
    return [...datalist].filter((item: any) => {
      if (typeof optionsFilter === "function") {
        return optionsFilter(item);
      }
      return true;
    })
      .map((opt: any) => ({
        label: opt.name,
        value: opt.id,
        original: opt
      }));
  };

  const getValue = (value?: string) => {
    const options = getOptions(_options);
    if (options && value) {
      return options.find((option: any) => String(option.value) === String(value));
    } else if (options) {
      return options.find((option: any) => String(option.value) === String(field.value));
    } else {
      return "";
    }
  };

  const colorStyles: StylesConfig = {
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const data_color = "#EAEAEA"
      const color = chroma(data_color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? "#0d6efd"
            : isFocused
              ? color.alpha(0.2).css()
              : undefined,

        cursor: isDisabled ? 'not-allowed' : 'default',


      }
    },
  }

  return (
    <>
      {React.isValidElement(createComponent) &&
        (<Modal show={showCreate} onHide={() => setShowCreate(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Crear {placeholder}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {React.cloneElement(createComponent as React.ReactElement<any>, {
              close: async (response: any) => {
                await fetchOptions();
                setShowCreate(false)
                if (response.id) {
                  _form.setValue(response.id);
                }
              }
            })}
          </Modal.Body>
        </Modal>)}
      <Select
        isSearchable
        isDisabled={disabled}
        isLoading={isLoading}
        value={getValue()}
        styles={colorStyles}
        classNames={{
          singleValue: () => clsx("text-gray-700"),
          placeholder: () => clsx("bg-input-placeholder"),
          input: () => clsx("bg-text"),
          control: () => clsx("form-select form-select-solid p-1"),
          container: () => "p-0 b-0",
        }}
        onChange={(opt: any) => {
          _form.setValue(opt.value);
          if (onInputChange) {
            onInputChange(opt)
          }
        }}
        onBlur={() => {
          if (!field.value) {
            form.setFieldError(name, "Campo obligatorio");
          }
          form.setFieldTouched(name);
        }}
        placeholder={placeholder}
        components={{ MenuList, NoOptionsMessage: NoOptionsMessage, LoadingMessage: LoadingMessage }}
        options={getOptions(_options)}
      />

      {form.touched[name] && form.errors[name] && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{form.errors[name]}</span>
          </div>
        </div>
      )}
    </>
  );
}

function LoadingMessage() {
  return (
    <div className="text-center text-muted cursor-pointer py-3">
      <span className="fw-1">Cargando...</span>
    </div>
  );
}
function NoOptionsMessage() {
  return (
    <div className="text-center text-muted cursor-pointer py-3">
      <span className="fw-1">No hay opciones</span>
    </div>
  );
}