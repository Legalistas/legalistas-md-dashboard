const MovementsCard = () => {
    return (
      <>
        <div className="mb-4 flex flex-wrap space-y-2 sm:space-x-4 sm:space-y-0">
          <select className="rounded border p-2">
            <option>Todo</option>
          </select>
          <select className="rounded border p-2">
            <option>Todo</option>
          </select>
          <select className="rounded border p-2">
            <option>Todo</option>
          </select>
          <input
            type="text"
            placeholder="Buscar movimientos (observaciones)"
            className="flex-1 rounded border p-2"
          />
          <button className="rounded bg-blue-500 px-4 py-2 text-white">+</button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Ex/Judicial</th>
              <th className="border p-2">Tipo</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Fs</th>
              <th className="border p-2">Observaciones</th>
              <th className="border p-2">Resp.</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="p-4 text-center">
                Este expediente aún no contiene movimientos. Crea uno nuevo con el
                siguiente botón
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 text-center">
          <button className="rounded bg-blue-500 px-4 py-2 text-white">
            Nuevo Movimiento
          </button>
        </div>
      </>
    );
  };
  
  export default MovementsCard;