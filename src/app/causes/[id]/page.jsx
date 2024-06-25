"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { usePathname } from "next/navigation";
import path from "path";
import EditIcon from "@/components/Icons/EditIcon";
import CausesProceedingsData from "@/components/Causes/CausesProceedingsData";
import MovementsCard from "@/components/Causes/Components/MovementsCard";
import { FaWhatsapp, FaFilePdf } from "react-icons/fa6";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

const Page = () => {
  const pathname = usePathname();
  const currentFolder = path.basename(pathname);
  const [selected, setSelected] = useState("movements");
  const [causeData, setCauseData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.legalistas.com.ar/v1/causes/" + currentFolder,
        );

        const customerProfile = response.data.customer?.profile;
        const processType = response.data.process_type?.name;

        // Buscar el litigante que sea demandado
        const demandadoLitigant = response.data.litigants.find(
          (litigant) => litigant.role === "Demandado",
        );
        const litigantsProfile = demandadoLitigant?.customer?.profile;

        // Set the state with derived data
        setCauseData({
          ...response.data,
          customerProfile,
          processType,
          litigantsProfile,
        });

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [currentFolder, setCauseData]);

  const { customerProfile, processType, litigantsProfile } = causeData;

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        <div className="bg-gray-200 p-4 md:col-span-3">
          <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <h1 className="mb-2 text-xl font-semibold uppercase sm:mb-0">
              {customerProfile
                ? `${customerProfile.lastname} ${customerProfile.firstname}`
                : "No profile data"}
              <span>
                {litigantsProfile
                  ? ` C/${litigantsProfile.lastname} ${litigantsProfile.firstname}`
                  : ""}
                {processType ? ` S/${processType}` : ""}
              </span>
            </h1>
            <div className="flex justify-between space-x-3">
              <button className="text-dark">
                <EditIcon className="h-8 w-8" />
              </button>
              <button className="text-dark">
                <FaWhatsapp className="h-8 w-8" />
              </button>
              <button className="text-dark">
                <FaFilePdf className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mb-4 flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
            <div className="flex-1 rounded bg-red p-4 text-white">
              <p className="font-semibold">Mov. pendientes 0</p>
              <p>0 Movimientos importantes</p>
            </div>
            <div className="flex-1 rounded bg-green-500 p-4 text-white">
              <p className="font-semibold">Balance 0 $</p>
              <button className="mt-2 rounded bg-white px-4 py-2 text-green-500">
                Nuevo movimiento contable
              </button>
            </div>
            <div className="flex-1 rounded bg-blue-500 p-4 text-white">
              <p className="font-semibold">Instó a la acción hace -</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-4 flex w-full flex-wrap">
            {/* <button className="border-b-2 border-blue-500 px-4 py-2 text-blue-500">
              Movimientos
            </button>
            <button className="text-gray-500 px-4 py-2">Adjuntos</button>
            <button className="text-gray-500 px-4 py-2">
              Cuenta corriente
            </button>
            <button className="text-gray-500 px-4 py-2">Auditoría</button>
            <button className="text-gray-500 px-4 py-2">Escritos</button>
            <button className="text-gray-500 px-4 py-2">Forms</button>
            <button className="text-gray-500 px-4 py-2">Partes</button>
            <button className="text-gray-500 px-4 py-2">Vinculados</button>
            <button className="text-gray-500 px-4 py-2">Liquidaciones</button> */}
            <Tabs
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={setSelected}
              fullWidth
              size="md"
              radius="sm"
              shadow="md"
              color="primary"
              classNames={{
                base: "w-full pb-2",
                tabList:
                  "w-full bg-white rounded-lg border border-solid border-1 border-neutral-300 shadow-sm font-normal title-2xl",
                panel: "rounded-lg bg-white p-4 shadow w-full",
              }}
            >
              <Tab key="movements" title="Movimientos">
                <MovementsCard />
              </Tab>
              <Tab key="attachments" title="Adjuntos">
                <Card shadow="sm" radius="sm" classNames="bg-white p-4 shadow">
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="writings" title="Escritos y Cedulas">
                <Card shadow="sm" radius="sm" classNames="bg-white p-4 shadow">
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="litigants" title="Demandados y/o intervinientes">
                <Card shadow="sm" radius="sm" classNames="bg-white p-4 shadow">
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="documentation" title="Documentación">
                <Card shadow="sm" radius="sm" classNames="bg-white p-4 shadow">
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="liquidation" title="Liquidación">
                <Card shadow="sm" radius="sm" classNames="bg-white p-4 shadow">
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="notes-internal" title="Notificaciones y Notas internas">
                <Card shadow="sm" radius="sm" classNames="bg-white p-4 shadow">
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>

          {/* Movements Table */}
        </div>
        <div className="bg-gray-300 p-4 md:col-span-1">
          <CausesProceedingsData causeData={causeData} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
