import { Draggable } from "@hello-pangea/dnd";
import { Tooltip } from "@nextui-org/react";
import { FaCommentDots } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import KanbanCardAvatar from "./KanbanCardAvatar";
import Link from "next/link";

const KanbanCard = ({ lead, index }) => {
  return (
    <>
      <Draggable
        key={lead.leadId}
        draggableId={lead.leadId.toString()}
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
                  ? `translate(${provided.draggableProps.style.transform.split("translate(")[1].split(")")[0]}) rotate(-3deg)`
                  : provided.draggableProps.style.transform,
            }}
          >
            {/* Cambios echos por leonel */}
            <Link href={`/crm/pipeline/${lead.leadId}`}>
              <div className="rounded-lg border border-stroke bg-white p-4 pb-2.5 shadow-card dark:border-strokedark dark:bg-boxdark">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#374151] px-2.5 py-0.5 text-xs font-medium text-gray dark:bg-[#374151] dark:text-gray">
                    {lead.customerStateName && lead.customerLocalityName
                      ? `${lead.customerStateName.name} - ${lead.customerLocalityName.name}`
                      : ""}
                  </span>
                  <h3 className="cursor-pointer text-sm font-bold">
                    <Tooltip content={`Nº de oportunidad: ${lead.leadId}`}>
                      {lead.leadId}
                    </Tooltip>
                  </h3>
                </div>

                <div className="mb-2 mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-md mb-2 font-bold">
                      {lead.customerName}
                    </h3>
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
                  <KanbanCardAvatar lead={lead} />
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
