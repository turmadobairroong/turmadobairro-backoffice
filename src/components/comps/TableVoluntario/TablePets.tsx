"use client";
import Loading from "@/components/loader/Loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";

const formatDate = (data: any) => {
  let objectDate = new Date(data);
  const day = objectDate.getUTCDate().toString().padStart(2, "0");
  const month = (objectDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Os meses são de 0 a 11, então adicionamos 1
  const year = objectDate.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export default function TablePets({
  voluntarios,
  headers,
  deleteFunc,
  loading,
}: any) {
  const [adoptModal, setAdoptModal] = useState<any>(false);

  console.log("VV", voluntarios);
  return (
    <>
      {adoptModal !== false && (
        <>
          {console.log(adoptModal)}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Pessoas para adotar
                  </h3>
                  <button
                    className="p-1"
                    // onClick={() => setShowModal(false)}
                    onClick={() => {
                      setAdoptModal(false);
                    }}
                  >
                    <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none text-red-400">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Table className="font-white text-white">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Nome</TableHead>
                        <TableHead>Idade</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Hora</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading === true ? (
                        <>
                          <Loading color={"white"}></Loading>
                        </>
                      ) : (
                        <>
                          {adoptModal?.length > 0 &&
                            adoptModal?.map((voluntario: any) => (
                              <TableRow
                                className="text-black"
                                key={voluntario.id}
                              >
                                <TableCell>{voluntario.name}</TableCell>
                                <TableCell className="font-medium">
                                  {voluntario.age}
                                </TableCell>
                                <TableCell>{voluntario.city}</TableCell>
                                <TableCell>{voluntario.hour}</TableCell>
                              </TableRow>
                            ))}
                        </>
                      )}
                    </TableBody>
                    <TableFooter className="bg-slate-900 w-full">
                      <TableRow>
                        <TableCell colSpan={7}>Pessoas para adotar</TableCell>
                        <TableCell className="text-right">
                          {adoptModal?.length}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-40 bg-black"
            onClick={() => {
              console.log("CLICOU FORA");
            }}
          ></div>
        </>
      )}
      <Table className="font-white text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Porte</TableHead>
            <TableHead>Características</TableHead>
            <TableHead>Data de entrada</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Deletar</TableHead>
            <TableHead>Adoção</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading === true ? (
            <>
              <Loading color={"white"}></Loading>
            </>
          ) : (
            <>
              {voluntarios?.length > 0 &&
                voluntarios?.map((voluntario: any) => (
                  <TableRow key={voluntario.id}>
                    <TableCell>{voluntario.name}</TableCell>
                    <TableCell className="font-medium">
                      {voluntario.age}
                    </TableCell>
                    <TableCell>{voluntario.porte}</TableCell>
                    <TableCell>{voluntario.characteristics}</TableCell>
                    <TableCell>{formatDate(voluntario.entryDate)}</TableCell>
                    <TableCell>
                      <Link href={`/cachorros/editar?id=${voluntario.id}`}>
                        <Button>Editar</Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          deleteFunc(voluntario.id);
                        }}
                      >
                        Deletar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setAdoptModal(voluntario.wantToAdopt);
                        }}
                      >
                        Pessoas para adotar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </>
          )}
        </TableBody>
        <TableFooter className="bg-slate-900 w-full">
          <TableRow>
            <TableCell colSpan={7}>Total de Pets</TableCell>
            <TableCell className="text-right">{voluntarios.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
