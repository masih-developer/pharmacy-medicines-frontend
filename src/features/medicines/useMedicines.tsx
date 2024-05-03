import { getMedicinesApi } from "@/services/medicineService";
import { useQuery } from "@tanstack/react-query";
import { MedicinesApiParamsType } from "./index.types";

const useMedicines = (params: MedicinesApiParamsType) => {
  const { data, isLoading } = useQuery({
    queryKey: ["Medicines", params.page],
    queryFn: () => getMedicinesApi(params),
  });
  return { data, isLoading };
};

export default useMedicines;
