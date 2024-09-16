import clsx from "clsx";
import React from "react";

interface Props {
    children: React.ReactNode;
    required?: boolean;
    size?: string;
    column?: boolean;
}

function Label(props: Props) {
    return (
        <label className={clsx(
            props.size,
            "fw-bold fs-6 mt-6", {
            "required": !!props.required,
            "col-form-label": !!props.column || !props.size,
        })} >
            {props.children}
        </label>
    );
}
export default Label;