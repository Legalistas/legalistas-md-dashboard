import React from "react";

const SelectComponent = ({ value, onChange, options, labelName, name }) => {
  return (
    <>
      <label
        htmlFor="stateId"
        className="mb-3 block text-sm font-medium text-black dark:text-white"
      >
        {labelName}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="mb-3 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectComponent;
