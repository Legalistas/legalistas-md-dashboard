"use client";
import React, { useEffect, useState } from "react";
import FormInput from "./Component/FormInput";
import FormSelect from "./Component/FormSelect";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const UserMake = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

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

    // Find the selected team
    const team = teams.find((t) => t.id === parseInt(teamId));

    // Set the roles for the selected team
    setRoles(team ? team.Roles : []);
    setSelectedRole(""); // Reset the selected role when the team changes
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
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
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </button>
        </div>
      </div>
      <div className="max-w-full">
        <form className="mx-auto max-w-full p-2.5">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-5 w-full">
              <FormInput
                title="Apellido"
                type="text"
                uid="lastname"
                placeholder="Apellido"
                icon={FaUser}
                name="lastname"
              />
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <FormInput
                title="Nombre"
                type="text"
                uid="firstname"
                placeholder="Nombre"
                icon={FaUser}
                name="firstname"
              />
            </div>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <FormInput
              title="Correo Electronico"
              type="email"
              uid="email"
              placeholder="Correo Electronico"
              icon={FaEnvelope}
              name="email"
            />
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <FormInput
              title="Contraseña"
              type="password"
              uid="password"
              placeholder="Contraseña"
              icon={FaLock}
              name="password"
            />
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <FormInput
              title="Repetir contraseña"
              type="password"
              uid="repeat-password"
              placeholder="Repetir contraseña"
              icon={FaLock}
            />
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
