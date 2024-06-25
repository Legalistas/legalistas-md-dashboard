import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import KanbanHeader from "@/components/TeamManager/KanbanHeader";
import KanbanColumn from "@/components/TeamManager/KanbanColumn";
import KanbanList from "@/components/TeamManager/KanbanList";

const KanbanBoard = ({ categories }) => {
  const [showGrid, setShowGrid] = useState(true);

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <div className="mx-auto">
      <Breadcrumb pageName={`Teams / `} />
      <KanbanHeader showGrid={showGrid} toggleGrid={toggleGrid} />
      
      {showGrid ? (
        <div className="whitespace-nowraps flex gap-4 overflow-x-auto">
          {categories.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </div>
      ) : (
        <KanbanList />
      )}
    </div>
  );
};

export default KanbanBoard;
