"use client";
import * as React from "react";

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

export function CardWithForm({
  title,
  description,
  inputs = [],
  confirm = "login",
  cancel = "none",
  redirecionarCancel,
  onSubmit = () => {},
}: any) {
  const [firstValue, setFirstValue] = React.useState("");
  const [secondValue, setSecondValue] = React.useState("");

  const translate: any = {
    Email: firstValue,
    Senha: secondValue,
  };

  const translateFuncs: any = {
    Email: setFirstValue,
    Senha: setSecondValue,
  };

  return (
    <Card className="w-[350px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(firstValue, secondValue);
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/${redirecionarCancel}`}>
            <Button variant="outline">{cancel}</Button>
          </Link>
          <Button>{confirm}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
