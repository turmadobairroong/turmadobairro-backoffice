"use client";
import { CardWithForm } from "@/components/comps/Card";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const notify = () => toast.success("Usuario logado com sucesso!");
  const notifyError = () =>
    toast.error("Credenciais incorretas! Tente novamente");

  const onSubmit = (firstValue: any, secondValue: any) => {
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

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/users/auth`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(`res`, result);
        if (result?.status === "ok") {
          notify();
          setTimeout(() => {
            router.push("/home");
          }, 1500);
        } else {
          notifyError();
        }
      })
      .catch((error) => {
        notifyError();
        console.error(error);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <Image src={"/logo.svg"} alt="logo" width={150} height={150}></Image>
      <CardWithForm
        title="Login"
        description={"Faca o login"}
        inputs={["Email", "Senha"]}
        confirm="Login"
        cancel="Cadastro"
        redirecionarCancel="cadastro"
        onSubmit={(firstValue: any, secondValue: any) => {
          onSubmit(firstValue, secondValue);
        }}
      ></CardWithForm>
      <ToastContainer />
    </main>
  );
}
