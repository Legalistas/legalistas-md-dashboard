import { FaSquarePlus } from "react-icons/fa6";
import { PlusIcon } from "../Icons/PlusIcon";
import { useEffect, useRef, useState } from "react";
import TaskPopup from "../TaskPopup";

const KanbanHeader = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const trigger = useRef(null);
  const popup = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!popup.current) return;
      if (
        !popupOpen ||
        popup.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setPopupOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!popupOpen || keyCode !== 27) return;
      setPopupOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  return (
    <>
      <div className="mx-auto mb-4 w-full">
        <div className="rounded-lg border border-stroke bg-white p-1 shadow-card dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <KanbanSearch />
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <BtnNewOpportunity open={onOpen} />
              <button
                ref={trigger}
                onClick={() => setPopupOpen(!popupOpen)}
                className="flex items-center gap-2 justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="fill-current"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                    fill=""
                  />
                </svg>
                Add task
              </button>

              {/* <!-- ===== Task Popup Start ===== --> */}
              <TaskPopup popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
              {/* <!-- ===== Task Popup End ===== --> */}

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
      <CustomModal
        isOpen={isOpen}
        onOpenChange={isOpen ? onClose : onOpen}
        title="Nueva oportunidad"
        size="5xl"
        modalPlacement="center"
      >
        <CreateOpportunity />
      </CustomModal>
    </>
  );
};

export default KanbanHeader;
