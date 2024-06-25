import {
    FaDiagramProject,
    FaFolderTree,
    FaLocationDot,
    FaPencil,
    FaUser,
    FaCalendar,
    FaCalendarDay,
    FaCalendarWeek,
    FaDollarSign,
    FaFolderOpen,
    FaGavel,
    FaUserTie,
  } from "react-icons/fa6";
  
  const CausesProceedingsData = ({ causeData }) => {
    return (
      <>
        <div className="mt-4 rounded-lg bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-bold">Detalles del Expediente</h2>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaFolderTree />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Nº de Caso interno:</h5>
                </div>
              </div>
              <h5 className="w-[25%] cursor-pointer text-right font-normal">
                {causeData.internal_number}
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaFolderOpen />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Nº de Expediente:</h5>
                </div>
              </div>
              <h5 className="w-[25%] cursor-pointer text-right font-normal">
                {causeData.cuij}
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaGavel />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Juzgado</h5>
                </div>
              </div>
              <h5 className="w-3/4 cursor-pointer text-right font-normal">
                {causeData.court?.jurisdictionCompetences?.name || "No asignado"}
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaPencil />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Estado:</h5>
                </div>
              </div>
              <h5 className="w-[25%] cursor-pointer text-right font-normal">
                {causeData.procedural_stage_id &&
                causeData.procedural_stage_id === 26
                  ? "Cerrado"
                  : causeData.procedural_stage_id === 27
                    ? "Archivado"
                    : "Abierto"}
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaDiagramProject />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Proceso:</h5>
                </div>
              </div>
              <h5 className="w-[70%] cursor-pointer text-right font-normal">
                {causeData.process_type?.name || "No asignado"}
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaLocationDot />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Ciudad:</h5>
                </div>
              </div>
              <h5 className="w-[70%] cursor-pointer text-right font-normal">
                {causeData.customer?.profile?.states?.name || "No asignado"}
                {causeData.customer?.profile?.states &&
                causeData.customer?.profile?.localities?.name
                  ? `, ${causeData.customer?.profile?.localities?.name}`
                  : causeData.customer?.profile?.localities?.name || ""}
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaDollarSign />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Monto reclamado:</h5>
                </div>
              </div>
              <h5 className="w-[50%] cursor-pointer text-right font-normal">
                Proximamente
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaUserTie />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">A. Responsables:</h5>
                </div>
              </div>
              <h5 className="w-[50%] cursor-pointer text-right font-normal">
                Proximamente
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaUser />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">A. Interno:</h5>
                </div>
              </div>
              <h5 className="w-[50%] cursor-pointer text-right font-normal">
                Proximamente
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaCalendarDay />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">F. de Inicio:</h5>
                </div>
              </div>
              <h5 className="w-[50%] cursor-pointer text-right font-normal">
                Proximamente
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaCalendarDay />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">F. de Accidente:</h5>
                </div>
              </div>
              <h5 className="w-[50%] cursor-pointer text-right font-normal">
                Proximamente
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaCalendar />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Edad. Al Accidente:</h5>
                </div>
              </div>
              <h5 className="w-[45%] cursor-pointer text-right font-normal">
                Proximamente
              </h5>
            </div>
          </div>
  
          <div className="mb-2 mt-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaCalendarWeek />
                </div>
                <div className="ml-1">
                  <h5 className="font-semibold">Caduca en:</h5>
                </div>
              </div>
              <h5 className="w-[45%] cursor-pointer text-right font-normal">
                Son
              </h5>
            </div>
          </div>
  
          <div className="mt-4 flex justify-between space-x-4">
            <button className="rounded bg-green-500 px-4 py-2 text-white">
              Solicitar
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 text-white">
              Generar carátula
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default CausesProceedingsData;
  