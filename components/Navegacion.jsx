import Link from "next/link";
import React from "react";

const Navegacion = ({ usuario }) => {
  return (
    <div>
      <nav className="text-sm flex gap-3">
        <Link className="hover:text-orange-600" href="/">
          Inicio
        </Link>
        <Link className="hover:text-orange-600" href="/populares">
          Populares
        </Link>
        {usuario?.displayName && (
          <Link className="hover:text-orange-600" href="/nuevoProducto">
            Nuevo Producto
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navegacion;
