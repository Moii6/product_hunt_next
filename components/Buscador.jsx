import useFirebase from "@/firebase/useFirebase";
import React, { useEffect, useState } from "react";

const Buscador = () => {
  const { setProductosList, productosList, obtenerProductos } = useFirebase();
  const [busqueda, setBusqueda] = useState("");

  const handleBusqueda = (e) => {
    if (e.target.value.length < 1) obtenerProductos();
    setBusqueda(e.target.value);
    console.log(busqueda.length);
    const buscados = [...productosList].filter((item) =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosList(buscados);

    console.log(busqueda);
  };
  const handleFocus = () => {
    obtenerProductos();
  };
  return (
    <div className="">
      <form action="">
        <input
          className="px-2 py-2 mx-2 border rounded-lg"
          type="text"
          placeholder="Buscar"
          onFocus={handleFocus}
          onChange={handleBusqueda}
          value={busqueda}
        />
      </form>
    </div>
  );
};

export default Buscador;
