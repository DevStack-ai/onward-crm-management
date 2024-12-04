import { FormikValues } from "formik";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { loadFile } from "../../../../pages/products/helpers/_requests";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
    form: FormikValues;
    name: string;
    type?: string;
    placeholder?: string;
    isConfirmation?: boolean;
    onDebounce?: Function,
    [key: string]: any;
};

export default function FIle({
    form,
    name,
    type = "text",
    onChange,
    ...args
}: Props) {
    const { value } = form.getFieldProps(name);
    const isValid = form.touched[name] && !form.errors[name];
    const isInvalid = form.touched[name] && form.errors[name];

    const ref = useRef<HTMLInputElement>(null);
    return (
        <div>
            {args.title && <div className="form-label text-center">{args.title}</div>}
            <img
                onClick={() => {
                    if (!args.disabled) {
                        ref.current?.click();
                    }
                }}
                src={"https://cdn3.iconfinder.com/data/icons/muksis/128/pdf-512.png"}
                alt="preview"
                className={clsx(
                    "form-control form-control-solid mb-3 mb-lg-0",
                    { "is-invalid": isInvalid },
                    { "is-valid": isValid },
                )}
                style={{ width: "200px" }}
            />

            <input
                ref={ref}
                type="file"
                name={name}
                className="d-none"
                autoComplete="off"
                multiple={false}
                onChange={async () => {
                    const file = (document.querySelector(`input[name=${name}]`) as HTMLInputElement)?.files?.[0];
                    if (file) {
                        //change name of file to avoid conflicts, format: [name]_[timestamp].[extension]
                        const extension = file.name.split('.').pop();
                        const timestamp = new Date().getTime();
                        const newFileName = `${name}_${timestamp}.${extension}`;

                        toast.loading("Subiendo archivo...");
                        const query = await loadFile(file, newFileName);
                        const path = query.data.path;
                        toast.dismiss()
                        toast.success("Archivo subido con éxito");
                        form.setFieldValue(name, newFileName);
                        form.setFieldValue(`${name}_path`, path);
                    }
                }}
                disabled={form.isSubmitting || args.disabled}
            />
            <div className="text-center">
                {value && <a
                    href={`${import.meta.env.VITE_API_URL}/files?file=${value}`}
                    target="_blank" className="h3 btn-sm btn-secondary btn">Ver archivo</a>}
            </div>
        </div>

    );
}
