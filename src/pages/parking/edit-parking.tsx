import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/custom-formfield";
import { useForm } from "react-hook-form";
import { ParkingSchema, parkingSchema } from "@/utils/apis/parking/type";
import { addNewParking, editParking } from "@/utils/apis/parking/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToken } from "@/utils/contexts/token";

const EditParkingLocation = () => {
  const navigate = useNavigate();
  const { user } = useToken();

  const form = useForm<ParkingSchema>({
    resolver: zodResolver(parkingSchema),
    defaultValues: {
      location: "",
      city: "",
      imageloc: new File([], ""),
    },
  });

  useEffect(() => {
    form.setValue("location");
  }, []);

  async function onSubmit(body: ParkingSchema, parkingID: string) {
    try {
      const result = await editParking(body: {mode: "edit"}, parkingID);

      toast(result.message);
      navigate(`/`);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <h1 className="flex justify-center text-3xl font-semibold">
          Add Parking Location
        </h1>
        <Form {...form}>
          <form
            className="flex flex-col space-y-4 px-4 py-4 my-4"
            action=""
            onSubmit={form.handleSubmit(onSubmit(body))}
          >
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
            <div className="flex flex-col">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditParkingLocation;
