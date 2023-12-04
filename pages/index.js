import Alerta from "@/components/Alerta";
import DetallesProducto from "@/components/DetallesProducto";
import Layout from "@/components/layout/Layout";
import useFirebase from "@/firebase/useFirebase";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

export default function Home() {
  const [modal, setModal] = useState(false);
  const { productosList, obtenerProductos, alerta } = useFirebase();

  useEffect(() => {
    obtenerProductos();
    console.log(productosList);
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
                <h1 className="flex-1 w-full text-2xl mb-10 font-bold text-blue-900">
                  Listado de Productos
                </h1>
                <ul>
                  {Object.keys(productosList).length === 0 ? (
                    <h1>No hay productos</h1>
                  ) : (
                    productosList.map((item) => (
                      <DetallesProducto key={item?.id} producto={item} />
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/** <ReactModal
            isOpen={modal}
            style={{
              overlay: {
                position: "absolute",
                top: "13%",
                left: "19%",
                right: 0,
                bottom: 0,
                width: "60%",
                height: "80%",
              },
            }}
            role={"dialog"}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onRequestClose={(e) => setModal(false)}
          >
            <div className="flex flex-col bg-rose-50">
              <div className="flex flex-row justify-between">
                <div>title</div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-end">
                    <button onClick={(e) => setModal(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 text-gray-500 font-bold"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>buttons</div>
                </div>
              </div>
              <div className="flex">contenido</div>
            </div>
          </ReactModal>*/}
        </Layout>
      </div>
    </>
  );
}
