import { getCapitalLetters } from "@/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";

const Comentario = ({ userId, comentario }) => {
  console.log(comentario);
  if (comentario)
    return (
      <div className="flex flex-row items-center md:w-10/12 gap-2 ">
        <div
          className={`${
            userId === comentario.usuarioId ? "bg-orange-600" : "bg-gray-400"
          } flex justify-start border-2 py-2 px-3 rounded-full text-white font-bold `}
        >
          {userId === comentario.usuarioId
            ? "Yo"
            : getCapitalLetters(comentario?.usuarioNombre || "")}
        </div>
        <div>
          <p className="text-md text-gray-800">{comentario?.comentario}</p>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(Number(comentario?.creado)), {
              locale: es,
            })}
          </p>
        </div>
      </div>
    );
};

export default Comentario;
