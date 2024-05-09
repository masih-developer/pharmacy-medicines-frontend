import { z } from "zod";

const registerSchema = z.object({
  firstname: z
    .string()
    .min(3, "اسم کوچک می بایست حداقل 5 کاراکتر باشد.")
    .max(20, "اسم کوچک می بایست حداکثر 20 کاراکتر باشد."),
  lastname: z
    .string()
    .min(5, "فامیلی می بایست حداقل 5 کاراکتر باشد.")
    .max(20, "فامیلی می بایست حداکثر 20 کاراکتر باشد."),
  username: z
    .string()
    .min(4, "نام کاربری می بایست حداقل 5 کاراکتر باشد.")
    .max(20, "نام کاربری می بایست حداکثر 20 کاراکتر باشد.")
    .regex(
      /^[a-zA-Z]\w+$/,
      "نام کاربری می بایست با حروف انگلیسی شروع شود و مجاز به استفاده اعداد و آندرلاین می باشید."
    ),
  email: z.string().email("ایمیل وارد شده معتبر نمی باشد."),
  password: z
    .string()
    .min(6, "رمز عبور می بایست حداقل 6 کاراکتر باشد.")
    .max(30, "رمز عبور می بایست حداکثر 20 کاراکتر باشد."),
});

const loginSchema = z.object({
  email: registerSchema.shape.email,
  password: registerSchema.shape.password,
});

export { registerSchema, loginSchema };
