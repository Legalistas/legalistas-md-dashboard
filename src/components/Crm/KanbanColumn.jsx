import React, { useEffect } from "react";
import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import KanbanCard from "@/components/Crm/KanbanCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const KanbanColumn = ({ column }) => {
  const onDragEnd = (result) => {};
  return (
    <div key={column.id}>
      <div className="mx-auto flex w-[272px] flex-col rounded-lg border border-stroke bg-white p-4 pb-2.5 shadow-card dark:border-strokedark dark:bg-boxdark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{column.name}</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <FaEllipsisVertical />
          </button>
        </div>
        <div className="overflow-x-auto">
          
            <Droppable
              droppableId="droppable"
              type="default"
              ignoreContainerClipping={false}
            >
              {(provided, snapshot) => (
                <div
                  className="flex flex-col space-y-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {column.leads.map((lead, index) => (
                    <Draggable
                      key={lead.id}
                      draggableId={lead.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanCard lead={lead} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
         
        </div>
        <button className="text-gray-400 hover:text-gray-600 mt-4 flex w-full items-center justify-center">
          <FaPlus />
          <span className="ml-2">Add task</span>
        </button>
      </div>
    </div>
  );
};

export default KanbanColumn;
