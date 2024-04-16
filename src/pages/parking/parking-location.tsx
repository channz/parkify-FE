import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/custom-formfield";
import { useForm } from "react-hook-form";
import { AddParkingSchema, addParkingSchema } from "@/utils/apis/parking/type";
import { addNewParking } from "@/utils/apis/parking/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonSubmit from "@/components/button-submit";

const ParkingLocation = () => {
  const navigate = useNavigate();

  const form = useForm<AddParkingSchema>({
    resolver: zodResolver(addParkingSchema),
    defaultValues: {
      location: "",
      city: "",
      imageloc: new File([], ""),
    },
  });

  async function onSubmit(body: AddParkingSchema) {
    try {
      const result = await addNewParking(body);

      toast(result.message);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="relative w-full h-full">
        <Form {...form}>
          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col px-4 py-8 space-y-4">
              <h1 className="flex justify-center text-3xl mb-4 font-semibold">
                Add Parking Location
              </h1>
              <CustomFormField
                control={form.control}
                name="location"
                label="Location Name"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Enter location name"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField control={form.control} name="city" label="City">
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Your parking location"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="imageloc"
                label="Picture"
              >
                {(field) => (
                  <Input
                    type="file"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                )}
              </CustomFormField>
            </div>
            <div className="absolute bottom-0 p-4 w-full">
              <div className="flex flex-col w-full">
                <div className="flex flex-col">
                  <ButtonSubmit
                    button_value="Confirm"
                    button_icon=""
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default ParkingLocation;
