import chroma from "chroma-js";
import { components, StylesConfig } from "react-select";


export const colorStyles: StylesConfig = {
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
  export const MenuList = (
    props: any,
  ) => {
    return (
      <div>
        <components.MenuList {...props} className="bg-app dark-text-white bg-select-hover">
          {props.children}
        </components.MenuList>
      </div>
    );
  };