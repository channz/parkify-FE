import ButtonSubmit from "@/components/button-submit";
import { CustomFormField } from "@/components/custom-formfield";
import DetailCard from "@/components/detail-card";
import Layout from "@/components/layout";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

const ListParking = () => {
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
          <p className="font-semibold text-md">Vehicle Type</p>
          <Select>
            <SelectTrigger className="p-4 h-12 rounded-2xl">
              <SelectValue placeholder="Vehicle" />
            </SelectTrigger>
            <SelectContent className="flex">
              <SelectItem className="flex" value="Car">
                Car
              </SelectItem>
              <SelectItem className="flex" value="Bike">
                Bike
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <ButtonSubmit button_value="Submit" button_icon="" type="" />
        </div>
      </div>
    </Layout>
  );
};

export default ListParking;
