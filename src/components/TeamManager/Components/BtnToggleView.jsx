const ToggleViewAll = ({ handleToggle }) => {
  const handleClick = async () => {
    try {
      // Llamar al manejador después de actualizar el estado local
      handleToggle();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      {/* Texto del botón */}
    </button>
  );
};

export default ToggleViewAll;
