const FormSelect = ({ title, uid, name, placeholder, data }) => {
  return (
    <>
      {" "}
      <label
        htmlFor={uid}
        class="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
      >
        {title}
      </label>
      <select
        id={uid}
        name={name}
        class="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholder}
      >
        <option>United States</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </select>
    </>
  );
};

export default FormSelect;
