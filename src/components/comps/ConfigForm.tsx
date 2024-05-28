"use client";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Loading from "../loader/Loading";

export function ConfigForm({
  title,
  description,
  inputs = [],
  confirm = "login",
  cancel = "none",
  redirecionarCancel,
  onSubmit = () => {},
  uploadImage = null,
}: any) {
  const [firstValue, setFirstValue] = React.useState("");
  const [secondValue, setSecondValue] = React.useState("");
  const [thirdValue, setThirdValue] = React.useState("");
  const [fourthValue, setFourthValue] = React.useState("");
  const [fifthValue, setFifthValue] = React.useState("");
  const [fileImages, setFileImages] = React.useState<any>("");
  const [loading, setLoading] = React.useState<any>(false);

  React.useEffect(() => {
    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/config`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("res", result[0]);
        setFirstValue(result[0].phone);
        setSecondValue(result[0].social);
        setThirdValue(result[0].email);
        setFourthValue(result[0].pix);
        setFifthValue(result[0].bankAccount);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const translate: any = {
    Telefone: firstValue,
    ["Rede social"]: secondValue,
    Email: thirdValue,
    Pix: fourthValue,
    ["Conta Bancaria"]: fifthValue,
  };

  const translateFuncs: any = {
    Telefone: setFirstValue,
    ["Rede social"]: setSecondValue,
    Email: setThirdValue,
    Pix: setFourthValue,
    ["Conta Bancaria"]: setFifthValue,
  };

  const photosSelected = (e: any) => {
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      let file = files[i];
      reader.onload = (file) => {
        setFileImages(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-[350px]">
      {loading === true ? (
        <div className="flex w-100 justify-center">
          <Loading></Loading>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            onSubmit(
              firstValue,
              secondValue,
              thirdValue,
              fourthValue,
              fifthValue,
              fileImages
            );
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }}
        >
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {inputs.length > 0 &&
                inputs.map((item: any) => {
                  return (
                    <div className="flex flex-col space-y-1.5" key={item}>
                      <Label htmlFor={item}>{item}</Label>
                      <Input
                        id={item}
                        placeholder={item}
                        value={translate[`${item}`]}
                        onChange={(e) => {
                          translateFuncs[item](e?.target?.value);
                        }}
                      />
                    </div>
                  );
                })}
            </div>
            {uploadImage === true && (
              <>
                <Image
                  src={"/icons/uploadblack.svg"}
                  width={16}
                  height={16}
                  alt="back icon"
                ></Image>
                <label htmlFor="fileInput">Enviar Fotos</label>
                <div className="input__file">
                  <input
                    type="file"
                    id="fileInput"
                    onChange={async (e) => {
                      photosSelected(e);
                    }}
                    required
                  ></input>
                </div>
                <Image
                  src={fileImages}
                  width={180}
                  height={180}
                  alt="imageSelected"
                  quality={100}
                ></Image>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-end justify-end">
            {cancel && (
              <>
                <Link href={`/${redirecionarCancel}`}>
                  <Button variant="outline">{cancel}</Button>
                </Link>
              </>
            )}

            <Button>{confirm}</Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
