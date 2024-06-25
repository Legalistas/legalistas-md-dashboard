import React from "react";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
        <button onClick={onClose} className="text-red-500 float-right">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;