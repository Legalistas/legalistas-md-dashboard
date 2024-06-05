export default function BtnCreateUser({ onOpen }) {
  return (
    <button
      type="button"
      className="ml-0.5 rounded-lg bg-primary px-4 py-2 text-white"
      onClick={onOpen}
    >
      <FaPlus />
    </button>
  );
}
