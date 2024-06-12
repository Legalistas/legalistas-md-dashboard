"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAuth } from "@/contexts/AuthContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import KanbanBoard from "@/components/Crm/KanbanBoard";
import Loader from "@/components/common/Loader";

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

    fetchData();
  }, []);

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
        <KanbanBoard categories={categories} />
      </DragDropContext>
    </DefaultLayout>
  );
};

export default KanbanPipelinePage;
