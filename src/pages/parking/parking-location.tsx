import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import ButtonSubmit from "@/components/button-submit";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/custom-formfield";
import { useForm } from "react-hook-form";

const ParkingLocation = () => {

  const form = useForm({
    defaultValues: {
      fullName:  "",
      location: "",
    },
  });

    return (
      <Layout>
        <div className="flex flex-col p-4 space-y-4 overflow-auto">
            <h1 className="flex justify-center text-3xl font-semibold">
              Add Parking Location
            </h1>
        <Form {...form}>
          <form className="flex flex-col space-y-4 px-4 py-4 my-4">
            <CustomFormField control={form.control} name="fullName" label="Full Name">
              {(field) => (
                <Input
                  placeholder="Enter your full name"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="location" label="Location">
              {(field) => (
                <Input
                  placeholder="Your parking location"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            
          

            <div className="flex flex-col">
                  <ButtonSubmit button_value="Confirm" button_icon="" />
            </div>
          </form>
        </Form>
        </div>
      </Layout>
  );
};
  
export default ParkingLocation;