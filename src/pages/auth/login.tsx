import ButtonSubmit from "@/components/button-submit";
import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/utils/apis/user/api";
import { LoginSchema, loginSchema } from "@/utils/apis/user/type";
import { useToken } from "@/utils/contexts/token";
import useStore from "@/utils/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { changeToken } = useToken();
  const navigate = useNavigate();
  const { showPassword, toggleShowPassword } = useStore();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const result = await loginUser(data);

      changeToken(result.data.token);

      toast(result.message);
      navigate("/");
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="flex flex-col">
        <img
          src="/logo-parkify.png"
          alt="parkify"
          width={320}
          height={320}
          className="flex flex-col mx-auto"
        />
        <h1 className="flex justify-center text-3xl font-semibold">
          Sign in now
        </h1>
        <Form {...form}>
          <form
            className="flex flex-col space-y-4 px-4 py-4 my-4"
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CustomFormField control={form.control} name="email" label="Email">
              {(field) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
            >
              {(field) => (
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Set an 8 character password"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <div className="flex space-x-2">
              <Checkbox id="terms" onClick={toggleShowPassword} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show password
              </label>
            </div>
            <div className="flex flex-col py-4">
              <ButtonSubmit button_value="Login" button_icon="" type="submit" />
            </div>
          </form>
        </Form>
        <p className="flex justify-center gap-1">
          Don't have an account?
          <span className="underline text-blue-700">
            <Link to={"/register"}>Sign Up</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
