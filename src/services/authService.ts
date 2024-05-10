import mainRequest from ".";
import { loginSchema } from "@/validators/auth";
import { z } from "zod";

export const loginUserApi = async (values: z.infer<typeof loginSchema>) => {
  const { data } = await mainRequest.post("/user/login", values);
  return data;
};

export const getUserProfileApi = async () => {
  const { data } = await mainRequest.get("/user/profile");
  return data;
};
