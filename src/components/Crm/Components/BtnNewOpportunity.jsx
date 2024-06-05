import { FaPlus } from "react-icons/fa6";

const BtnNewOpportunity = ({ open }) => {
  return (
    <>
      <button
        onClick={open}
        type="button"
        className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
      >
        <FaPlus className="mr-2" /> Nueva oportunidad
      </button>
    </>
  );
};
export default BtnNewOpportunity;
