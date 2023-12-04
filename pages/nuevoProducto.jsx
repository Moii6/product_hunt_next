import Layout from "@/components/layout/Layout";
import CustomFormulario from "@/components/ui/CustomFormulario";
import {
  generarID,
  validarString,
  validarTextAreaValue,
  validarUrl,
} from "@/utils";
import React, { useEffect, useState } from "react";
import useFirebase from "@/firebase/useFirebase";
import { Router, useRouter } from "next/router";

const nuevoProducto = () => {
  const { usuario, crearProducto, setAlerta } = useFirebase();
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [imagen, setImagen] = useState("");
  const [url, setUrl] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const router = useRouter();
  let id;
  const prop = {
    title: "Nuevo Producto",
    fields: [
      {
        nombre: "Nombre",
        tipo: "text",
        placemessage: "Nombre del producto",
        valor: nombre,
        oncambio: setNombre,
      },
      {
        nombre: "Empresa",
        tipo: "text",
        placemessage: "Nombre de la empresa o compañia",
        valor: empresa,
        oncambio: setEmpresa,
      },
      {
        nombre: "Imagen",
        tipo: "file",
        placemessage: "Imagen del producto",
        valor: imagen,
        oncambio: setImagen,
      },
      {
        nombre: "URL",
        tipo: "url",
        placemessage: "url del producto",
        valor: url,
        oncambio: setUrl,
      },
      {
        nombre: "Descripcion",
        tipo: "textarea",
        placemessage: "Descripcion del producto",
        valor: descripcion,
        oncambio: setdescripcion,
      },
    ],
    btnlabel: "Crear Producto",
  };

  const handleCrear = async () => {
    //la validacion de los campos la hace el html, cada uno de ellos es required
    if (!usuario?.displayName) return router.push("/login");
    id = generarID();
    const producto = {
      id,
      nombre,
      empresa,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      imageDetails: id + "-" + imagen.name,
      votados: [],
      creador: usuario.uid,
    };
    await crearProducto(producto, imagen);
    router.push("/");
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  return (
    <>
      <div>
        <Layout>
          <div className=" flex flex-row justify-center">
            <div className="w-6/12">
              <CustomFormulario props={prop} fnSubmit={handleCrear} />
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default nuevoProducto;
