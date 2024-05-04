import { ColumnDef } from "@tanstack/react-table";
import { MedicineType } from "./index.types";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { numberWithCommas } from "@/lib/utils";
import useMedicines from "./useMedicines";
import { useMemo } from "react";

const columns: ColumnDef<MedicineType>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          کد کالا
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          نام کالا
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expire",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          تاریخ انقضا
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "datetime",
    cell: ({ row }) => {
      const newDate = new Date(row.getValue("expire")).toLocaleDateString(
        "fa-IR"
      );
      return newDate;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          کل موجودی
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "قیمت",
    cell: ({ row }) => {
      const price = numberWithCommas(row.getValue("price") || 0);
      return `${price} تومان`;
    },
  },
  {
    accessorKey: "type",
    header: "نوع کالا",
  },
  {
    accessorKey: "edit",
    header: "ویرایش",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-x-3">
          <Button
            variant="outline"
            size="sm"
            className="size-9 p-0"
            onClick={() => {
              console.log(row.original);
            }}
          >
            <Pencil className="size-4" />
          </Button>
          <Button variant="destructive" size="sm" className="size-9 p-0">
            <Trash2 className="size-4" />
          </Button>
        </div>
      );
    },
  },
];

const MedicinesTable = () => {
  const { isLoading, data, fetchNextPage, hasNextPage } = useMedicines();
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.medicines) ?? [],
    [data]
  );

  if (isLoading) "Loading...";

  return (
    <div className="">
      <DataTable columns={columns} data={flatData} />
      <Button
        variant="outline"
        className="mx-auto text-center w-fit flex justify-center mt-5"
        disabled={!hasNextPage}
        onClick={() => fetchNextPage()}
      >
        load more
      </Button>
    </div>
  );
};

export default MedicinesTable;
