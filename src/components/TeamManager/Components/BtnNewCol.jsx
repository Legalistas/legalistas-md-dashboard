import { FaPlus } from "react-icons/fa6";

const BtnNewCol = ({ open }) => {
  return (
    <>
      <button
        onClick={open}
        type="button"
        className="flex items-center gap-2 rounded-lg bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
      >
        <FaPlus className="mr-2" /> Nueva columna
      </button>
    </>
  );
};
export default BtnNewCol;
