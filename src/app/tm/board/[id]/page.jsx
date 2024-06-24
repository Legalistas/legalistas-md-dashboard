"use client"
import React, { useEffect, useState } from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { usePathname } from 'next/navigation';
import path from 'path';
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAuth } from "@/contexts/AuthContext";
import KanbanBoard from "@/components/TeamManager/KanbanBoard";
import { getTasks } from '@/services/boards';

function page() {
    const pathname = usePathname();
    const currentFolder = path.basename(pathname);
    const [selectedTeam, setSelectedTeam] = useState("");

    const { user } = useAuth();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTasks(currentFolder);

                setCategories(response);
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
            const sourceItems = Array.from(sourceColumn.tasks);
            const destItems = Array.from(destColumn.tasks);
            const [movedItem] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, movedItem);

            updatedCategories = categories.map((column) => {
                if (column.id.toString() === source.droppableId) {
                    return { ...column, tasks: sourceItems };
                } else if (column.id.toString() === destination.droppableId) {
                    return { ...column, tasks: destItems };
                } else {
                    return column;
                }
            });
        } else {
            const column = categories.find(
                (column) => column.id.toString() === source.droppableId,
            );
            const copiedItems = Array.from(column.tasks);
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            updatedCategories = categories.map((col) => {
                if (col.id.toString() === source.droppableId) {
                    return { ...col, task: copiedItems };
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
        <div>
            {/* Aca se muestra la tabla especifica por id */}

            <DefaultLayout>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <KanbanBoard categories={categories} />
                </DragDropContext>
            </DefaultLayout>
        </div>
    )
}

export default page
