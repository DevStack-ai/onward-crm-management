import { FormikValues } from "formik";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { getFile } from "@/pages/products/helpers/_requests";
import axios from "axios";

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

    useEffect(() => {
        (async () => {
            if (!value && form.values.id) {
                try {
                    const url = `${import.meta.env.VITE_API_URL}/store/products/image?product=${form.values.id}&type=${name}`
                    const file = await axios.post(url, {}, { responseType: "blob" });

                    const reader = new FileReader();
                    reader.onload = () => {
                        console.log(reader.result)
                        setPreview(reader.result as string);
                    };

                    reader.readAsDataURL(file.data);

                } catch (e) {
                    console.log(e)
                    console.log("not found")
                }
            }
        })();
    }, [value, form.values.id]);


    const [preview, setPreview] = useState<string | undefined>(value || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZR0_1ISIJx_T4oB5-5OJVSNgSMFLe8eCw&s");


    return (
        <div>
            {args.title && <div className="form-label text-center">{args.title}</div>}
            <img
                onClick={() => {
                    if (!args.disabled) {
                        ref.current?.click();
                    }
                }}
                src={preview}
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
                onChange={() => {
                    const file = (document.querySelector(`input[name=${name}]`) as HTMLInputElement)?.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            setPreview(reader.result as string);

                        };
                        reader.readAsDataURL(file);
                        form.setFieldValue(name, file);
                    }
                }}
                disabled={form.isSubmitting || args.disabled}
            />
        </div>

    );
}
