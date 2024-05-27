import React, { useState } from "react";
import statesData from './mockData/states.json'; // Importar datos de states.json
import localitiesData from './mockData/localities.json'; // Importar datos de localities.json
import abogadosData from './mockData/Abogados.json'; // Importar datos de Abogados.json
import abogadosInternosData from './mockData/AbogadosInternos.json'; // Importar datos de AbogadosInternos.json



const TaskPopup = (props) => {
  const [files, setFiles] = useState(null);

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    apellido: '',
    nombre: '',
    provincia: '',
    ciudad: '',
    correoElectronico: '',
    caracteristicaTelefono: '',
    telefono: '',
    abogadoResponsable: '',
    abogadoInterno: '',
    prioridad: '',
    canalComunicacion: '',
    motivoConsulta: '',
    lesionesPersonales: '',
    tieneART: '',
  });

  
  // Función para manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5 ${props.popupOpen === true ? "block" : "hidden"
        }`}
    >
      <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
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

        <form action="#">
          <div className="mb-5">
            <label htmlFor="apellido" className="mb-2.5 block font-medium text-black dark:text-white">
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              id="apellido"
              placeholder="Ingrese su apellido"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="nombre" className="mb-2.5 block font-medium text-black dark:text-white">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Ingrese su nombre"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="provincia" className="mb-2.5 block font-medium text-black dark:text-white">
              Provincia
            </label>
            <select
              name="provincia"
              id="provincia"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              {/* Options from states.json */}
              {statesData.map((state) => (
                <option key={state.id} value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="ciudad" className="mb-2.5 block font-medium text-black dark:text-white">
              Ciudad
            </label>
            <select
              name="ciudad"
              id="ciudad"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              {/* Options from localities.json */}
              {localitiesData.map((locality) => (
                <option key={locality.id} value={locality.name}>{locality.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="correoElectronico" className="mb-2.5 block font-medium text-black dark:text-white">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correoElectronico"
              id="correoElectronico"
              placeholder="Ingrese su correo electrónico"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="caracteristicaTelefono" className="mb-2.5 block font-medium text-black dark:text-white">
              Característica de Teléfono
            </label>
            <input
              type="tel"
              name="caracteristicaTelefono"
              id="caracteristicaTelefono"
              placeholder="Ingrese la característica de su teléfono"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="telefono" className="mb-2.5 block font-medium text-black dark:text-white">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              placeholder="Ingrese su número de teléfono"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="abogadoResponsable" className="mb-2.5 block font-medium text-black dark:text-white">
              Abogado Responsable
            </label>
            <select
              name="abogadoResponsable"
              id="abogadoResponsable"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              {/* Options from Abogados.json */}
              {abogadosData.map((abogado) => (
                <option key={abogado.id} value={abogado.name}>{abogado.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="abogadoInterno" className="mb-2.5 block font-medium text-black dark:text-white">
              Abogado Interno
            </label>
            <select
              name="abogadoInterno"
              id="abogadoInterno"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              {/* Options from AbogadosInternos.json */}
              {abogadosInternosData.map((abogado) => (
                <option key={abogado.id} value={abogado.name}>{abogado.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="prioridad" className="mb-2.5 block font-medium text-black dark:text-white">
              Prioridad
            </label>
            <select
              name="prioridad"
              id="prioridad"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="muy alta">Muy Alta</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="canalComunicacion" className="mb-2.5 block font-medium text-black dark:text-white">
              Canal de Comunicación
            </label>
            <select
              name="canalComunicacion"
              id="canalComunicacion"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              <option value="website">Website</option>
              <option value="telemarketing">Telemarketing</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="google">Google</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="radio">Radio</option>
              <option value="referido">Referido</option>
              <option value="correo electronico">Correo Electrónico</option>
              <option value="otros">Otros</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="motivoConsulta" className="mb-2.5 block font-medium text-black dark:text-white">
              Motivo Consulta
            </label>
            <select
              name="motivoConsulta"
              id="motivoConsulta"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              <option value="accidente de trabajo">Accidente de Trabajo</option>
              <option value="accidentes de transito">Accidentes de Tránsito</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="lesionesPersonales" className="mb-2.5 block font-medium text-black dark:text-white">
              ¿En el accidente han ocurrido lesiones personales?
            </label>
            <select
              name="lesionesPersonales"
              id="lesionesPersonales"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="tieneART" className="mb-2.5 block font-medium text-black dark:text-white">
              ¿Tiene ART?
            </label>
            <select
              name="tieneART"
              id="tieneART"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
              onChange={handleInputChange}
            >
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Botón de envío */}
          <button className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4.5 py-2.5 font-medium text-white hover:bg-opacity-90">
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
