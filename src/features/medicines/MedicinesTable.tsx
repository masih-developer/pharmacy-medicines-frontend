import { ColumnDef } from "@tanstack/react-table";
import { MedicineType } from "./index.types";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { numberWithCommas } from "@/lib/utils";

const medicines: MedicineType[] = [
  {
    _id: "6627942e238a17db144acf01",
    name: "اکسي تتراسايکلين 20%  رويان  500 گرم",
    expire: "2024-06-04T06:30:59.310Z",
    code: 10007051,
    quantity: -14,
    price: 2700000,
    type: "ساشه",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.248Z",
    updatedAt: "2024-04-23T10:57:50.248Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144aceff",
    name: "انروفارما   داروسازان    1ليتر",
    expire: "2024-05-11T22:46:34.724Z",
    code: 1002470,
    quantity: 60,
    price: 3850000,
    type: "بطري",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.247Z",
    updatedAt: "2024-04-23T10:57:50.247Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144acefd",
    name: "لاکسادام  باريج   500ميل",
    expire: "2024-05-13T03:41:19.626Z",
    code: 1002469,
    quantity: 29,
    price: 550000,
    type: "بطري",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.246Z",
    updatedAt: "2024-04-23T10:57:50.246Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144acefb",
    name: "موکسي نيل پلاس   رويان    1000ML",
    expire: "2024-06-21T04:02:00.009Z",
    code: 1002468,
    quantity: 14,
    price: 6350000,
    type: "قوطي",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.246Z",
    updatedAt: "2024-04-23T10:57:50.246Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144acef9",
    name: "آباتري نيل   رويان      200ML",
    expire: "2024-05-27T17:54:27.931Z",
    code: 1002467,
    quantity: 0,
    price: 1950000,
    type: "قوطي",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.245Z",
    updatedAt: "2024-04-23T10:57:50.245Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144acef7",
    name: "آيورمکتين 1% + تريکلابندازول 5%  رويان    1000ML",
    expire: "2024-06-22T08:35:16.110Z",
    code: 1002466,
    quantity: 14,
    price: 4700000,
    type: "قوطي",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.245Z",
    updatedAt: "2024-04-23T10:57:50.245Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144acef5",
    name: "هگزانيل  رويان     1000ML",
    expire: "2024-06-10T11:24:09.155Z",
    code: 1002465,
    quantity: 27,
    price: 6750000,
    type: "قوطي",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.244Z",
    updatedAt: "2024-04-23T10:57:50.244Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144acef3",
    name: "موننسين کوکسيسان   آفاق     5کيلويي",
    expire: "2024-05-08T11:48:25.588Z",
    code: 1002464,
    quantity: 165,
    price: 9300000,
    type: "ساشه",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.244Z",
    updatedAt: "2024-04-23T10:57:50.244Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144acef1",
    name: "گليسيرين يده   حنان   150گرم",
    expire: "2024-05-12T19:26:56.818Z",
    code: 1002463,
    quantity: 0,
    price: 1100000,
    type: "شيشه",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.243Z",
    updatedAt: "2024-04-23T10:57:50.243Z",
    __v: 0,
  },
  {
    _id: "6627942e238a17db144aceef",
    name: "کوليدم 50% ( کلستين سولفات  ) 1 کيلويي پارس",
    expire: "2024-05-02T20:14:59.559Z",
    code: 1002462,
    quantity: 1,
    price: 18900000,
    type: "ساشه",
    isHide: false,
    createdAt: "2024-04-23T10:57:50.243Z",
    updatedAt: "2024-04-23T10:57:50.243Z",
    __v: 0,
  },
];

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
      const price = numberWithCommas(row.getValue("price"));
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
  return <DataTable columns={columns} data={medicines} />;
};

export default MedicinesTable;
