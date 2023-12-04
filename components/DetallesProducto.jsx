import useFirebase from "@/firebase/useFirebase";
import { formatoFecha } from "@/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";

const DetallesProducto = ({ producto }) => {
  const { usuario, updateProducto, obtenerProducto, setAlerta } = useFirebase();
  const { id, nombre, empresa, imageDetails, votos, creado } = producto;

  const handleVotar = async () => {
    console.log(usuario.uid);
    if (loginForComment()) {
      if (userAbleToVote()) {
        const votosUp = Number(producto.votos) + 1;
        console.log(votosUp, usuario.uid);
        await updateProducto(producto, votosUp, usuario.uid);
      }
    }
    setTimeout(() => {
      setAlerta("");
    }, 3000);
  };
  useEffect(() => {
    console.log(producto);
  }, []);

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
  return (
    <Fragment>
      <li className=" flex flex-row mb-5 w-full rounded-lg py-2 px-3 hover:bg-orange-50">
        <div className="flex-1  gap-4">
          <div className="flex flex-row gap-4">
            <div className="">
              <img
                className="w-10 h-10"
                src={imageDetails?.fullPath}
                alt="imagen del producto"
              />
            </div>
            <div className="flex flex-col w-3/5 gap-2">
              <div className="flex flex-row">
                <p className="font-bold text-sm mr-3">{empresa}</p>
                <Link
                  className="font-bold text-sm"
                  href="/productos/[id]"
                  as={`/productos/${id}`}
                >
                  {nombre}
                </Link>
              </div>
              <p className="text-gray-500 text-xs">
                {producto?.creado &&
                  formatDistanceToNow(new Date(Number(producto?.creado)), {
                    locale: es,
                  })}
              </p>
              {/** <p className="line-clamp-2 text-xs">{descripcion}</p>*/}
            </div>
          </div>
        </div>
        <div
          onClick={handleVotar}
          className=" flex flex-col justify-center items-center w-16 border-2 rounded hover:border-orange-300 cursor-pointer "
        >
          <div>&#9650;</div>
          <p className="text-xs text-gray-800">{votos}</p>
        </div>
      </li>
    </Fragment>
  );
};

export default DetallesProducto;
