import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { IAlbum } from "../types/album";

const AlbumsTable = ({ filteredAlbums }: { filteredAlbums: IAlbum[] }) => {
  const columns = useMemo<ColumnDef<IAlbum>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "userId",
        header: "User ID",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
    ],
    []
  );

  // Memoize the table instance
  const table = useReactTable({
    data: filteredAlbums,
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

export default AlbumsTable;
