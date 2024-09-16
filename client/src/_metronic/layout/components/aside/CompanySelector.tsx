import React, { useEffect } from "react";
import Select from "react-select";
import { colorStyles, MenuList } from "../../../helpers/components/inputs/helpers/select";
import { persistConfig } from "../../../../redux/store"
import { useAuth, UserModel } from "../../../../providers";
import clsx from "clsx";

const CompanySelector = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [selectedCompany, setSelectedCompany] = React.useState<any>(null);

  const options = currentUser?.permissions?.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  useEffect(() => {
    if (currentUser?.currentCompany) {
      setSelectedCompany({
        value: currentUser?.currentCompany?.id,
        label: currentUser?.currentCompany?.name
      })
    }
  }, [currentUser?.currentCompany?.id])

  function handleChange(option: any) {

    const company = currentUser?.permissions?.find((company) => company.id === option.value);

    localStorage.setItem('currentCompany', JSON.stringify(company));
    setCurrentUser({
      ...currentUser,
      currentCompany: company
    } as UserModel);
    setSelectedCompany(option);

    //clean all redux state
    localStorage.removeItem(`persist:${persistConfig.key}`);

    const location = window.location.pathname;
    window.location.href = location
  }


  return (
    <div className="my-5">

      <span className="text-gray-800 fw-bold">Empresa</span>

      <Select
        onChange={(selectedOption: any) => handleChange(selectedOption)}
        options={options}
        className='react-select-styled react-select-solid rounded-3 '
        classNamePrefix='react-select'
        styles={colorStyles}
        value={selectedCompany}
        components={{ MenuList }}
        classNames={{
          singleValue: () => clsx(" text-primary"),
          placeholder: () => clsx("bg-input-placeholder"),
          input: () => clsx("bg-text text-primary"),
          control: () => clsx("form-select form-select-solid p-1 bg-light-primary"),
          container: () => "p-0 b-0 bg-light-primary",
        }}

      />

    </div>
  );
}

export { CompanySelector };