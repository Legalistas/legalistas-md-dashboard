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
            <FaMagnifyingGlass className="text-dark dark:text-dark h-5 w-5" />
          </div>
          <input
            type="text"
            id="simple-search"
            className="block block w-full w-full rounded-lg rounded-lg text-black  border border-gray bg-gray p-2 p-4 pl-10 text-base text-sm text-gray focus:border-blue-500 focus:ring-blue-500 dark:border-gray-4-200 dark:bg-gray-4-700 dark:text-white dark:placeholder-gray-4-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required=""
          />
        </div>
      </form>
    </>
  );
};

export default KanbanSearch;
