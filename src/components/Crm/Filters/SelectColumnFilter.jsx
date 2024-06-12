import React from "react";

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calcula las opciones únicas de las filas prefiltradas
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFilter(value === "all" ? undefined : value);
  };

  return (
    <div className="mt-2.5 w-full">
      <select
        value={filterValue || "all"}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        className="w-full rounded-md border border-stroke px-3 py-1 outline-none focus:border-primary"
      >
        <option value="all">Todos</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectColumnFilter;
