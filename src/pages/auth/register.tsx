import ButtonSubmit from "@/components/button-submit";
import {
  CustomFormField,
  CustomFormRadio,
} from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema, registerSchema } from "@/utils/apis/user/type";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/utils/apis/user/api";
import { toast } from "sonner";
import useStore from "@/utils/stores/store";

const Register = () => {
  const navigate = useNavigate();
  const { showPassword, toggleShowPassword } = useStore();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const result = await registerUser(data);

      toast(result.message);
      navigate(`/login`);
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
          width={180}
          height={180}
          className="flex flex-col mx-auto"
        />
        <h1 className="flex justify-center text-2xl font-semibold">
          Create an account
        </h1>
        <Form {...form}>
          <form
            className="flex flex-col space-y-2 px-8 py-2 my-2"
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CustomFormRadio
              control={form.control}
              name="role"
              label=""
              options={[
                { label: "User", value: "user" },
                { label: "Operator", value: "operator" },
              ]}
            />
            <CustomFormField
              control={form.control}
              name="fullname"
              label="Full Name"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Enter your full name"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
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
              <ButtonSubmit
                button_value="Sign Up"
                button_icon=""
                type="submit"
              />
            </div>
          </form>
        </Form>
        <p className="flex justify-center gap-1">
          Already have an account?
          <span className="underline text-blue-700">
            <Link to="/login">Log In</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
