import { useDisclosure } from "@nextui-org/react";
import KanbanSearch from "@/components/TeamManager/Components/KanbanSearch";
import BtnNewTask from "@/components/TeamManager/Components/BtnNewTask";
import BtnNewCol from "@/components/TeamManager/Components/BtnNewCol";
import CustomModal from "@/components/Modals/CustomModal";
import CreateColumn from "@/components/TeamManager/Components/CreateColumn";
import CreateTask from "@/components/TeamManager/Components/CreateTask";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { BsKanban, BsTable } from "react-icons/bs";

const KanbanHeader = ({ toggleGrid, showGrid }) => {
  const { isOpen: createTask, onOpen: openCreateTask, onClose: closeCreateTask } = useDisclosure();
  const { isOpen: createCol, onOpen: openCreateCol, onClose: closeCreateCol } = useDisclosure();

  return (
    <>
      <div className="mx-auto mb-4 w-full">
        <div className="rounded-lg border border-stroke bg-white p-1 shadow-card dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <KanbanSearch />
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <BtnNewTask open={openCreateTask} />
              <BtnNewCol open={openCreateCol} />
              <button
                onClick={toggleGrid}
                type="button"
                className="flex items-center gap-2 rounded-lg bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
              >
                {showGrid ? <BsTable className="text-title-sm2" /> : <BsKanban className="text-title-sm2"/>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={createTask}
        onOpenChange={createTask ? closeCreateTask : openCreateTask}
        title="Nueva Tarea"
        size="5xl"
        modalPlacement="center"
      >
        <CreateTask />
      </CustomModal>
      <CustomModal
        isOpen={createCol}
        onOpenChange={createCol ? closeCreateCol : openCreateCol}
        title="Nueva Columna"
        size="sm"
        modalPlacement="center"
      >
        <CreateColumn />
      </CustomModal>
    </>
  );
};

export default KanbanHeader;
