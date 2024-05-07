import { getMedicinesApi } from "@/services/medicineService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MedicineType } from "./index.types";
import { useLocation } from "react-router-dom";

interface Page {
  medicines: MedicineType[];
  totalPage: number;
  currentPage: number;
}

const useMedicines = () => {
  const { search } = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(search));

  return useInfiniteQuery({
    queryKey: ["medicines", searchParams?.search || ""],
    queryFn: async ({ pageParam }) =>
      getMedicinesApi({
        page: pageParam,
        limit: 20,
        search: searchParams.search || "",
      }),
    getNextPageParam: (lastPage: Page, pages: Page[]) => {
      return pages.length < lastPage.totalPage ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export default useMedicines;
