import React, { useState, useEffect } from "react";

const ParticipantFilter = ({ column: { filterValue, setFilter } }) => {
  const [value, setValue] = useState(filterValue || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilter(value || undefined); // Set undefined to remove the filter entirely
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [value, setFilter]);

  return (
    <div
      className="relative mt-2.5 w-full bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar participante"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ParticipantFilter;
