import { Draggable } from "@hello-pangea/dnd";
import { Tooltip } from "@nextui-org/react";
import { FaCommentDots } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import KanbanCardAvatar from "./KanbanCardAvatar";
import Link from "next/link";

const KanbanCard = ({ task, index }) => {
  return (
    <>
      <Draggable
        key={task.taskId}
        draggableId={task.taskId.toString()}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="pb-2.5"
            style={{
              ...provided.draggableProps.style,
              cursor: "grab",
              transition: "transform 0.2s ease-out",
              transform:
                snapshot.isDragging && provided.draggableProps.style.transform
                  ? `translate(${provided.draggableProps.style.transform.split("translate(")[1].split(")")[0]}) rotate(3deg)`
                  : provided.draggableProps.style.transform,
            }}
          >
            {/* Cambios echos por leonel */}
            <Link href={`/tm/board/${task.taskId}`}>
              <div className="rounded-lg border border-stroke bg-white p-4 pb-2.5 shadow-card dark:border-strokedark dark:bg-boxdark">
                <div className="flex items-center justify-between">
                  <h3 className="text-md mb-2 font-bold">
                    {task.taskTitle}
                  </h3>
                  <h3 className="cursor-pointer text-sm font-bold">
                    <Tooltip content={`Nº de oportunidad: ${task.taskId}`}>
                      {task.taskId}
                    </Tooltip>
                  </h3>
                </div>

                <div className="mb-2 mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="rounded bg-[#EFF4FB] px-2.5 py-0.5 text-xs font-medium text-black dark:bg-[#374151] dark:text-gray overflow-hidden">
                      {task.taskDescription}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-gray-400 flex space-x-2 text-sm">
                    <span className="flex items-center space-x-1">
                      <FaCommentDots />
                      <span>10</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaClipboardUser />
                      <span>1</span>
                    </span>
                  </div>
                  <KanbanCardAvatar task={task} />
                </div>
              </div>
            </Link>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default KanbanCard;
