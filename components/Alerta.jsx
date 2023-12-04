import React from "react";

const Alerta = ({ alerta }) => {
  const { message, type } = alerta;

  switch (type) {
    case "success":
      return (
        <>
          <div
            className={`flex justify-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100`}
            role="alert"
          >
            <span className="font-medium">{message}</span>
          </div>
        </>
      );
    case "error":
      return (
        <>
          <div
            className={`flex justify-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100`}
            role="alert"
          >
            <span className="font-medium">{message}</span>
          </div>
        </>
      );
    case "warning":
      return (
        <>
          <div
            className={`flex justify-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-100`}
            role="alert"
          >
            <span className="font-medium">{message}</span>
          </div>
        </>
      );
    default:
      return (
        <>
          <div
            className={`p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-100`}
            role="alert"
          >
            <span className="font-medium">{type}! </span>
            {message}
          </div>
        </>
      );
  }
};

export default Alerta;
