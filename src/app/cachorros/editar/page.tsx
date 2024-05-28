"use client";
import { ConfigForm } from "@/components/comps/ConfigForm";
import Image from "next/image";
import Header from "@/components/comps/Header/Header";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PetsForm } from "@/components/comps/PetsForm";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const notify = () => toast.success("Pet editado com sucesso!");
  const notifyError = () =>
    toast.error("Credenciais incorretas! Tente novamente");
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [id, setId] = useState("1");

  const onSubmit = (
    firstValue: any,
    secondValue: any,
    thirdValue: any,
    fourthValue: any,
    fifthValue: any,
    fileImage: any
  ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: id,
      name: firstValue,
      age: secondValue,
      porte: thirdValue,
      entryDate: fourthValue,
      characteristics: fifthValue,
      photo: fileImage,
    });

    const requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/pets`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.status === "ok") {
          notify();
          setTimeout(() => {
            router.push("/cachorros");
          }, 1500);
        }
      })
      .catch((error) => console.error(error));
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };
    const idToGet = searchParams.get("id") ?? "1";
    setId(idToGet);

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/pets?id=${idToGet}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("r", result);
        setPet(result);
        // setVoluntarios(result);
      })
      .catch((error) => console.error(error));
  }, [searchParams]);

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
      <h1 className="text-white text-2xl mb-4">Editar Pet</h1>
      <PetsForm
        title="Editar Pet"
        description={"Coloque as informações do pet a ser modificado"}
        inputs={[
          "Nome",
          "Idade",
          "Porte",
          "Data de entrada",
          "Caracteristicas",
        ]}
        confirm="Editar"
        cancel={null}
        redirecionarCancel="/"
        onSubmit={(
          firstValue: any,
          secondValue: any,
          thirdValue: any,
          fourthValue: any,
          fifthValue: any,
          fileImage: any
        ) => {
          onSubmit(
            firstValue,
            secondValue,
            thirdValue,
            fourthValue,
            fifthValue,
            fileImage
          );
        }}
        uploadImage={true}
        previousValues={pet}
      ></PetsForm>
      <ToastContainer />
    </main>
  );
}
