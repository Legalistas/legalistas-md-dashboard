"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useAuth } from "@/contexts/AuthContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import KanbanHeader from "@/components/Crm/KanbanHeader";
import { FaClipboardUser, FaEllipsisVertical } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa";

const KanbanPipelinePage = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://api.legalistas.com.ar/v1/crm",
          {
            userId: user.user.id,
          },
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.user?.id) {
      fetchData();
    }
  }, [user]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    let updatedCategories = [];

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = categories.find(
        (column) => column.id.toString() === source.droppableId,
      );
      const destColumn = categories.find(
        (column) => column.id.toString() === destination.droppableId,
      );
      const sourceItems = Array.from(sourceColumn.leads);
      const destItems = Array.from(destColumn.leads);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      updatedCategories = categories.map((column) => {
        if (column.id.toString() === source.droppableId) {
          return { ...column, leads: sourceItems };
        } else if (column.id.toString() === destination.droppableId) {
          return { ...column, leads: destItems };
        } else {
          return column;
        }
      });
    } else {
      const column = categories.find(
        (column) => column.id.toString() === source.droppableId,
      );
      const copiedItems = Array.from(column.leads);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      updatedCategories = categories.map((col) => {
        if (col.id.toString() === source.droppableId) {
          return { ...col, leads: copiedItems };
        } else {
          return col;
        }
      });
    }

    setCategories(updatedCategories);

    // Aquí puedes realizar la llamada a la API para almacenar el nuevo estado en la base de datos
    try {
      const response = await axios.post(
        "https://api.legalistas.com.ar/v1/update-crm",
        { userId: user.user.id, categories: updatedCategories },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Datos almacenados exitosamente");
    } catch (error) {
      console.error("Error almacenando los datos:", error);
    }
  };

  return (
    <DefaultLayout>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="mx-auto">
          <Breadcrumb pageName="Kanban Pipeline" />
          <KanbanHeader />
          <div className="whitespace-nowraps flex gap-4">
            {categories.map((column) => (
              <Droppable key={column.id} droppableId={column.id.toString()}>
                {(provided) => (
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
                    <ul>
                      {column.leads.map((lead, leadIndex) => (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id.toString()}
                          index={leadIndex}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="pb-2.5"
                            >
                              <div className="rounded-lg border border-stroke bg-white p-4 pb-2.5 shadow-card dark:border-strokedark dark:bg-boxdark">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <h3 className="text-md mb-2 font-bold">
                                      {lead.name}
                                    </h3>
                                  </div>
                                  <button className="text-gray-400 hover:text-gray-600">
                                    +
                                  </button>
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
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>
    </DefaultLayout>
  );
};

export default KanbanPipelinePage;
