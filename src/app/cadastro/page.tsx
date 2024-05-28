"use client";
import { CardWithForm } from "@/components/comps/Card";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const router = useRouter();
  const notify = () => toast.success("Usuario cadastrado");

  const onSubmit = (firstValue: any, secondValue: any) => {
    console.log(`ff`, firstValue);
    console.log(`sv`, secondValue);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: firstValue,
      pass: secondValue,
    });

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/users`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(`RES`, result);
        if (result?.status === "ok") {
          notify();
          setTimeout(() => {
            router.push("/");
          }, 1500);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <Image src={"/logo.svg"} alt="logo" width={150} height={150}></Image>
      <CardWithForm
        title="Cadastro"
        description={"Faca o cadastro"}
        inputs={["Email", "Senha"]}
        confirm="Cadastro"
        cancel="Login"
        redirecionarCancel="/"
        onSubmit={(firstValue: any, secondValue: any) => {
          onSubmit(firstValue, secondValue);
        }}
      ></CardWithForm>
      <ToastContainer />
    </main>
  );
}
