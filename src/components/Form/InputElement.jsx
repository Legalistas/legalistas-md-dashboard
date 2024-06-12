const InputElement = ({
  label,
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
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
      <input
        className="mb-3 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value} // Asegúrate de que el valor se pase aquí
        onChange={onChange} // Asegúrate de que el controlador de cambios se pase aquí
      />
    </>
  );
};

export default InputElement;
