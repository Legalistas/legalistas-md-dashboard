"use client";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPhone } from "react-icons/fa6";

const MakeClient = () => {
  const [states, setStates] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [filteredLocalities, setFilteredLocalities] = useState([]);
  const [selectedState, setSelectedState] = useState();

  // Creacion de usuario
  const [createUser, setCreateUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    state_id: 0,
    locality_id: 0,
    phone: 0,
    characteristic: 0
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.legalistas.com.ar/v1/settings",
        );
        const setting = response.data;

        setStates(setting.states);
        setLocalities(setting.localities);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = async () => {
      try {
        const localitiesForState = localities.filter(
          (locality) => locality.state_id == createUser.state_id
        );
        setFilteredLocalities(localitiesForState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    filterData();
  }, [selectedState]);




  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateUser({ ...createUser, [name]: value });
    if (name === "state_id") {
      setSelectedState(value);
    }
  };

  /// Crear user funtion \\\
  const handleCreateUser = async (data) => {
    console.log(createUser);
    try {
      console.log("Sending POST request with data:", data);
      const response = await axios.post(
        "https://api.legalistas.com.ar/v1/customer/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Response:", response.data);
      toast.success("¡Usuario creado exitosamente!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred", error.message);
    }
  };

  return (
    <div className="rounded-lg border border-stroke bg-white pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
      <div className="flex items-center justify-between rounded p-4">
        <div className="relative w-1/2">
          <h3 className="text-2xl font-bold dark:text-white">
            Datos del nuevo miembro
          </h3>
        </div>
        <div className="flex w-1/2 items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => handleCreateUser(createUser)}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </button>
        </div>
      </div>
      <div className="max-w-full">
        <form className="mx-auto max-w-full p-2.5">
          <div className="flex w-full gap-5">
            <div className="group relative z-0 mb-5 w-1/2 pb-10">
              <label
                htmlFor="lastname"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Apellido
              </label>
              <div className="absolute flex w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Apellido"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="group relative z-0 mb-5 w-1/2 pb-10">
              <label
                htmlFor="firstname"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Nombre
              </label>
              <div className="absolute flex w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Nombre"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="group relative z-0 mb-5 w-full pb-10">
            <label
              htmlFor="email"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Correo Electronico
            </label>
            <div className="absolute flex w-full">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Correo Electronico"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex w-full gap-5">
            <div className="group relative z-0 mb-5 w-1/3 pb-10">
              <label
                htmlFor="characteristic"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Característica
              </label>
              <div className="absolute flex w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <FaPhone />
                </div>
                <input
                  type="text"
                  name="characteristic"
                  id="characteristic"
                  placeholder="Ingresa la característica"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="group relative z-0 mb-5 w-[66%] pb-10">
              <label
                htmlFor="phone"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Telefono
              </label>
              <div className="absolute flex w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <FaPhone />
                </div>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Ingresa el telefono"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full gap-5">
            <div className="group relative z-0 mb-5 w-1/2">
              <label
                htmlFor="state_id"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >Provincia</label>
              <select
                id="state_id"
                name="state_id"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option value="" >--Seleccione una provincia--</option>
                {states.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="group relative z-0 mb-5 w-1/2">
              <label
                htmlFor="locality_id"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >Cuidad</label>
              <select
                id="locality_id"
                name="locality_id"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handleChange}
              >
                <option value="" disabled>--Seleccione una cuidad--</option>
                {filteredLocalities.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeClient;
