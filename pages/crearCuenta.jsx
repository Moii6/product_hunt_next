import Link from "next/link";
import React, { useContext, useState } from "react";
import { validarEmail, validarPassword, validarString } from "@/utils";
import Layout from "@/components/layout/Layout";
import Alerta from "@/components/Alerta";
import FirebaseContext from "../firebase";
//import useFirebase from "@/firebase/useFirebase";

const crearCuenta = () => {
  const [nuevoUsuario] = useContext(FirebaseContext);
  //const { nuevoUsuario } = useFirebase();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarString(nombre)) {
      setErrorNombre("*El nombre debe tener mas de 3 caracteres");
    }
    if (!validarEmail(email)) {
      setErrorEmail("*El email es incorrecto");
    }
    if (!validarPassword(password)) {
      setErrorPassword("*El password debe tener mas de 6 caracteres");
    } else {
      try {
        await nuevoUsuario(nombre, email, password);
        setAlerta({ message: "El usuario se creo con exito", type: "success" });
        setNombre("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      } catch (error) {
        setAlerta({
          message: `Error al crear el usuario: ${error.message}`,
          type: "error",
        });
        console.error("Error al crear el usuario:  ", error.message);
      }
    }
  };
  return (
    <>
      <Layout>
        {alerta.message && (
          <div className="flex justify-center  mt-10">
            <Alerta alerta={alerta} />
          </div>
        )}
        <div className="flex justify-center items-center ">
          <div
            className={`${
              alerta.message && "-mt-11"
            } mt-20 pt-20 flex md:flex-row justify-center md:w-8/12 lg:w-6/12  shadow-md rounded-xl`}
          >
            <div className="md:w-8/12 bg-gradient-to-bl from-orange-400 to-orange-700 rounded-l-xl text-white p-5">
              <div className="flex flex-col w-full p-5">
                <span className="mb-10 text-sm font-normal pt_sans">
                  Product Hunt
                </span>

                <p className=" mt-10 text-6xl font-bold">Welcome</p>
              </div>
            </div>
            <div className="w-full bg-white">
              <form onSubmit={handleSubmit} className="py-10 px-10 ">
                <h1 className="text-center text-2xl mb-5 text-gray-900 font-bold">
                  Nueva Cuenta
                </h1>
                <div className="mb-5 flex flex-col justify-center">
                  <label
                    htmlFor="nombre"
                    className="text-xs pb-2 text-gray-600"
                  >
                    Nombre
                  </label>
                  <p className="text-red-600 text-xs font-bold">
                    {errorNombre}
                  </p>
                  <input
                    type="nombre"
                    id="nombre"
                    name="nombre"
                    className="border-2 px-2 py-1 rounded-lg"
                    placeholder="Tu nombre"
                    onChange={(e) => setNombre(e.target.value)}
                    onBlur={() => {
                      if (validarString(nombre)) setErrorNombre("");
                    }}
                    value={nombre}
                  />
                </div>
                <div className="mb-5 flex flex-col justify-center">
                  <label htmlFor="email" className="text-xs pb-2 text-gray-600">
                    Email
                  </label>
                  <p className="text-red-600 text-xs font-bold">{errorEmail}</p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border-2 px-2 py-1 rounded-lg"
                    placeholder="ejemplo@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                      if (validarEmail(email)) setErrorEmail("");
                      if (alerta.message) setAlerta("");
                    }}
                    value={email}
                  />
                </div>
                <div className="mb-5 flex flex-col justify-center">
                  <label
                    htmlFor="password"
                    className="text-xs pb-2 text-gray-600"
                  >
                    Contraseña
                  </label>
                  <p className="text-red-600 text-xs font-bold">
                    {errorPassword}
                  </p>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="border-2 px-2 py-1  rounded-lg"
                    placeholder="contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => {
                      if (validarPassword(password)) setErrorPassword("");
                    }}
                    value={password}
                  />
                </div>

                <input
                  type="submit"
                  className="hover:bg-orange-600 cursor-pointer mt-10 bg-orange-500 w-full py-2 rounded-md text-center text-white font-bold"
                  value={"Crear Cuenta"}
                />
                <div className="mt-5">
                  <p className="text-xs text-gray-400">
                    Ya tienes una cuenta?{" "}
                    <span className="text-gray-800 hover:underline">
                      <Link href={"/login"}>Incia Sesion</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default crearCuenta;
