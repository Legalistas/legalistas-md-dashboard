"use client";
import React, { useEffect, useState } from "react";
import FormInput from "./Component/FormInput";
import FormSelect from "./Component/FormSelect";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UserMake = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  // Creacion de usuario
  const [createUser, setCreateUser] = useState({
    email: "",
    password: "",
    role: 0,
    team: 0,
    firstname: "",
    lastname: "",
  })

  useEffect(() => {
    // Fetch the teams data from the API
    fetch("https://api.legalistas.com.ar/v1/api/teams")
      .then((response) => response.json())
      .then((data) => {
        // Filter out the "Clientes" team
        const filteredTeams = data.filter((team) => team.name !== "Clientes");
        setTeams(filteredTeams);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleTeamChange = (event) => {
    const teamId = event.target.value;
    setSelectedTeam(teamId);
    setCreateUser({
      ...createUser,
      team: event.target.value,
    });

    // Find the selected team
    const team = teams.find((t) => t.id === parseInt(teamId));

    // Set the roles for the selected team
    setRoles(team ? team.Roles : []);
    setSelectedRole(""); // Reset the selected role when the team changes
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setCreateUser({
      ...createUser,
      role: event.target.value,
    });
  };

  /// Form data handler \\\
  const handlerForm = (e) => {
    const { name, value } = e.target;

    if (name === 'lastname') {
      setCreateUser({
        ...createUser,
        lastname: value,
      });
    } else if (name === 'firstname') {
      setCreateUser({
        ...createUser,
        firstname: value,
      });
    } else if (name === "email") {
      setCreateUser({
        ...createUser,
        email: value,
      });
    } else if (name === "password") {
      setCreateUser({
        ...createUser,
        password: value,
      });
    }
  }

   /// Crear user funtion \\\
   const handleCreateUser = async (data) => {
    try {
      console.log('Sending POST request with data:', data);
      const response = await axios.post('https://api.legalistas.com.ar/v1/auth/register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      // toast("Success");
    } catch (error) {
      console.error('Error:', error);
      // toast("Error occurred", error.message);
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
            type="button" onClick={() => handleCreateUser(createUser)}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </button>
        </div>
      </div>
      <div className="max-w-full">
        <form className="mx-auto max-w-full p-2.5">
          <div className="grid md:grid-cols-2 md:gap-6">

            <div className="group relative z-0 mb-5 w-full pb-10">
              <label htmlFor="lastname" className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Apellido
              </label>
              <div className="flex w-full absolute">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Apellido"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={handlerForm}
                />
              </div>
            </div>
            <div className="group relative z-0 mb-5 w-full pb-10">
              <label htmlFor="firstname" className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Nombre
              </label>
              <div className="flex w-full absolute">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Nombre"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={handlerForm}
                />
              </div>
            </div>
          </div>
          <div className="group relative z-0 mb-5 w-full pb-10">
            <label htmlFor="email" className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Correo Electronico
            </label>
            <div className="flex w-full absolute">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Correo Electronico"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handlerForm}
              />
            </div>
          </div>
          <div className="group relative z-0 mb-5 w-full pb-10">
            <label htmlFor="password" className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Contraseña
            </label>
            <div className="flex w-full absolute">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={handlerForm}
              />
            </div>
          </div>
          <div className="group relative z-0 mb-5 w-full pb-10">
            <label htmlFor="repassword" className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Repetir contraseña
            </label>
            <div className="flex w-full absolute">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <FaLock />
              </div>
              <input
                type="password"
                name="repassword"
                id="repassword"
                placeholder="Repetir contraseña"
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 ps-10  text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-5 w-full">
              <FormSelect
                title="Selecciona un área"
                uid="team-select"
                name="team"
                placeholder="--Seleccione un área--"
                value={selectedTeam}
                onChange={handleTeamChange}
                data={teams}
              />
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <FormSelect
                title="Selecciona un rol"
                uid="role-select"
                name="role"
                placeholder="--Seleccione un rol--"
                value={selectedRole}
                onChange={handleRoleChange}
                data={roles}
                disabled={!selectedTeam}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserMake;
