const FormInput = ({ title, type, uid, placeholder, icon, name }) => {
  const IconComponent = icon;
  return (
    <>
      <label
        htmlFor="email-address-icon"
        className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
      >
        {title}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <IconComponent />
        </div>
        <input
          type={type}
          id={uid}
          name={name}
          className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default FormInput;
