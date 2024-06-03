import { FaPlus } from "react-icons/fa6";

const BtnNewOpportunity = ({ open }) => {
  return (
    <>
      <button
        onClick={open}
        type="button"
        className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <FaPlus className="mr-2" /> Nueva oportunidad
      </button>
    </>
  );
};
export default BtnNewOpportunity;
