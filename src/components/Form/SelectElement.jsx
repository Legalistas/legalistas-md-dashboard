const SelectElement = ({
  id,
  label,
  required,
  name,
  options,
  onChange,
  disabled,
  value,
}) => {
  return (
    <>
      <label
        className="text-sm font-medium text-black dark:text-white"
        htmlFor={id}
      >
        {required ? <span className="mr-1 text-red">*</span> : null}
        <span>{label}</span>
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          onChange={onChange}
          className="mb-3 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          disabled={disabled}
          // value={value || ""} // Ensure the selected value is properly set
        >
          <option key="default" value={value}>
            {value}
          </option>
          {options.map((option, index) => (
            <option key={`${id}-${index}`} value={option.id} >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectElement;