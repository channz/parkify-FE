import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/utils/apis/user/api";
import { ProfileUpdateType, profileUpdateSchema } from "@/utils/apis/user/type";
import { useToken } from "@/utils/contexts/token";
import useStore from "@/utils/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useToken();
  const { showPassword, toggleShowPassword } = useStore();

  const form = useForm<ProfileUpdateType>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullname: "",
      password: "",
    },
  });

  useEffect(() => {
    form.setValue("fullname", user?.fullname!);
    form.setValue("password", user?.password!);
  }, [user]);

  async function onSubmit(data: ProfileUpdateType) {
    try {
      const result = await updateProfile(data);

      toast(result.message);
      navigate("/profile");
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <Layout>
      <Form {...form}>
        <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400">
          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
            key="updateProfile"
          >
            <div className="flex flex-col px-4 py-32 space-y-5">
              <p className="text-white font-semibold text-3xl">Edit Profile</p>
              <Card className="flex flex-col rounded-3xl drop-shadow-md">
                <CardContent className="px-4 py-8 space-y-5">
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
                  <div className="flex space-x-2 ">
                    <Checkbox
                      className="flex"
                      id="terms"
                      onClick={toggleShowPassword}
                    />
                    <label
                      htmlFor="terms"
                      className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show password
                    </label>
                  </div>
                  <Button
                    className="flex w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-lg"
                    type="submit"
                    id="updateProfile"
                  >
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </Form>
    </Layout>
  );
};

export default EditProfile;
