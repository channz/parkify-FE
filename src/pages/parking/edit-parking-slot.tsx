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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const EditParkingSlot = () => {
  const [showModal, setShowModal] = useState(false);
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
      if (showModal == false) {
        setShowModal(true);
        const result = await getAllParkingSlot();
        const filteredData = result.data.filter(
          (elemen) => elemen.ID == params.parkingslotID
        );
        setEditDatas(filteredData[0]);
        form.setValue("vehicle_type", editDatas?.VehicleType);
        form.setValue("floor", editDatas?.Floor!);
        form.setValue("slot", editDatas?.Slot!);
        form.setValue("price", editDatas?.Price!);
      }
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
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <div className="flex flex-col p-4 space-y-4">
          <h1 className="flex justify-normal text-3xl font-semibold">
            Edit Parking Slot
          </h1>
          <Form {...form}>
            <form
              className="flex flex-col space-y-4 py-4 my-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <CustomFormField
                control={form.control}
                name="vehicle_type"
                label="Vehicle Type"
              >
                {(field) => (
                  <Input
                    className="bg-slate-200"
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
                    className="bg-slate-200"
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
                    className="bg-slate-200"
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
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default EditParkingSlot;
