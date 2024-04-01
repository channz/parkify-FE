import ButtonSubmit from "@/components/button-submit";
import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogOut, Settings, SquarePen, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const form = useForm();

  return (
    <Layout>
      <div className="relative h-full w-full">
        <Form {...form}>
          <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400">
            <div className="flex flex-col px-4 py-32 space-y-5">
              <p className="text-white font-semibold text-3xl">Edit Profile</p>
              <Card className="flex flex-col rounded-3xl drop-shadow-md">
                <CardContent className="p-4 space-y-5">
                  <form className="flex flex-col space-y-4 px-4 py-4 my-4">
                    <CustomFormField
                      control={form.control}
                      name=""
                      label="Full Name"
                    >
                      {(field) => (
                        <Input
                          placeholder="Enter your full name"
                          value={field.value as string}
                        />
                      )}
                    </CustomFormField>
                    <CustomFormField
                      control={form.control}
                      name=""
                      label="Email"
                    >
                      {(field) => (
                        <Input
                          placeholder="Enter your email"
                          value={field.value as string}
                        />
                      )}
                    </CustomFormField>
                    <CustomFormField
                      control={form.control}
                      name=""
                      label="Password"
                    >
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
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="absolute bottom-0 p-4 w-full">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col">
                <ButtonSubmit button_value="Save Changes" button_icon="" />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default EditProfile;
