import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@nextui-org/react";

import KanbanSearch from "@/components/Crm/Components/KanbanSearch";
import BtnNewOpportunity from "@/components/Crm/Components/BtnNewOpportunity";
import BtnActions from "@/components/Crm/Components/BtnActions";
import CustomModal from "@/components/Modals/CustomModal";
import CreateOpportunity from "@/components/Crm/Components/CreateOpportunity";

const KanbanHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="mx-auto mb-4 w-full">
        <div className="rounded-lg border border-stroke bg-white p-1 shadow-card dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <KanbanSearch />
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <BtnNewOpportunity open={onOpen} />

              <BtnActions />
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={isOpen ? onClose : onOpen}
        title="Nueva oportunidad"
        size="5xl"
        modalPlacement="center"
      >
        <CreateOpportunity />
      </CustomModal>
    </>
  );
};

export default KanbanHeader;
