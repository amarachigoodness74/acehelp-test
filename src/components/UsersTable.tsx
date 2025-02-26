import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import FlagCell from "./FlagCell";
import { IUser } from "../types/user";

const UsersTable = ({ filteredUsers }: { filteredUsers: IUser[] }) => {
  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "address.street",
        header: "Address",
        cell: ({ row }) => {
          const address = row.original.address;
          const formattedAddress = `${address.street}, ${address.suite}, ${address.city}`;
          return <span>{formattedAddress}</span>;
        },
      },
      {
        accessorKey: "address.geo",
        header: "Country Flag",
        cell: ({ row }) => {
          const { lat, lng } = row.original.address.geo;
          return <FlagCell lat={lat} lng={lng} />; // Users flag is supposed to be displayed here based on lng and lat data but since it's demo data, an error is returned
        },
      },
      {
        accessorKey: "address.zipcode",
        header: "Zipcode",
      },
      {
        accessorKey: "website",
        header: "Website",
      },
      {
        accessorKey: "company.name",
        header: "Company",
      },
      {
        accessorKey: "company.catchPhrase",
        header: "Catchphrase",
      },
    ],
    []
  );

  // Memoize the table instance
  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, value) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(value.toLowerCase());
    },
  });

  return (
    <div className="overflow-x-auto overflow-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-800 mb-10">
      <table className="w-full">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 cursor-pointer text-left min-w-[120px]"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" ? " ⬆️" : ""}
                  {header.column.getIsSorted() === "desc" ? " ⬇️" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 min-w-[200px]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
