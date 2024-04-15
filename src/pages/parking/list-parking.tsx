import { CustomFormSelect } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import SlotCard from "@/components/slot-card";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteParkingSlot, getAllParkingSlot } from "@/utils/apis/slot/api";
import { ParkingSlot, SlotSchema, slotSchema } from "@/utils/apis/slot/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ListParking = () => {
  const [data, setData] = useState<ParkingSlot[]>([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getAllParkingSlot();
      setData(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function handleDelete(parkingslotID: string) {
    try {
      const result = await deleteParkingSlot(parkingslotID);
      toast(result?.message);
      fetchData();
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <div className="flex flex-col p-4 space-y-4">
          <Form {...form}>
            <form action="">
              <CustomFormSelect
                control={form.control}
                name="vehicle_type"
                label="Vehicle Type"
                options={[
                  { value: "car", label: "car" },
                  { value: "motorcycle", label: "motorcycle" },
                ]}
              />
            </form>
          </Form>
          <p className="font-semibold text-md">Vehicle Type</p>
          <Select>
            <SelectTrigger className="p-4 h-12 rounded-2xl">
              <SelectValue placeholder="Vehicle" />
            </SelectTrigger>
            <SelectContent className="flex">
              <SelectItem className="flex" value="Car">
                Car
              </SelectItem>
              <SelectItem className="flex" value="Motorcycle">
                Motorcycle
              </SelectItem>
            </SelectContent>
          </Select>
          {data?.map((parkingslot) => (
            <SlotCard
              key={parkingslot.ID}
              id={parkingslot.ID}
              slot={parkingslot.Slot}
              price={parkingslot.Price}
              status={parkingslot.Status}
              onClickDelete={() => handleDelete(parkingslot.ID)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListParking;
