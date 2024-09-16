import React from "react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import Select, { components, StylesConfig } from "react-select";
import chroma from "chroma-js";
import { Modal } from "react-bootstrap";
import { KTIcon } from "metronic/helpers";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  options?: Array<{}>;
  optionsFilter?: Function;
  parent?: string;
  createOnScreen?: boolean;
  onInputChange?: (option: { value: string, label: string }) => void;
  autoSelect?: boolean;
  createComponent?: any;
  className?: string;
  label?: string;
  addNoOption?: boolean;
  value?: any;
};

export default function Field({
  name,
  placeholder = name,
  options = [],
  optionsFilter,
  createOnScreen = false,
  onInputChange,
  autoSelect = false,
  createComponent,
  className,
  label,
  value
}: Props) {
  const [showCreate, setShowCreate] = useState(false);


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
    <div>
      {React.isValidElement(createComponent) &&
        (<Modal show={showCreate} onHide={() => setShowCreate(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Crear {placeholder}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {React.cloneElement(createComponent as React.ReactElement<any>, {
              close: () => {
                setShowCreate(false)
              }
            })}
          </Modal.Body>
        </Modal>)}
      {label && <label className="form-label">{label}</label>}
      <div>
        <Select
          isSearchable
          className={className}
          styles={colorStyles}
          classNames={{
            singleValue: () => clsx("text-gray-700"),
            placeholder: () => clsx("bg-input-placeholder"),
            input: () => clsx("bg-text"),
            control: () => clsx("form-select form-select-solid p-1"),
            container: () => "p-0 b-0 z-index-9999 ",
          }}
          onChange={(opt: any) => {
            if (onInputChange) {
              onInputChange(opt)
            }
          }}
          value={value ? { label: value.name, value: value.id } : autoSelect ? options[0] : null}
          placeholder={placeholder}
          components={{ MenuList, NoOptionsMessage: NoOptionsMessage }}
          options={getOptions(options)}
        />
      </div>

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