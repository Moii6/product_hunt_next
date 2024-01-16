import Alerta from "@/components/Alerta";
import Comentario from "@/components/Comentario";
import Error404 from "@/components/layout/Error404";
import Layout from "@/components/layout/Layout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useFirebase from "@/firebase/useFirebase";
import { getCapitalLetters } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Producto = () => {
  const [comentar, setComentar] = useState("");
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const {
    usuario,
    alerta,
    setAlerta,
    producto,
    obtenerProducto,
    error,
    updateProducto,
    crearComentario,
    productosList,
    obtenerProductos,
    eliminarProducto,
  } = useFirebase();
  const miAlerta = withReactContent(Swal);

  useEffect(() => {
    obtenerProducto(String(id));
  }, [id]);

  const handleVotar = async () => {
    if (loginForComment()) {
      if (userAbleToVote()) {
        const votosUp = Number(producto.votos) + 1;
        await updateProducto(producto, votosUp, usuario.uid);
      }
    }
    setTimeout(() => {
      setAlerta("");
    }, 3000);
  };

  const handleComentar = async () => {
    if (loginForComment()) {
      const nuevoComentario = {
        usuarioId: usuario.uid,
        usuarioNombre: usuario.displayName,
        comentario: comentar,
        creado: Date.now(),
      };
      await crearComentario(producto.id, nuevoComentario);
    }
    setTimeout(() => {
      setAlerta("");
    }, 3000);
  };

  const handleEliminar = async () => {
    if (userAbleToDelete()) {
      miAlerta
        .fire({
          title: "Quieres Eliminar este producto?",
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#db1507",
          cancelButtonText: "Cancelar",
          icon: "warning",
          showCancelButton: true,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            eliminarProducto(producto.imageDetails.refPath, producto.id);
            //Swal.fire("Se elimino!", "", "success");
            router.push("/");
          }
        });
    }
  };
  const loginForComment = () => {
    if (usuario.displayName) return true;
    else {
      setAlerta({ message: "Inicia sesion para continuar", type: "warning" });
      return false;
    }
  };

  const userAbleToVote = () => {
    if (!producto.votados.includes(usuario.uid)) return true;
    else {
      setAlerta({ message: "Ya votaste este producto", type: "warning" });
      return false;
    }
  };

  const userAbleToDelete = () => {
    if (producto.creador === usuario.uid) return true;
    else {
      setAlerta({
        message: "No puedes Eliminar este producto",
        type: "warning",
      });
      return false;
    }
  };
  useEffect(() => {
    if (Object.keys(productosList).length === 0) obtenerProductos();
  });
  return (
    <>
      <Layout>
        {error.message ? (
          <Error404 />
        ) : (
          <>
            <div className="flex flex-row justify-center mt-10">
              <div className="fixed -mt-10 w-full">
                {alerta.message && <Alerta alerta={alerta} />}
              </div>
              <div className="flex justify-between md:w-8/12">
                <div className="flex flex-col gap-2">
                  <div className="">
                    <img
                      className="w-40 h-28"
                      src={producto.imageDetails?.fullPath}
                      alt="imagen del producto"
                    />
                  </div>
                  <p className="text-xl font-bold">{producto?.empresa}</p>
                  <p className="text-xl text-blue-900">{producto?.nombre}</p>
                </div>
                <div className="md:w-5/12 gap-3 justify-end flex items-end">
                  <Link
                    target="blank"
                    className="rounded-sm md:w-3/12 py-5  text-center border-2 hover:border-orange-600"
                    href={producto?.url || ""}
                  >
                    Visitar
                  </Link>
                  <button
                    onClick={handleVotar}
                    className="rounded-sm md:w-9/12 uppercase gap-2 hover:bg-orange-600 flex flex-row justify-center items-center py-4 font-bold text-white bg-orange-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-9 h-9 font-bold text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                    votar <p>{producto.votos}</p>
                  </button>
                  {usuario.displayName && usuario.uid === producto.creador && (
                    <div className="flex justify-center mt-10">
                      <button
                        type="submit"
                        onClick={handleEliminar}
                        className=" bg-white  py-5 w-full px-2 border-2 rounded-sm hover:border-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="w-8/12 items-center">
                <div className="my-5 text-gray-600 text-lg">
                  <p>{producto.descripcion}</p>
                </div>
                <div className=" flex flex-col w-full   mt-14">
                  <div className="flex flex-row w-full border-y-2 py-4 items-center">
                    <div className="flex flex-row md:w-10/12 gap-2 ">
                      {usuario?.displayName && (
                        <div className="flex justify-start border-2 p-2 rounded-full text-white font-bold bg-gray-400">
                          {getCapitalLetters(usuario.displayName)}
                        </div>
                      )}

                      <input
                        className="w-full px-4 mr-2 focus:outline-none "
                        type="text"
                        placeholder="Que opinas?"
                        onChange={(e) => setComentar(e.target.value)}
                        value={comentar}
                      />
                    </div>
                    <div className="flex w-2/12 justify-center">
                      <button
                        onClick={handleComentar}
                        className=" rounded-lg py-3 w-full border-2 hover:border-orange-600  font-bold"
                      >
                        {usuario.displayName ? "Comentar" : "Login for comment"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    {producto?.comentarios &&
                      producto?.comentarios.map((item) => (
                        <Comentario
                          key={usuario.uid}
                          userId={usuario.uid}
                          comentario={item}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Producto;
