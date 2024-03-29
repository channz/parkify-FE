import ButtonSubmit from "@/components/button-submit";
import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const Register = () => {
  const form = useForm();

  return (
    <Layout>
      <div className="flex flex-col">
        <img
          src="/public/logo-parkify.png"
          alt="parkify"
          width={320}
          height={320}
          className="flex flex-col mx-auto"
        />
        <h1 className="flex justify-center text-3xl font-semibold">
          Create an account
        </h1>
        <Form {...form}>
          <form className="flex flex-col space-y-4 px-4 py-4 my-4">
            <CustomFormField control={form.control} name="" label="Full Name">
              {(field) => (
                <Input
                  placeholder="Enter your full name"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="" label="Email">
              {(field) => (
                <Input
                  placeholder="Enter your email"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="" label="Password">
              {(field) => (
                <Input
                  placeholder="Set a 4 character password"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <div className="flex space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show password
              </label>
            </div>
            <div className="flex flex-col py-4">
              <ButtonSubmit button_value="Sign Up" />
            </div>
          </form>
        </Form>
        <p className="flex justify-center gap-1">
          Already have an account?
          <span className="underline text-blue-700">Log In</span>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
