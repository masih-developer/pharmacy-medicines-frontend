import mainRequest from ".";
import { loginSchema } from "@/validators/auth";
import { z } from "zod";

const loginUserApi = async (values: z.infer<typeof loginSchema>) => {
  const { data } = await mainRequest.post("/user/login", values);
  return data;
};

export { loginUserApi };
