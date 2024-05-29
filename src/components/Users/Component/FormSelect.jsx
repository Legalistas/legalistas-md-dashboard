import React from "react";

const FormSelect = ({
  title,
  uid,
  name,
  placeholder,
  value,
  onChange,
  data,
}) => {
  return (
    <>
      <label
        htmlFor={uid}
        className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
      >
        {title}
      </label>
      <select
        id={uid}
        name={name}
        className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default FormSelect;
