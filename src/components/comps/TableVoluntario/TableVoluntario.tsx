import Loading from "@/components/loader/Loading";
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

const formatDate = (data: any) => {
  let objectDate = new Date(data);
  const day = objectDate.getUTCDate().toString().padStart(2, "0");
  const month = (objectDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Os meses são de 0 a 11, então adicionamos 1
  const year = objectDate.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export default function TableVoluntario({
  voluntarios,
  headers,
  loading,
}: any) {
  return (
    <Table className="font-white text-white">
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="w-[100px]">Idade</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead className="text-right">Horas disponíveis</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading === true ? (
          <>
            <Loading color={"white"}></Loading>
          </>
        ) : (
          <>
            {voluntarios.map((voluntario: any) => (
              <TableRow key={voluntario.id}>
                <TableCell>{voluntario.name}</TableCell>
                <TableCell className="font-medium">
                  {formatDate(voluntario.age)}
                </TableCell>
                <TableCell>{voluntario.city}</TableCell>
                <TableCell className="text-right">
                  {voluntario.freeHours}
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
      <TableFooter className="bg-slate-900">
        <TableRow>
          <TableCell colSpan={3}>Total de voluntários</TableCell>
          <TableCell className="text-right">{voluntarios.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
