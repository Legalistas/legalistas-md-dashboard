import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

const CreateOpportunity = () => {
  const [states, setStates] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [filteredLocalities, setFilteredLocalities] = useState([]);
  const [sourceChanel, setSourceChanel] = useState([]);

  useEffect(() => {
    // Define async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.legalistas.com.ar/v1/settings",
        );
        const data = await response.json();

        setStates(data.states);
        setLocalities(data.localities);
        setSourceChanel(data.source_channels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const localitiesForState = localities.filter(
        (locality) => locality.state_id === selectedState,
      );
      setFilteredLocalities(localitiesForState);
    }
  }, [selectedState, localities]);

  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-4 gap-6">
        <div className="col-span-2 flex flex-col gap-3">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="mr-1 text-danger">*</span>
            <span className="font-semibold">Cliente</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
            <button className="ml-0.5 rounded-lg bg-primary px-4 py-2 text-white">
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Nº de caso interno</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Ingrese el Nº de caso interno"
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Canal de ingreso</span>
          </label>
          <div className="flex">
            <div className="relative z-20 w-full bg-white dark:bg-form-input">
              <select
                id="sourceChanel"
                onChange={(e) => setSourceChanel(parseInt(e.target.value))}
                className="rounded-lg w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                <option value="">Seleccione una opción</option>
                {sourceChanel.map((channel) => (
                  <option key={channel.id} value={channel.id}>
                    {channel.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                <FaChevronDown className="h-[20px] w-[20px]" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-0">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Correo Electrónico</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-0">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Caracteristica</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-0">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Teléfono</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-0">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Provincia</span>
          </label>
          <div className="flex">
            <div className="relative z-20 w-full bg-white dark:bg-form-input">
              <select
                id="stateSelect"
                onChange={(e) => setSelectedState(parseInt(e.target.value))}
                className="rounded-lg w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                <option value="">Seleccione una provincia</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                <FaChevronDown className="h-[20px] w-[20px]" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-0">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Ciudad</span>
          </label>
          <div className="flex">
            <div className="relative z-20 w-full bg-white dark:bg-form-input">
              <select
                id="localitySelect"
                disabled={!selectedState}
                className="rounded-lg w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                <option value="">Seleccione una localidad</option>
                {filteredLocalities.map((locality) => (
                  <option key={locality.id} value={locality.id}>
                    {locality.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                <FaChevronDown className="h-[20px] w-[20px]" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Abogado Responsable</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-3">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Abogado Interno</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-3">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Canal de comunicacion</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-3">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Canal de comunicacion</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-3">
          <label className="block text-sm font-medium text-black dark:text-white">
            <span className="font-semibold">Canal de comunicacion</span>
          </label>
          <div className="flex">
            <input
              type="text"
              id="website-admin"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Bonnie Green"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOpportunity;
