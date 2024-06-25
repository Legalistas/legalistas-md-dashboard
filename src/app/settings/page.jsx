"use client";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Card from "@/components/Card/Card";
import InputElement from "@/components/Form/InputElement";
import SelectComponent from "@/components/Form/SelectComponent";
import { useAuth } from "@/contexts/AuthContext";
import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";

const Settings = () => {
  const { user } = useAuth();
  const { push } = useRouter();
  const [states, setStates] = useState([]);
  const [localities, setLocalities] = useState([]);

  const [userData, setUserData] = useState({
    firstname: user?.user?.profile?.firstname || "",
    lastname: user?.user?.profile?.lastname || "",
    email: user?.user?.email || "",
    birthdate: user?.user?.profile?.birthdate || "",
    stateId: user?.user?.profile?.state_id || "",
    localityId: user?.user?.profile?.locality_id || "",
    avatar: user?.user?.profile?.avatar || "",
  });

  useEffect(() => {
    console.log("Initial userData:", userData);
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setUserData({
      ...userData,
      birthdate: date,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log("🚀 ~ handleSelectChange ~ name, value:", name, value);

    // Ensure name is correctly read from the select element
    if (!name) {
      console.error("Name attribute is missing in the event target");
      return;
    }

    setUserData((prevUserData) => {
      const newUserData = { ...prevUserData, [name]: value };
      console.log("Updated userData:", newUserData);
      return newUserData;
    });
  };

  const filteredLocalities = localities.filter(
    (locality) => parseInt(locality.state_id) === parseInt(userData.stateId),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = user?.user?.id;
    const parsedDate = new Date(userData.birthdate);
    const formatDate = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
    )
      .toISOString()
      .split("T")[0];

    const formData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      birthdate: formatDate,
      state: userData.stateId, // Asegúrate de que coincida con el nombre del campo en tu API
      locality: userData.localityId, // Asegúrate de que coincida con el nombre del campo en tu API
      // Agrega otros campos necesarios para crear la oportunidad aquí
    };

    try {
      const response = await axios.put(
        `https://api.legalistas.com.ar/v1/user/profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("🚀 ~ handleSubmit ~ responseData:", response);

      if (response.status === 200) {
        toast.success("Los datos se han actualizado correctamente");
        push("/settings");
      } else {
        throw new Error(
          response.data.error || "Hubo un error al actualizar los datos",
        );
      }
    } catch (error) {
      console.error("Error actualizando datos:", error);
      toast.error(
        "Hubo un error al actualizar los datos. Por favor, inténtalo de nuevo más tarde.",
      );
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <Breadcrumb pageName="Configuración" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <Card title="Información personal">
              <form onSubmit={handleSubmit}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <InputElement
                      id="lastname"
                      label="Apellido"
                      type="text"
                      name="lastname"
                      value={userData.lastname}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <InputElement
                      id="firstname"
                      label="Nombre"
                      type="text"
                      name="firstname"
                      value={userData.firstname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <div className="relative">
                    <InputElement
                      id="email"
                      label="Correo electrónico"
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    Fecha de nacimiento
                  </label>
                  <DatePicker
                    aria-label="birthdate"
                    name="birthdate"
                    value={userData.birthdate}
                    onChange={handleDateChange}
                    className="mb-3 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <SelectComponent
                      labelName="Provincias"
                      name="stateId"
                      value={userData.stateId}
                      onChange={handleSelectChange}
                      options={states}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <SelectComponent
                      labelName="Ciudad"
                      name="localityId"
                      value={userData.localityId}
                      onChange={(e) =>
                        setUserData((prevUserData) => ({
                          ...prevUserData,
                          localityId: e.target.value,
                        }))
                      }
                      options={filteredLocalities}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancelar
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </Card>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <Card title="Tu foto">
              <form>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full">
                    <Avatar
                      size="lg"
                      name={`${userData.firstname} ${userData.lastname}`}
                      src={userData.avatar}
                    />
                    {/* <img
                      src={"/images/user/user-03.png"}
                      width={55}
                      height={55}
                      alt="User"
                    /> */}
                  </div>
                  <div>
                    <span className="mb-1.5 text-black dark:text-white">
                      Foto de perfil
                    </span>
                    <span className="flex gap-2.5">
                      <button className="text-sm hover:text-primary">
                        Delete
                      </button>
                      <button className="text-sm hover:text-primary">
                        Update
                      </button>
                    </span>
                  </div>
                </div>
                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p>
                      <span className="text-primary">
                        Haga clic para cargar
                      </span>{" "}
                      or arrastrar y soltar
                    </p>
                    <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                    <p>(max, 800 X 800px)</p>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
