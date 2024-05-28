"use client";
import Header from "@/components/comps/Header/Header";
import TableVoluntario from "@/components/comps/TableVoluntario/TableVoluntario";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/volunteer`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("r", result);
        setVoluntarios(result);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  pl-24 pt-5 pr-24">
      <Header></Header>
      <Image
        className="mb-12 mt-12"
        src={"/logo.svg"}
        alt="logo"
        width={150}
        height={150}
      ></Image>
      <h1 className="text-white text-2xl">Voluntários</h1>
      <div className="w-full mt-12 mb-12">
        <h1 className="text-white text-2xl">Voluntários</h1>
        <h3 className="text-slate-400">Veja os voluntários aqui abaixo:</h3>
      </div>
      <TableVoluntario
        voluntarios={voluntarios}
        headers={["age", "city", "freeHours", "name"]}
        loading={loading}
      ></TableVoluntario>
    </main>
  );
}
