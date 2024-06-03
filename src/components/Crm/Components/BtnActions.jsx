import { FaFilter, FaChevronDown } from "react-icons/fa6";

const BtnActions = () => {
  return (
    <>
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
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            id="filterDropdownButton"
            data-dropdown-toggle="filterDropdown"
            className="border-gray-200 focus:ring-gray-300 flex w-full items-center justify-center rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray hover:bg-gray hover:text-primary focus:z-10 focus:outline-none dark:border-gray dark:bg-gray dark:text-gray dark:hover:bg-gray dark:hover:text-white dark:focus:ring-gray md:w-auto"
            type="button"
          >
            <FaFilter />
            <span className="ml-2">Filter</span>
            <FaChevronDown className="ml-2" />
          </button>

          {/* {isFilterOpen && (
            <div
              id="filterDropdown"
              className="dark:bg-gray-700 absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white p-3 shadow"
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
          )} */}
        </div>
      </div>
    </>
  );
};

export default BtnActions;
