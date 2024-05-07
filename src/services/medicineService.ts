import { MedicinesApiParamsType } from "@/features/medicines/index.types";
import mainRequest from ".";
import { z } from "zod";
import { medicineValidationSchema } from "@/validators/medicines";

export const getMedicinesApi = async (params: MedicinesApiParamsType) => {
  const { data } = await mainRequest.get("/medicines", { params });
  return data;
};

type updateMedicineApiType = {
  id: string;
  medicine: z.infer<typeof medicineValidationSchema>;
};

export const updateMedicineApi = async ({
  id,
  medicine,
}: updateMedicineApiType) => {
  const { data } = await mainRequest.put(`/medicines/${id}`, {
    ...medicine,
  });
  return data;
};
