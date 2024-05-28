"use client";
import Header from "@/components/comps/Header/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TableVoluntario from "@/components/comps/TableVoluntario/TableVoluntario";
import TablePets from "@/components/comps/TableVoluntario/TablePets";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPets = () => {
    setLoading(true);
    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/pets`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("r", result);
        setVoluntarios(result);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPets();
  }, []);

  const deleteFunc = (id: any) => {
    setLoading(true);

    const requestOptions: any = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/pets?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("r", result);
        getPets();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

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
      <h1 className="text-white text-2xl">Pets</h1>
      <div className="w-full mt-12 mb-12">
        <h1 className="text-white text-2xl">Pets</h1>
        <h3 className="text-slate-400">Veja os pets abaixo:</h3>
      </div>
      <TablePets
        voluntarios={voluntarios}
        headers={["age", "city", "freeHours", "name", "wantToAdopt"]}
        deleteFunc={deleteFunc}
        loading={loading}
      ></TablePets>
      <div className="w-full mt-4 flex justify-end">
        <Link href={"/cachorros/criar"}>
          <Button>Adicionar pet</Button>
        </Link>
      </div>
    </main>
  );
}
