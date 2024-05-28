import ConfigCard from "@/components/comps/Config/ConfigCard";
import Header from "@/components/comps/Header/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center  pl-24 pt-5 pr-24">
      <Header></Header>
      <Image
        className="mt-12"
        src={"/logo.svg"}
        alt="logo"
        width={150}
        height={150}
      ></Image>
      <div className="mt-12 flex w-full justify-around">
        <Link href={"config"}>
          <ConfigCard name="Configurações" image="config"></ConfigCard>
        </Link>
        <Link href={"voluntarios"}>
          <ConfigCard name="Voluntários" image="config"></ConfigCard>
        </Link>
        <Link href={"cachorros"}>
          <ConfigCard name="Cachorros para adoção" image="config"></ConfigCard>
        </Link>
      </div>
    </main>
  );
}
