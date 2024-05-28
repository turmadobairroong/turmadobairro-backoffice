import React from "react";
import { FaGear } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

export default function ConfigCard({ name }: any) {
  return (
    <div className="card rounded h-full w-[150px] p-4 gap-1 flex flex-col items-center justify-center">
      {name === "Configurações" && (
        <FaGear className="w-[32px] h-[32px]"></FaGear>
      )}
      {name === "Voluntários" && (
        <FaUsers className="w-[32px] h-[32px]"></FaUsers>
      )}
      {name === "Cachorros para adoção" && (
        <MdOutlinePets className="w-[32px] h-[32px]"></MdOutlinePets>
      )}
      <h1>{name}</h1>
    </div>
  );
}
