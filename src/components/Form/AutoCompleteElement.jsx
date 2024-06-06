import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import axios from "axios";

const AutoCompleteElement = ({
  required,
  label,
  id,
  suggestions = [],
  onSelect,
  selectedCustomer, // Prop para el cliente seleccionado
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCustomer) {
        const response = await axios.get(
          `https://api.legalistas.com.ar/v1/user/${selectedCustomer}`,
        );
        const customerData = response.data;

        if (customerData) {
          const fullName = `${customerData.profile.firstname} ${customerData.profile.lastname}`;
          setSearchValue(fullName);
        }
        console.log("Selected user in autocomplete: " + selectedCustomer, customerData)
      }
    }
    fetchData()
  }, [selectedCustomer, suggestions]);

  useEffect(() => {
    if (searchValue) {
      const filtered = suggestions.filter((suggestion) => {
        if (suggestion.profile) {
          const fullName = `${suggestion.profile.firstname} ${suggestion.profile.lastname}`;
          return fullName.toLowerCase().includes(searchValue.toLowerCase());
        }
        return false;
      });
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchValue, suggestions]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.profile) {
      const fullName = `${suggestion.profile.firstname} ${suggestion.profile.lastname}`;
      setSearchValue(fullName);
      onSelect(suggestion.id);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative mx-auto mt-0 w-full max-w-md">
      <label
        className="text-sm font-medium text-black dark:text-white"
        htmlFor={id}
      >
        {required ? <span className="mr-1 text-red">*</span> : null}
        <span>{label}</span>
      </label>
      <div className="mb-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
        <input
          type="text"
          className="w-full rounded-lg px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar cliente por nombre"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      {showSuggestions && searchValue && (
        <div className="absolute z-10 mt-0 max-h-60 w-full overflow-y-auto rounded-lg border border-stroke bg-white p-1 shadow-card dark:border-strokedark dark:bg-boxdark">
          <div className="overflow-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="hover:bg-gray-200 cursor-pointer px-4 py-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {`${suggestion.profile.firstname} ${suggestion.profile.lastname}`}
                </div>
              ))
            ) : (
              <div className="text-gray-500 flex items-center justify-center px-4 py-4">
                <div className="flex flex-col items-center">
                  <FaUsers className="text-4xl text-black/40" />
                  <span className="text-md text-center text-black/40">
                    Busque los contactos ya cargados por nombre, apellido y/o
                    razón social
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteElement;
