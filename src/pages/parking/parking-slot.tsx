import ButtonSubmit from "@/components/button-submit";
import Layout from "@/components/layout";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-formfield";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { SlotSchema, slotSchema } from "@/utils/apis/slot/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewParkingSlot } from "@/utils/apis/slot/api";
import { toast } from "sonner";
import DetailCard3 from "@/components/detail-card3";
import { Parking } from "@/utils/apis/parking/type";
import { useEffect, useState } from "react";
import { getAllParking } from "@/utils/apis/parking/api";
import { getProfile } from "@/utils/apis/user/api";

const ParkingSlot = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Parking>();

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<SlotSchema>({
    resolver: zodResolver(slotSchema),
    defaultValues: {
      parking_id: 0,
      vehicle_type: "car",
      floor: 0,
      slot: 0,
      price: 0,
    },
  });

  async function fetchData() {
    try {
      const userResponse = await getProfile();
      const result = await getAllParking();
      const filteredData = result.data.filter(
        (parking) => parking.user_id == userResponse.data.user_id
      );
      setData(filteredData[0]);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function onSubmit(body: SlotSchema) {
    try {
      body.parking_id = Number(data?.ID);
      const result = await addNewParkingSlot(body);
      toast(result.message);
      navigate("/profile");
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="relative w-full h-full">
        <Form {...form}>
          <form
            className="flex flex-col py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col overflow-auto">
              <div className="flex flex-col px-4 space-y-4">
                <DetailCard3
                  id={data?.ID}
                  key={data?.ID}
                  location_name={data?.location!}
                  cover_image={data?.imageloc}
                  city={data?.city!}
                />
                <h1 className="flex justify-normal text-3xl font-semibold">
                  Add Parking Slot
                </h1>
                <CustomFormSelect
                  control={form.control}
                  name="vehicle_type"
                  label="Vehicle Type"
                  options={[
                    { value: "car", label: "car" },
                    { value: "motorcycle", label: "motorcycle" },
                  ]}
                />
                <CustomFormField
                  control={form.control}
                  name="floor"
                  label="Floor"
                >
                  {(field) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Floor"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={Number(field.value)}
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="slot"
                  label="Slot"
                >
                  {(field) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Slot"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={Number(field.value)}
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="price"
                  label="Price"
                >
                  {(field) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Price"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={Number(field.value)}
                    />
                  )}
                </CustomFormField>
              </div>
              <div className="absolute bottom-0 w-full p-4">
                <ButtonSubmit
                  button_value="Submit"
                  button_icon=""
                  type="submit"
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default ParkingSlot;
