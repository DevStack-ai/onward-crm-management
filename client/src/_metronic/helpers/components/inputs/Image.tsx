import { FormikValues } from "formik";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { getFile } from "@/pages/products/helpers/_requests";
import axios from "axios";
import { loadFile } from "../../../../pages/products/helpers/_requests";
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

export default function Image({
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


    const [preview, setPreview] = useState<string | undefined>();
    console.log(value)
    return (
        <div>
            {args.title && <div className="form-label text-center">{args.title}</div>}
            <img
                onClick={() => {
                    if (!args.disabled) {
                        ref.current?.click();
                    }
                }}
                src={preview ? preview : `${import.meta.env.VITE_API_URL}/files?file=${value}`}
                alt={`${args.title} preview`}
                className={clsx(
                    "form-control form-control-solid mb-3 mb-lg-0",
                    { "is-invalid": isInvalid },
                    { "is-valid": isValid },
                )}
                style={{ width: "200px", height: "200px" }}
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
                        const reader = new FileReader();
                        reader.onload = () => {
                            setPreview(reader.result as string);

                        };

                        const extension = file.name.split('.').pop();
                        const timestamp = new Date().getTime();
                        const newFileName = `${name}_${timestamp}.${extension}`;

                        toast.loading("Subiendo archivo...");
                        const query = await loadFile(file, newFileName);
                        const path = query.data.path;
                        toast.dismiss()
                        toast.success("Archivo subido con éxito");

                        reader.readAsDataURL(file);
                        form.setFieldValue(name, newFileName);
                        form.setFieldValue(`${name}_path`, path);

                    }
                }}
                disabled={form.isSubmitting || args.disabled}
            />
        </div>

    );
}
