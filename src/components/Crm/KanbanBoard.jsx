import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import KanbanHeader from "@/components/Crm/KanbanHeader";
import KanbanColumn from "@/components/Crm/KanbanColumn";

const KanbanBoard = ({ categories }) => {
  return (
    <div className="mx-auto">
      <Breadcrumb pageName="Kanban Pipeline" />
      <KanbanHeader />
      <div className="whitespace-nowraps flex gap-4 overflow-x-auto">
        {categories.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
