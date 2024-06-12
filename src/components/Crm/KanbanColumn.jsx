import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "@/components/Crm/KanbanCard";
import { FaEllipsisVertical } from "react-icons/fa6";

const KanbanColumn = ({ column }) => {
  return (
    <>
      <Droppable key={column.id} droppableId={column.id.toString()}>
        {(provided, snapshot) => (
          <div
            className="flex h-[100%] w-80 flex-shrink-0 flex-col  rounded-lg border border-stroke bg-white p-4 pb-2.5 shadow-card dark:border-strokedark dark:bg-boxdark"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{column.name}</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FaEllipsisVertical />
              </button>
            </div>
            {snapshot.isDraggingOver && (
              <div className="placeholder-dragging" />
            )}
            <div className="flex flex-col gap-2.5">
              {column.leads.map((lead, index) => (
                <KanbanCard key={`${column.id}_${index}`} lead={lead} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default KanbanColumn;

