import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/custom-formfield";
import { useForm } from "react-hook-form";
import {
  UpdateParkingSchema,
  updateParkingSchema,
} from "@/utils/apis/parking/type";
import { editParking, getAllParking } from "@/utils/apis/parking/api";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getProfile } from "@/utils/apis/user/api";
import { Loader2 } from "lucide-react";
import useParkingStore from "@/utils/stores/parking";

const EditParkingLocation = () => {
  const [showModal, setShowModal] = useState(false);
  const { editData, setEditData } = useParkingStore();
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setisLoading] = useState(true);

  const form = useForm<UpdateParkingSchema>({
    resolver: zodResolver(updateParkingSchema),
    defaultValues: {
      location: editData ? editData.location : "",
      city: editData ? editData.city : "",
      imageloc: new File([], ""),
    },
  });

  useEffect(() => {
    fetchData();
  }, [editData, form.formState.isSubmitSuccessful]);

  async function fetchData() {
    try {
      // if (showModal == false) {
      //   setShowModal(true);
      const userResponse = await getProfile();
      const result = await getAllParking();
      const filteredData = result.data.filter(
        (parking) => parking.user_id == userResponse.data.user_id
      );
      setEditData(filteredData[0]);
      setisLoading(false);
      form.setValue("location", editData?.location!);
      form.setValue("city", editData?.city!);
      // }
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function onSubmit(body: UpdateParkingSchema) {
    try {
      const result = await editParking(params.parkingID!, body);

      toast(result.message);
      navigate("/profile");
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <h1 className="flex justify-center text-3xl font-semibold">
          Edit Parking Location
        </h1>
        <Form {...form}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <form
              className="flex flex-col space-y-4 px-4 py-4 my-4"
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
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
          )}
        </Form>
      </div>
    </Layout>
  );
};

export default EditParkingLocation;
