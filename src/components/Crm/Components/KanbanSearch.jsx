import { FaMagnifyingGlass } from "react-icons/fa6";

const KanbanSearch = () => {
  return (
    <>
      <form className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Buscar
        </label>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaMagnifyingGlass className="h-5 w-5 text-dark dark:text-dark" />
          </div>
          <input
            type="text"
            id="simple-search"
            className="block w-full rounded-lg p-2 pl-10 text-sm text-gray-4-900 border-gray-4-600 bg-gray-4-600 dark:bg-gray-4-700 dark:border-gray-4-200 dark:placeholder-gray-4-400 block w-full rounded-lg border p-4 text-base focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required=""
          />
        </div>
      </form>
    </>
  );
};

export default KanbanSearch;
