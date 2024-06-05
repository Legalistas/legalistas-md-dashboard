import { useState } from "react";
import { BsFillGrid1X2Fill, BsList } from "react-icons/bs";
import { FaList } from "react-icons/fa6";

const BtnActions = ({ toggle, setToggle }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <>
      <div className="flex w-full items-center space-x-1 md:w-auto">
        <button
          id="actionsDropdownButton"
          className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 flex w-full items-center justify-center rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white md:w-auto"
          type="button"
          onClick={setToggle}
        >
          <BsFillGrid1X2Fill
            className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
              toggle === "column" ? "block opacity-100" : "hidden opacity-0"
            }`}
          />
          <FaList
            className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
              toggle !== "column" ? "block opacity-100" : "hidden opacity-0"
            }`}
          />
        </button>

        <div className="relative"></div>
      </div>
    </>
  );
};

export default BtnActions;
