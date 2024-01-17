import Alerta from "@/components/Alerta";
import DetallesProducto from "@/components/DetallesProducto";
import Layout from "@/components/layout/Layout";
import useFirebase from "@/firebase/useFirebase";
import React, { useEffect, useState } from "react";

const Populares = () => {
  const { productosList, getProductsByFilter, alerta } = useFirebase();
  const [filter, setFilter] = useState(true);

  const handleChangeFilter = () => {
    if (filter) getProductsByFilter("creado");
    else getProductsByFilter("votos");
  };
  useEffect(() => {
    getProductsByFilter("votos");
  }, []);
  return (
    <>
      <div>
        <Layout>
          <div className="fixed -mt10 w-full">
            {alerta.message && <Alerta alerta={alerta} />}
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center w-full">
              <div className="flex flex-col justify-center  mt-5 p-5 bg-white w-full md:w-10/12 xl:w-6/12">
                <ul className="flex justify-center mb-5 flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
                  <li className="me-2">
                    <button
                      type="submit"
                      onClick={(e) => {
                        setFilter(true);
                        handleChangeFilter();
                      }}
                      className={`${
                        filter
                          ? "bg-gray-100 text-blue-600"
                          : "bg-white text-black"
                      } inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg`}
                    >
                      Mas Votados
                    </button>
                  </li>
                  <li className="me-2">
                    <button
                      type="submit"
                      onClick={(e) => {
                        setFilter(false);
                        handleChangeFilter();
                      }}
                      className={`${
                        !filter ? "bg-gray-100 text-blue-600" : ""
                      } inline-block p-4 rounded-t-lg  `}
                    >
                      Recientes
                    </button>
                  </li>
                </ul>

                <ul>
                  {productosList.map((item) => (
                    <DetallesProducto key={item?.id} producto={item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Populares;
