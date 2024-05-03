import { MedicinesApiParamsType } from "@/features/medicines/index.types";
import mainRequest from ".";

export const getMedicinesApi = async (params: MedicinesApiParamsType) => {
  const { data } = await mainRequest.get("/medicines", { params });
  return data;
};
