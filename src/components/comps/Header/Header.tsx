import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="w-full">
      <nav className="flex w-100 gap-2 justify-between w-100 items-center text-white">
        <Link href="/">
          <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
        </Link>
        <div className="flex gap-8">
          <Link href={"/config"}>
            <p>Configuracoes</p>
          </Link>
          <Link href={"/voluntarios"}>
            <p>Voluntários</p>
          </Link>
          <Link href={"/cachorros"}>
            <p>Pets</p>
          </Link>
          <Link href={""}>
            <p>Relatório de dados</p>
          </Link>
        </div>
      </nav>
    </header>
  );
}
