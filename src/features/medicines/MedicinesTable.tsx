import { ColumnDef } from "@tanstack/react-table";
import { MedicineType } from "./index.types";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { numberWithCommas } from "@/lib/utils";
import useMedicines from "./useMedicines";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { SyncLoader } from "react-spinners";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActionModal from "./ActionModal";
import ActionForm from "./ActionForm";
import { useLocation } from "react-router-dom";

const MedicinesTable = () => {
  const { search } = useLocation();
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMedicines();
  const { ref, inView } = useInView();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [medicineData, setMedicineData] = useState<MedicineType>(
    {} as MedicineType
  );
  const [searchState, setSearchState] = useState(
    Object.fromEntries(new URLSearchParams(search)).search || ""
  );

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.medicines) ?? [],
    [data]
  );

  const columns: ColumnDef<MedicineType>[] = useMemo(
    () => [
      {
        accessorKey: "code",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
        header: "اقدامات",
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-center w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-7 p-0 m-0">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer bg-background flex items-center gap-x-2 text-sm"
                    onClick={() => {
                      setIsOpenModal(true);
                      setIsEditMode(true);
                      setMedicineData(row.original);
                    }}
                  >
                    <Pencil className="size-4" />
                    ویرایش
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer bg-background flex items-center gap-x-2 text-sm"
                    onClick={() => {
                      console.log(row.original);
                    }}
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) "Loading...";

  return (
    <>
      <DataTable
        columns={columns}
        data={flatData}
        searchState={searchState}
        setSearchState={setSearchState}
      />
      <div className="flex w-full justify-center items-center my-5 text-primary">
        {isFetchingNextPage ? (
          <SyncLoader color="hsl(var(--primary))" size={12} />
        ) : hasNextPage ? (
          <Button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            variant="outline"
            size="sm"
          >
            بارگذاری بیشتر
          </Button>
        ) : flatData.length ? (
          <h4 className="">هیچ محصول دیگری برای نمایش وجود ندارد!</h4>
        ) : undefined}
      </div>
      <ActionModal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <ActionForm
          medicineData={medicineData}
          isEditMode={isEditMode}
          onClose={() => setIsOpenModal(false)}
        />
      </ActionModal>
    </>
  );
};

export default MedicinesTable;
