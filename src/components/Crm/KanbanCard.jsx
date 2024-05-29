import React from "react";
import { FaCommentDots, FaClipboardUser } from "react-icons/fa6";
import { Draggable } from 'react-beautiful-dnd';

const KanbanCard = ({ lead, index }) => {
  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="rounded-lg border border-stroke bg-white p-4 pb-2.5 shadow-card dark:border-strokedark dark:bg-boxdark"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-md mb-2 font-bold">{lead.name}</h3>
            </div>
            {/* Aquí está tu botón */}
            <button className="text-gray-400 hover:text-gray-600">+</button>
          </div>
          <div className="mt-2 flex items-center justify-between"></div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-gray-400 flex space-x-2 text-xs">
              <span className="flex items-center space-x-1">
                <FaCommentDots />
                <span>10</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaClipboardUser />
                <span>1</span>
              </span>
            </div>
            <img
              className="h-6 w-6 rounded-full"
              src="https://placehold.co/600x400/EEE/31343C"
              alt="User Avatar"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;