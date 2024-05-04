import { getMedicinesApi } from "@/services/medicineService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MedicineType } from "./index.types";

interface Page {
  medicines: MedicineType[];
  totalPage: number;
  currentPage: number;
}

const useMedicines = () => {
  return useInfiniteQuery({
    queryKey: ["medicines"],
    queryFn: async ({ pageParam }) =>
      getMedicinesApi({ page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage: Page, pages: Page[]) => {
      return pages.length < lastPage.totalPage ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export default useMedicines;
