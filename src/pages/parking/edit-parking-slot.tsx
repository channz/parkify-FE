import Layout from "@/components/layout";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CustomFormField } from "@/components/custom-formfield";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateSlotSchema, updateSlotSchema } from "@/utils/apis/slot/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { editParkingSlot, getAllParkingSlot } from "@/utils/apis/slot/api";
import { toast } from "sonner";
import useParkingSlotStore from "@/utils/stores/parkingslot";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const EditParkingSlot = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { editDatas, setEditDatas } = useParkingSlotStore();

  const form = useForm<UpdateSlotSchema>({
    resolver: zodResolver(updateSlotSchema),
    defaultValues: {
      vehicle_type: editDatas ? editDatas.VehicleType : "car",
      floor: editDatas ? editDatas.Floor : 0,
      slot: editDatas ? editDatas.Slot : 0,
      price: editDatas ? editDatas.Price : 0,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getAllParkingSlot();
      const filteredData = result.data.filter(
        (elemen) => elemen.ID == params.parkingslotID
      );
      setEditDatas(filteredData[0]);
      form.setValue("vehicle_type", filteredData[0].VehicleType);
      form.setValue("floor", filteredData[0].Floor!);
      form.setValue("slot", filteredData[0].Slot!);
      form.setValue("price", filteredData[0].Price!);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function onSubmit(body: UpdateSlotSchema) {
    try {
      const result = await editParkingSlot(params.parkingslotID!, body);

      toast(result.message);
      navigate("/list-parking");
    } catch (error) {
      toast((error as Error).message);
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
            <div className="flex flex-col overflow-auto">
              <div className="flex flex-col px-4 py-8">
                <h1 className="text-3xl text-center mb-8 font-semibold">
                  Edit Parking Slot
                </h1>
                <CustomFormField
                  control={form.control}
                  name="vehicle_type"
                  label="Vehicle Type"
                >
                  {(field) => (
                    <Input
                      className="bg-slate-200 pointer-events-none"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      value={field.value}
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="floor"
                  label="Floor"
                >
                  {(field) => (
                    <Input
                      className="bg-slate-200 pointer-events-none"
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
                      className="bg-slate-200 pointer-events-none"
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
                <Button
                  className="flex w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-lg"
                  type="submit"
                  id=""
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditParkingSlot;
