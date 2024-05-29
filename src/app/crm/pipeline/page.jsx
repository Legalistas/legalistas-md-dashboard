import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Kanban from "@/components/Crm/Kanban";
import { DragDropContext } from "@hello-pangea/dnd";

const CrmPipeline = () => {
  return (
    <>
      <DefaultLayout>
        <Kanban />
      </DefaultLayout>
    </>
  );
};

export default CrmPipeline;
