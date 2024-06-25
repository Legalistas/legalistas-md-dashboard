"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAuth } from "@/contexts/AuthContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import KanbanBoard from "@/components/Crm/KanbanBoard";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const KanbanPipelinePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
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
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [user.user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const updatedCategories = [...categories];
    const sourceColumn = updatedCategories.find(
      (column) => column.id.toString() === source.droppableId,
    );
    const destColumn = updatedCategories.find(
      (column) => column.id.toString() === destination.droppableId,
    );

    if (sourceColumn && destColumn) {
      const sourceItems = Array.from(sourceColumn.leads);
      const [movedItem] = sourceItems.splice(source.index, 1);

      if (source.droppableId !== destination.droppableId) {
        const destItems = Array.from(destColumn.leads);
        destItems.splice(destination.index, 0, movedItem);
        sourceColumn.leads = sourceItems;
        destColumn.leads = destItems;
      } else {
        sourceItems.splice(destination.index, 0, movedItem);
        sourceColumn.leads = sourceItems;
      }

      setCategories(updatedCategories);

      try {
        const lead = movedItem.leadId;
        const destinyColumn = destination.droppableId;

        const response = await axios.post(
          "https://api.legalistas.com.ar/v1/crm/update-category",
          { leadId: lead, destinationCategoryId: destinyColumn },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log(response);

        if (response.data.success == true) {
          toast.success("Datos actualizados correctamente");
          router.push("/crm");
        } else {
          console.error("Error almacenando los datos");
          toast.error("Error almacenando los datos");
          setError("Error almacenando los datos");
        }

      } catch (error) {
        console.error("Error almacenando los datos:", error);
        setError("Error almacenando los datos");
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <DefaultLayout>
      <DragDropContext onDragEnd={handleDragEnd}>
        <KanbanBoard categories={categories} />
      </DragDropContext>
    </DefaultLayout>
  );
};

export default KanbanPipelinePage;
