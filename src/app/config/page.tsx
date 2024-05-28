"use client";
import { ConfigForm } from "@/components/comps/ConfigForm";
import Image from "next/image";
import Header from "@/components/comps/Header/Header";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const notify = () => toast.success("Configurações alteradas com sucesso!");
  const notifyError = () =>
    toast.error("Credenciais incorretas! Tente novamente");

  const onSubmit = (
    firstValue: any,
    secondValue: any,
    thirdValue: any,
    fourthValue: any,
    fifthValue: any
  ) => {
    console.log(`Tel`, firstValue);
    console.log(`Rede`, secondValue);
    console.log(`Email`, thirdValue);
    console.log(`Pix`, fourthValue);
    console.log(`Conta`, fifthValue);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      phone: firstValue,
      social: secondValue,
      email: thirdValue,
      pix: fourthValue,
      bankAccount: fifthValue,
    });

    const requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/config`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("RES", result);
        if (result?.status === "ok") {
          notify();
        } else {
          notifyError();
        }
      })
      .catch((error) => {
        console.error(error);
        notifyError();
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
      <h1 className="text-white text-2xl mb-4">Configurações</h1>
      <ConfigForm
        title="Editar informações"
        description={"Faça as edições da turma do bairro abaixo."}
        inputs={["Telefone", "Rede social", "Email", "Pix", "Conta Bancaria"]}
        confirm="Salvar"
        cancel={null}
        redirecionarCancel="/"
        onSubmit={(
          firstValue: any,
          secondValue: any,
          thirdValue: any,
          fourthValue: any,
          fifthValue: any,
          setLoading: any
        ) => {
          onSubmit(
            firstValue,
            secondValue,
            thirdValue,
            fourthValue,
            fifthValue
          );
        }}
      ></ConfigForm>
      <ToastContainer />
    </main>
  );
}
