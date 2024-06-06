import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import KanbanHeader from "@/components/Crm/KanbanHeader";
import KanbanColumn from "@/components/Crm/KanbanColumn";
import KanbanList from "@/components/Crm/KanbanList";

const KanbanBoard = ({ categories }) => {
  const [showGrid, setShowGrid] = useState(true);

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <div className="mx-auto">
      <Breadcrumb pageName="Kanban Pipeline" />
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
