import { useEffect, useState } from "react";
import axios from "axios";
import InputElement from "@/components/Form/InputElement";
import SelectElement from "@/components/Form/SelectElement";

const CreateCustomer = ({ states, localities, onCreateCustomer }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [filteredLocalities, setFilteredLocalities] = useState([]);

  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    characteristic: "",
    phone: "",
    state_id: "",
    locality_id: "",
  });

  useEffect(() => {
    if (selectedState) {
      const localitiesForState = localities.filter(
        (locality) => locality.state_id === selectedState,
      );
      setFilteredLocalities(localitiesForState);
    }
  }, [selectedState, localities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.legalistas.com.ar/v1/customer/create",
        formData,
      );
      onCreateCustomer(response.data); // Llama a la función de callback para actualizar la lista de clientes
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="-mx-3 mb-0 flex flex-wrap justify-between">
          <div className="mb-2 w-full px-3">
            <div className="flex w-full justify-between gap-4">
              <div className="w-1/2">
                <InputElement
                  label="Apellido/Razón Social"
                  type="text"
                  required={true}
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <InputElement
                  label="Nombre"
                  type="text"
                  required={true}
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex w-full justify-between gap-4">
              <div className="w-full">
                <InputElement
                  label="Correo Electrónico"
                  type="text"
                  required={true}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex w-full justify-between gap-4">
              <div className="w-1/4">
                <InputElement
                  label="Caracteristica"
                  type="text"
                  required={true}
                  name="characteristic"
                  value={formData.characteristic}
                  onChange={handleChange}
                />
              </div>
              <div className="w-3/4">
                <InputElement
                  label="Teléfono"
                  type="text"
                  required={true}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex w-full justify-between gap-4">
              <div className="w-1/2">
                <SelectElement
                  label="Provincia"
                  onChange={(e) => {
                    setSelectedState(parseInt(e.target.value));
                    handleChange(e);
                  }}
                  options={states}
                  id="provincia"
                  name="state_id"
                  required={true}
                />
              </div>
              <div className="w-1/2">
                <SelectElement
                  label="Ciudad"
                  disabled={!selectedState}
                  options={filteredLocalities}
                  id="ciudad"
                  name="locality_id"
                  required={true}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-0 mt-4 flex w-full items-center justify-center gap-4">
              <div className="w-full text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Crear cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCustomer;
