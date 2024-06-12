import React, { useState, useEffect } from "react";
import { create_opportunity } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { FaUserPlus } from "react-icons/fa";
import Modal from "@/components/Modals/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TaskPopup = (props) => {
  const [files, setFiles] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState("1-NUEVA CONSULTA");
  const { user } = useAuth();
  const [states, setStates] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [filterLocalities, setFilterLocalities] = useState([]);
  const [services, setServices] = useState([]);
  const [source_channels, setSource_channels] = useState([]);
  const [formattedUsers, setFormattedUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [role, setRole] = useState([]);
  const [lawyersInt, setlawyersInt] = useState([]);
  const [lawyersExt, setLawyersExt] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Modal crear usuario
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    status: "open",
    state: "pending",
    category_id: 1,
    seller_id: user?.user?.id,
    internal_lawyer_id: 1,
    external_lawyer_id: 2,
    services: {
      type: 0,
      personal_injuries: 1,
      art: 1,
    },
    email: "",
    phone: "",
    state_id: 0,
    locality_id: 0,
    source_channel: 0,
    customer_id: 0,
  });

  // Creacion de usuario
  const [createUser, setCreateUser] = useState({
    email: "",
    password: "",
    role: 8,
    team: 33,
    firstname: "",
    lastname: "",
  });

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
    "10-PERDIDA",
  ];

  // Función para manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "states") {
      setFormData({
        ...formData,
        state_id: parseInt(value),
      });

      // Filter localities based on the selected state
      const filteredLocalities = localities.filter(
        (locality) => locality.state_id === parseInt(value),
      );
      setFilterLocalities(filteredLocalities);
    } else if (name === "client") {
      setFormData({
        ...formData,
        customer_id: parseInt(value),
      });
    } else if (name === "email") {
      setFormData({
        ...formData,
        email: value,
      });
    } else if (name === "localities") {
      setFormData({
        ...formData,
        locality_id: parseInt(value),
      });
    } else if (name === "lw_in") {
      setFormData({
        ...formData,
        internal_lawyer_id: parseInt(value),
      });
    } else if (name === "lw_ex") {
      setFormData({
        ...formData,
        external_lawyer_id: parseInt(value),
      });
    } else if (name === "phone") {
      setFormData({
        ...formData,
        phone: value,
      });
    } else if (name === "service") {
      setFormData({
        ...formData,
        services: {
          ...formData.services,
          type: parseInt(value),
        },
      });
    } else if (name === "personal_injuries") {
      setFormData({
        ...formData,
        services: {
          ...formData.services,
          personal_injuries: parseInt(value),
        },
      });
    } else if (name === "art") {
      setFormData({
        ...formData,
        services: {
          ...formData.services,
          art: parseInt(value),
        },
      });
    } else if (name === "canalComunicacion") {
      setFormData({
        ...formData,
        source_channel: parseInt(value),
      });
    } else if (name === "fname") {
      setCreateUser({
        ...createUser,
        firstname: value,
      });
    } else if (name === "lname") {
      setCreateUser({
        ...createUser,
        lastname: value,
      });
    } else if (name === "create_email") {
      setCreateUser({
        ...createUser,
        email: value,
      });
    } else if (name === "pass") {
      setCreateUser({
        ...createUser,
        password: value,
      });
    } else if (name === "area") {
      const selectedTeam = teams.find((team) => team.id === parseInt(value));
      setCreateUser({
        ...createUser,
        team: selectedTeam.id,
      });
      setRole(
        selectedTeam.Roles.map((role) => ({ id: role.id, name: role.name })),
      );
    } else if (name === "role") {
      setCreateUser({
        ...createUser,
        role: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    console.log(formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.legalistas.com.ar/v1/settings",
        );
        const users = await fetch("https://api.legalistas.com.ar/v1/user");
        const area_rol = await fetch(
          "https://api.legalistas.com.ar/v1/api/teams",
        );
        const abogados_otros = await fetch(
          "https://api.legalistas.com.ar/v1/user",
        );
        const customers = await fetch(
          "https://api.legalistas.com.ar/v1/customer",
        );

        if (abogados_otros.ok && customers.ok) {
          const abogados = await abogados_otros.json();
          const customerss = await customers.json();

          const abogadosInternos = abogados.filter(
            (abogado) =>
              abogado.teamRole.role_id >= 6 && abogado.teamRole.role_id <= 7,
          );
          const abogadosExternos = abogados.filter(
            (abogado) =>
              abogado.teamRole.role_id >= 1 && abogado.teamRole.role_id <= 5,
          );

          setlawyersInt(abogadosInternos);
          setLawyersExt(abogadosExternos);
          setCustomers(customerss);
        }

        if (area_rol.ok) {
          const area = await area_rol.json();
          const filteredTeams = area.filter((team) => team.name !== "Clientes");
          setTeams(filteredTeams);
        }

        if (response.ok && users.ok) {
          /// Response handler \\\
          const data = await response.json();
          setStates(data.states);
          setLocalities(data.localities);
          setServices(data.services);
          setSource_channels(data.source_channels);

          /// Users handler \\\
          const userData = await users.json();
          const formattedUsers = userData.map((user) => ({
            user_id: user.profile.user_id,
            firstname: user.profile.firstname,
            lastname: user.profile.lastname,
          }));
          setFormattedUsers(formattedUsers);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // empty dependency array to run only once on component mount

  /// Crear user funtion \\\
  const handleCreateUser = async (data) => {
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
      toast("¡Usuario creado exitosamente!");
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      toast("Error occurred", error.message);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 z-9999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5 ${
        props.popupOpen === true ? "block" : "hidden"
      }`}
    >
      <div className="relative m-auto w-full max-w-180 rounded-xl border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
        <button
          onClick={() => props.setPopupOpen(false)}
          className="absolute right-1 top-1 sm:right-5 sm:top-5"
        >
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z"
              fill=""
            />
          </svg>
        </button>

        <form action={() => create_opportunity(formData)}>
          {/* /////////////////////// INICIO FORMULARIO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

          {/* /////////////////////// Cliente \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
          <div className="mb-5">
            <label
              htmlFor="client"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Cliente
            </label>
            <div className="flex w-full">
              <select
                name="client"
                id="client"
                onChange={handleInputChange}
                className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccione un usuario
                </option>
                {customers.map((cus) => (
                  <option key={cus.id} value={cus.id}>
                    {cus.profile.lastname}, {cus.profile.firstname}
                  </option>
                ))}
              </select>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
                className="flex w-[10%] items-center justify-center rounded-e-xl bg-[#4d60e3] p-1"
              >
                <FaUserPlus className="w-full text-[25px]  text-white " />
              </button>

              {/* /// Modal popup a mostrar \\\ */}
              <Modal show={showModal} onClose={closeModal}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateUser(createUser);
                  }}
                >
                  <h2>Crear cliente</h2>

                  <div className="flex w-full gap-3">
                    <div className="mb-5 w-1/2">
                      <label
                        htmlFor="fname"
                        className="mb-2.5 block font-medium text-black dark:text-white"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder="Ingrese su Nombre"
                        className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-5 w-1/2">
                      <label
                        htmlFor="lname"
                        className="mb-2.5 block font-medium text-black dark:text-white"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="lname"
                        id="lname"
                        placeholder="Ingrese su Apellido"
                        className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="create_email"
                      className="mb-2.5 block font-medium text-black dark:text-white"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="text"
                      name="create_email"
                      id="create_email"
                      placeholder="Ingrese su correo electrónico"
                      className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="pass"
                      className="mb-2.5 block font-medium text-black dark:text-white"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="pass"
                      id="pass"
                      placeholder="Ingrese su contraseña"
                      className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="repass"
                      className="mb-2.5 block font-medium text-black dark:text-white"
                    >
                      Repetir contraseña
                    </label>
                    <input
                      type="password"
                      name="repass"
                      id="repass"
                      placeholder="Ingrese nuevamente su contraseña"
                      className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCreateUser(createUser)}
                    className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4.5 py-2.5 font-medium text-white hover:bg-opacity-90"
                  >
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_60_9740)">
                        <path
                          d="M18.75 9.3125H10.7187V1.25C10.7187 0.875 10.4062 0.53125 10 0.53125C9.625 0.53125 9.28125 0.84375 9.28125 1.25V9.3125H1.25C0.875 9.3125 0.53125 9.625 0.53125 10.0312C0.53125 10.4062 0.84375 10.75 1.25 10.75H9.3125V18.75C9.3125 19.125 9.625 19.4687 10.0312 19.4687C10.4062 19.4687 10.75 19.1562 10.75 18.75V10.7187H18.75C19.125 10.7187 19.4687 10.4062 19.4687 10C19.4687 9.625 19.125 9.3125 18.75 9.3125Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_60_9740">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Enviar
                  </button>
                </form>
              </Modal>
            </div>
          </div>

          <div className="flex w-full gap-3">
            {/* /////////////////////// Provincia \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
            <div className="mb-5 w-1/2">
              <label
                htmlFor="states"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Provincia
              </label>
              <select
                name="states"
                id="states"
                className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                onChange={handleInputChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccione una provincia
                </option>
                {/* Options from api states constant */}
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* /////////////////////// Ciudad \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
            <div className="mb-5 w-1/2">
              <label
                htmlFor="localities"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Ciudad
              </label>
              <select
                name="localities"
                id="localities"
                className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                onChange={handleInputChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccione un cuidad
                </option>
                {/* Options from localities.json */}
                {filterLocalities.map((locality) => (
                  <option key={locality.id} value={locality.id}>
                    {locality.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* /////////////////////// Correo Electronico \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese su correo electrónico"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            />
          </div>

          {/* /////////////////////// Teléfono \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Teléfono
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Ingrese su teléfono"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            />
          </div>

          {/* /////////////////////// Servicio \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
          <div className="mb-5">
            <label
              htmlFor="service"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Servicío
            </label>
            <select
              name="service"
              id="service"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled>
                Seleccione un servicio
              </option>
              {/* Options from api services constant */}
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full gap-3">
            {/* /////////////////////// Daños leves \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
            <div className="mb-5 w-1/2">
              <label
                htmlFor="personal_injuries"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Daños leves
              </label>
              <select
                name="personal_injuries"
                id="personal_injuries"
                className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                onChange={handleInputChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value={1}>Si</option>
                <option value={0}>No</option>
              </select>
            </div>

            {/* /////////////////////// ART \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
            <div className="mb-5 w-1/2">
              <label
                htmlFor="art"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                ART
              </label>
              <select
                name="art"
                id="art"
                className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                onChange={handleInputChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value={1}>Si</option>
                <option value={0}>No</option>
              </select>
            </div>
          </div>

          {/* /////////////////////// Canal de Comunicación \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
          <div className="mb-5">
            <label
              htmlFor="canalComunicacion"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Canal de Comunicación
            </label>
            <select
              name="canalComunicacion"
              id="canalComunicacion"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              {/* Options from source_channels */}
              {source_channels.map((source_channels) => (
                <option key={source_channels.id} value={source_channels.id}>
                  {source_channels.name}
                </option>
              ))}
            </select>
          </div>

          {/* /////////////////////// Abogados \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
          <div className="flex w-full gap-3">
            <div className="mb-5 w-1/2">
              <label
                htmlFor="lw_in"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Seleccione un abogado representante
              </label>
              <select
                name="lw_in"
                id="lw_in"
                className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                onChange={handleInputChange}
                defaultValue=""
              >
                {/* Options from api teams constant */}
                <option value="" disabled>
                  Seleccione un abogado
                </option>
                {lawyersInt.map((abogado) => (
                  <option key={abogado.id} value={abogado.id}>
                    {abogado.profile.lastname}, {abogado.profile.firstname}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5 w-1/2">
              <label
                htmlFor="lw_ex"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Seleccione un abogado interno
              </label>
              <select
                name="lw_ex"
                id="lw_ex"
                className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                onChange={handleInputChange}
                defaultValue=""
              >
                {/* Options from api teams constant */}
                <option value="" disabled>
                  Seleccione un abogado
                </option>
                {lawyersExt.map((abogado) => (
                  <option key={abogado.id} value={abogado.id}>
                    {abogado.profile.lastname}, {abogado.profile.firstname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* /////////////////////// Selector de columna por las dudas \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
          {/* <div className="mb-5">
            <label htmlFor="column" className="mb-2.5 block font-medium text-black dark:text-white">Columna</label>
            <select
              value={selectedColumn} // Enlaza el valor del select al estado selectedColumn
              onChange={(e) => setSelectedColumn(e.target.value)} // Actualiza el estado selectedColumn cuando el select cambia
              className="p-2 border w-full border-gray-300 rounded"
            >
              {columns.map(column => (
                <option key={column} value={column}>{column}</option>
              ))}
            </select>
          </div> */}

          {/* Botón de envío */}
          <button
            type="button"
            onClick={() => {
              create_opportunity(formData)
                .then(() => {
                  toast("¡Oportunidad creada exitosamente!");
                })
                .catch((error) => {
                  toast.error("Error al crear usuario: " + error.message);
                });
            }}
            className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4.5 py-2.5 font-medium text-white hover:bg-opacity-90"
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_60_9740)">
                <path
                  d="M18.75 9.3125H10.7187V1.25C10.7187 0.875 10.4062 0.53125 10 0.53125C9.625 0.53125 9.28125 0.84375 9.28125 1.25V9.3125H1.25C0.875 9.3125 0.53125 9.625 0.53125 10.0312C0.53125 10.4062 0.84375 10.75 1.25 10.75H9.3125V18.75C9.3125 19.125 9.625 19.4687 10.0312 19.4687C10.4062 19.4687 10.75 19.1562 10.75 18.75V10.7187H18.75C19.125 10.7187 19.4687 10.4062 19.4687 10C19.4687 9.625 19.125 9.3125 18.75 9.3125Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_60_9740">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopup;
