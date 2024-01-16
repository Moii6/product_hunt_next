import React from "react";
import ProgressBar from "./ProgressBar";
import useFirebase from "@/firebase/useFirebase";

const CustomFormulario = ({ props, fnSubmit }) => {
  const { title, fields, btnlabel } = props;
  const { percentLoad, loadImage, setLoadImage, setPercentLoad } =
    useFirebase();
  //const { name, type, placeholder, value, onchange, fn } = fields;
  const handleSubmit = (e) => {
    e.preventDefault();
    fnSubmit();
  };

  const loadingImageAnimation = (e, field, fn) => {
    setLoadImage(true);
    field.fn(e.target.files[0]);
    //while (percentLoad < 100) {
    setTimeout(() => {
      setPercentLoad(percentLoad + 5);
    }, 200);
    //}
  };
  return (
    <form onSubmit={handleSubmit} className="mt-10 py-10 px-10 shadow rounded">
      <h1 className="text-center text-2xl mb-5 text-gray-900 font-bold">
        {title}
      </h1>
      {fields?.some((field) => field.nombre === "Descripcion") && (
        <fieldset>
          <legend className="text-blue-600 font-bold mb-3">
            Informacion General
          </legend>
        </fieldset>
      )}

      {fields?.map((field) => (
        <div className="mb-7 flex flex-col justify-center">
          {field.nombre === "Descripcion" && (
            <>
              <fieldset>
                <legend className="text-blue-600 font-bold mb-5">
                  Sobre tu producto
                </legend>
              </fieldset>
            </>
          )}
          <label htmlFor={field.nombre} className="text-xs pb-2 text-gray-600">
            {field.nombre}
          </label>
          {field.tipo === "textarea" ? (
            <textarea
              rows={4}
              id={field.nombre}
              name={field.nombre}
              className={`${
                field.nombre != "Imagen" && "border-2 px-2 py-1 rounded-lg"
              }`}
              placeholder={field.placemessage}
              onChange={(e) => field.oncambio(e.target.value)}
              required={true}
              value={field.valor}
            />
          ) : field.tipo === "file" ? (
            <>
              <input
                type={field.tipo}
                accept=".jpg, .png"
                id={field.nombre}
                name={field.nombre}
                className={`${
                  field.valor &&
                  "file:text-green-700 file:bg-green-50 hover:file:bg-green-100"
                } file:mr-4 file:px-4 file:py-2 file:text-sm file:border-0 file:rounded-md file:font-semibold file:text-orange-700 file:bg-orange-50 hover:file:bg-orange-100 hover:file:cursor-pointer`}
                placeholder={field.placemessage}
                onChange={(e) => {
                  field.oncambio(e.target.files[0]);
                  setLoadImage(true);
                }}
              />
              <ProgressBar running={loadImage} />
            </>
          ) : (
            <input
              type={field.tipo}
              id={field.nombre}
              name={field.nombre}
              className="border-2 px-2 py-1 rounded-lg"
              placeholder={field.placemessage}
              onChange={(e) => field.oncambio(e.target.value)}
              required={true}
              value={field.valor}
            />
          )}
        </div>
      ))}

      <input
        value={btnlabel}
        type="submit"
        className="hover:bg-orange-600 cursor-pointer mt-10 bg-orange-500 w-full py-2 rounded-md text-center text-white text-lg font-bold"
      />
    </form>
  );
};

export default CustomFormulario;
