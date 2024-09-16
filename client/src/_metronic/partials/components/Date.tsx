/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { KTIcon } from "metronic/helpers";

interface SearchProps {
  onChange: (value: string) => void;
  label?: string;
}

const Datepicker = (props: SearchProps) => {
  const [searchTerm, setDate] = useState<string>("");

  useEffect(() => {
    if (searchTerm !== undefined) {
      props.onChange(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div>
      {props.label && <label className="form-label">{props.label}</label>}
      <input
        type="date"
        className="form-control form-control-solid w-200px"
        value={searchTerm}
        onChange={(e) => setDate(e.target.value)}
      />

    </div>
  );
};

export { Datepicker };
