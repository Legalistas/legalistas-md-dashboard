"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TaskHeader from "@/components/TaskHeader";
import DropdownDefault from "@/components/Dropdowns/DropdownDefault";
import Drag from "@/js/drag";
import Image from "next/image";

const TaskKanban: React.FC = () => {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([
    { id: 1, title: "Esto es una tarjeta de oportunidad", column: "1-NUEVA CONSULTA" },
    { id: 2, title: "Esto es una tarjeta de oportunidad", column: "1-NUEVA CONSULTA" },
    { id: 3, title: "Esto es una tarjeta de oportunidad", column: "1-NUEVA CONSULTA" },
    { id: 4, title: "Esto es una tarjeta de oportunidad", column: "2-REUNIÓN A CONCRETAR" },
    { id: 5, title: "Esto es una tarjeta de oportunidad", column: "3-REUNIÓN COORDINADA" },
    { id: 6, title: "Esto es una tarjeta de oportunidad", column: "4-EN TRATAMIENTO" },
    { id: 7, title: "Esto es una tarjeta de oportunidad", column: "5-PENDIENTE DE CONFIRMACIÓN" },
    { id: 8, title: "Esto es una tarjeta de oportunidad", column: "6-COORDINAR REUNIÓN PODER" },
    { id: 9, title: "Esto es una tarjeta de oportunidad", column: "7-REUNIÓN DE PODER" },
    { id: 10, title: "Esto es una tarjeta de oportunidad", column: "8-PENDIENTE PODER" },
    { id: 11, title: "Esto es una tarjeta de oportunidad", column: "9-GANADO - TRAJO PODER" },
    { id: 12, title: "Esto es una tarjeta de oportunidad", column: "10-PERDIDA" },
  ]);

  // Estado para el título de la nueva tarea
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Estado para la columna seleccionada
  const [selectedColumn, setSelectedColumn] = useState("1-NUEVA CONSULTA");

  // Hook useEffect para inicializar la funcionalidad de arrastrar y soltar
  useEffect(() => {
    Drag();
  });

  // Función para añadir una nueva tarea
  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1, // Genera un id único basado en la longitud actual de las tareas
      title: newTaskTitle, // Usa el título de la nueva tarea del estado
      column: selectedColumn, // Usa la columna seleccionada del estado
    };
    setTasks([...tasks, newTask]); // Añade la nueva tarea al estado de tareas
    setNewTaskTitle(""); // Resetea el campo del título de la nueva tarea
  };

  // Lista de columnas para el kanban
  const columns = [
    "1-NUEVA CONSULTA",
    "2-REUNIÓN A CONCRETAR",
    "3-REUNIÓN COORDINADA",
    "4-EN TRATAMIENTO",
    "5-PENDIENTE DE CONFIRMACIÓN",
    "6-COORDINAR REUNIÓN PODER",
    "7-REUNIÓN DE PODER",
    "8-PENDIENTE PODER",
    "9-GANADO - TRAJO PODER",
    "10-PERDIDA"
  ];

  return (
    <>
      <div className="mx-auto ">
        <Breadcrumb pageName="TaskKanban" />

        <TaskHeader />

        <div className="mt-9 flex overflow-x-auto gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
          {columns.map(column => (
            <div key={column} className="swim-lane flex flex-col gap-5.5">
              <h4 className="text-xl font-semibold w-[400px] text-black dark:text-white">
                {column}
              </h4>
              {tasks
                .filter(task => task.column === column) // Filtra las tareas por la columna actual
                .map(task => (
                  <div
                    key={task.id}
                    draggable="true"
                    className="task relative flex cursor-move justify-between rounded-sm border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark"
                  >
                    <div>
                      <h2>{task.title}</h2>
                    </div>
                    <div className="absolute right-4 top-4">
                      <DropdownDefault />
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* <div className="mt-9 flex flex-col gap-5.5">
          <input
            type="text"
            value={newTaskTitle} // Enlaza el valor del input al estado newTaskTitle
            onChange={(e) => setNewTaskTitle(e.target.value)} // Actualiza el estado newTaskTitle cuando el input cambia
            placeholder="Nueva tarea"
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={selectedColumn} // Enlaza el valor del select al estado selectedColumn
            onChange={(e) => setSelectedColumn(e.target.value)} // Actualiza el estado selectedColumn cuando el select cambia
            className="p-2 border border-gray-300 rounded"
          >
            {columns.map(column => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
          <button
            onClick={handleAddTask} // Llama a handleAddTask cuando se hace clic en el botón
            className="p-2 bg-blue-500 text-white rounded"
          >
            Agregar Tarea
          </button>
        </div> */}


      </div>
    </>
  );
};

export default TaskKanban;
