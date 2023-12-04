import React, { useEffect, useState } from "react";
import Buscador from "./Buscador";
import Navegacion from "./Navegacion";
import Link from "next/link";
import { useContext } from "react";
import FirebaseContext from "../firebase/context";

const Header = () => {
  const { usuario, cerrarSesion } = useContext(FirebaseContext);

  const handleCerrarSesion = () => {
    cerrarSesion();
  };

  return (
    <header className="border-b-2 border-gray-200 pt-2 pb-3">
      <div className="md:flex justify-between max-w-6xl w-11/12 mx-auto">
        <div className="flex justify-between items-center gap-2">
          <div className="pr-3 pl-3 py-1 mx-3 bg-orange-500 rounded-full">
            <Link href={"/"}>
              <p className="logo font-bold text-white text-3xl">P</p>
            </Link>
          </div>
          <p className=" text-lg text-orange-500 font-bold">Product Hunt</p>
          <Buscador />
          <Navegacion usuario={usuario} />
        </div>
        <div className="flex justify-between items-center">
          {usuario?.displayName ? (
            <>
              <button
                className=" p-2 text-sm text-orange-500 mx-1m hover:text-gray-900"
                type="button"
                onClick={handleCerrarSesion}
              >
                Cerrar Sesion
              </button>
              <h1 className="text-gray-950  text-lg font-bold">
                {usuario?.displayName}
              </h1>
            </>
          ) : (
            <>
              <Link
                className="text-blue-600 px-3 hover:text-orange-600"
                href={"/login"}
              >
                Login
              </Link>
              <Link
                className="bg-orange-500 rounded-md py-3 px-3 font-bold text-sm text-white"
                href={"/crearCuenta"}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
