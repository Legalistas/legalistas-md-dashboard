"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import KanbanColumn from "@/components/Crm/KanbanColumn";
import { useAuth } from "@/contexts/AuthContext";


const Kanban = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://api.legalistas.com.ar/v1/crm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="mx-auto ">
        <Breadcrumb pageName="CRM - EMBUDO" />

        <div className="flex gap-4 whitespace-nowrap">
          {category.map((column, index) => (
            <KanbanColumn key={index} column={column} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Kanban;
