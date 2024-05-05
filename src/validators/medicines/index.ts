import { z } from "zod";

export const medicineValidationSchema = z.object({
  name: z.string().min(1, "نام محصول می بایست حداقل 1 کاراکتر باشد."),
  expire: z
    .date({ message: "تاریخ وارد شده نا معبتر می باشد." })
    .min(new Date(), "حداقل تاریخ انقضا فردا است.")
    .transform((val) => new Date(val).toISOString()),
  code: z.number(),
  quantity: z.number({ message: "موجودی محصول می بایست عددی معتبر باشد." }),
  price: z.number().min(0, "قیمت وارد شده معتبر نمی باشد."),
  type: z.string().min(1, "نوع محصول می بایست حداقل 1 کاراکتر باشد."),
});
