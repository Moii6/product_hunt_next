import Alerta from "@/components/Alerta";
import Layout from "@/components/layout/Layout";
import useFirebase from "@/firebase/useFirebase";
import { validarEmail, validarPassword } from "@/utils";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
const Login = () => {
  const { iniciarSesion } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarEmail(email) || !validarPassword(password)) {
      setAlerta({ message: "Datos incorrectos", type: "error" });
    } else {
      try {
        await iniciarSesion(email, password);
        Router.push("/");
      } catch (error) {
        setAlerta({
          message: `Hubo un error al iniciar session: ${error.message}`,
          type: "error",
        });
      } finally {
        setTimeout(() => {
          setAlerta({});
        }, 10000);
      }
    }
  };
  return (
    <>
      <Layout>
        <div className="flex justify-center items-center min-h-screen ">
          <div className="flex md:flex-row justify-center md:w-8/12 lg:w-6/12  shadow-md rounded-xl">
            <div className="md:w-8/12 bg-gradient-to-bl from-orange-400 to-orange-700 rounded-l-xl text-white p-5">
              <div className="flex flex-col w-full p-5">
                <span className="mb-10 text-sm font-normal pt_sans">
                  Product Hunt
                </span>

                <p className="text-6xl font-bold">Hi there!</p>
              </div>
            </div>
            <div className="w-full bg-white">
              <form onSubmit={handleSubmit} className="py-10 px-10 ">
                <h1 className="text-center text-2xl mb-5 text-gray-900 font-bold">
                  Iniciar Sesion
                </h1>
                <div className="mb-7 flex flex-col justify-center">
                  <label htmlFor="email" className="text-xs pb-2 text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="border-2 px-2 py-1 rounded-lg"
                    placeholder="email de usuario"
                    onBlur={() => setAlerta({})}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mb-7 flex flex-col justify-center">
                  <label
                    htmlFor="password"
                    className="text-xs pb-2 text-gray-600"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="border-2 px-2 py-1  rounded-lg"
                    placeholder="contraseña de usuario"
                    onBlur={() => setAlerta({})}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center mb-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-3 h-3 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 "
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ms-2 text-xs font-medium text-gray-600 "
                    >
                      recordar usuario
                    </label>
                  </div>
                  <Link
                    className="text-xs text-orange-400 hover:text-orange-600  underline"
                    href={"/olvidePassword"}
                  >
                    Olvide mi password
                  </Link>
                </div>
                {alerta.message && (
                  <div className="flex1">
                    <Alerta alerta={alerta} />
                  </div>
                )}
                <input
                  type="submit"
                  className="hover:bg-orange-600 cursor-pointer mt-10 bg-orange-500 w-full py-2 rounded-md text-center text-white font-bold"
                  value={"Inciar Sesion"}
                />
                <div className="mt-5">
                  <p className="text-xs text-gray-400">
                    no tienes una cuenta?{" "}
                    <span className="text-gray-800 hover:underline">
                      <Link href={"/crearCuenta"}>Registrate</Link>
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

export default Login;
