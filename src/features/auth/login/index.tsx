import { loginSchema } from "@/validators/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "@/services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "@/components/ui/loaders/SpinnerLoader";

const LoginContainer = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync } = useMutation({ mutationFn: loginUserApi });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const { user, message } = await mutateAsync(values);
      toast.success(message || "ورود موفقیت آمیز بود.");
      navigate("/", "");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-56.8px)] flex items-center justify-center">
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-[350px] ring ring-border p-5 rounded-lg"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="user@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <SpinnerLoader className="size-5 border-2" />
            ) : (
              "ورود"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginContainer;
