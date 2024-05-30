import { FaSquarePlus } from "react-icons/fa6";
import { PlusIcon } from "../Icons/PlusIcon";

const KanbanHeader = () => {
  return (
    <>
      <div className="mx-auto mb-4 w-full">
        <div className="dark:bg-gray-800 relative bg-white shadow-md sm:rounded-lg">
          <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      aria-hidden="true"
                      className="text-gray-500 dark:text-gray-400 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="text-gray-900 border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2 pl-10 text-sm focus:border-primary-500 focus:ring-primary-500 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Search"
                    required=""
                  />
                </div>
              </form>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <button
                type="button"
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                PlusIcon Add product
              </button>
              <div className="flex w-full items-center space-x-3 md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 flex w-full items-center justify-center rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white md:w-auto"
                  type="button"
                >
                  <svg
                    className="-ml-1 mr-1.5 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                  Actions
                </button>
                <div
                  id="actionsDropdown"
                  className="divide-gray-100 dark:bg-gray-700 dark:divide-gray-600 z-10 hidden w-44 divide-y rounded bg-white shadow"
                >
                  <ul
                    className="text-gray-700 dark:text-gray-200 py-1 text-sm"
                    aria-labelledby="actionsDropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 dark:hover:text-white"
                      >
                        Mass Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 block px-4 py-2 text-sm dark:hover:text-white"
                    >
                      Delete all
                    </a>
                  </div>
                </div>
                <button
                  id="filterDropdownButton"
                  data-dropdown-toggle="filterDropdown"
                  className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 flex w-full items-center justify-center rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white md:w-auto"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="text-gray-400 mr-2 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Filter
                  <svg
                    className="-mr-1 ml-1.5 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>

                <div
                  id="filterDropdown"
                  className="dark:bg-gray-700 z-10 hidden w-48 rounded-lg bg-white p-3 shadow"
                >
                  <h6 className="text-gray-900 mb-3 text-sm font-medium dark:text-white">
                    Category
                  </h6>
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="dropdownDefault"
                  >
                    <li className="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        value=""
                        className="bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500 h-4 w-4 rounded text-primary-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600"
                      />
                      <label
                        htmlFor="apple"
                        className="text-gray-900 dark:text-gray-100 ml-2 text-sm font-medium"
                      >
                        Apple (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="fitbit"
                        type="checkbox"
                        value=""
                        className="bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500 h-4 w-4 rounded text-primary-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600"
                      />
                      <label
                        htmlFor="fitbit"
                        className="text-gray-900 dark:text-gray-100 ml-2 text-sm font-medium"
                      >
                        Fitbit (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="dell"
                        type="checkbox"
                        value=""
                        className="bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500 h-4 w-4 rounded text-primary-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600"
                      />
                      <label
                        htmlFor="dell"
                        className="text-gray-900 dark:text-gray-100 ml-2 text-sm font-medium"
                      >
                        Dell (56)
                      </label>
                    </li>
                    <li className="flex items-center">
                      <input
                        id="asus"
                        type="checkbox"
                        value=""
                        onChange={() => console.log("changed")}
                        className="bg-gray-100 border-gray-300 dark:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500 h-4 w-4 rounded text-primary-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600"
                      />
                      <label
                        htmlFor="asus"
                        className="text-gray-900 dark:text-gray-100 ml-2 text-sm font-medium"
                      >
                        Asus (97)
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KanbanHeader;
