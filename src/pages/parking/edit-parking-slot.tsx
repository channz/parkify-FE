import ButtonSubmit from "@/components/button-submit";
import DetailCard from "@/components/detail-card";
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
import { editParkingSlot } from "@/utils/apis/slot/api";
import { toast } from "sonner";

const EditParkingSlot = () => {
  const navigate = useNavigate();

  const form = useForm<SlotSchema>({
    resolver: zodResolver(slotSchema),
    defaultValues: {
      vehicle_type: "car",
      floor: 0,
      slot: 0,
      price: 0,
    },
  });

  async function onSubmit(data: SlotSchema, parkingslotID: string) {
    try {
      const result = await editParkingSlot(data, parkingslotID);

      toast(result.message);
      navigate("/profile");
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <div className="flex flex-col p-4 space-y-4">
          <DetailCard
            key={1}
            location_name={"Tunjungan Plaza"}
            cover_image={"/public/tunjungan-plaza.jpg"}
            city={"Surabaya"}
          />
          <h1 className="flex justify-normal text-3xl font-semibold">
            Add Parking Slot
          </h1>
          <Form {...form}>
            <form
              className="flex flex-col space-y-4 py-4 my-4"
              onSubmit={form.handleSubmit(onSubmit(body, parkingslotID))}
            >
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
              <CustomFormField control={form.control} name="slot" label="Slot">
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
              <div className="flex flex-col">
                <ButtonSubmit
                  button_value="Submit"
                  button_icon=""
                  type="submit"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default EditParkingSlot;
