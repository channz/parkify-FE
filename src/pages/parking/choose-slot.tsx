import ButtonSubmit from "@/components/button-submit";
import DetailCard from "@/components/detail-card";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getParkingByID } from "@/utils/apis/parking/api";
import { Parking } from "@/utils/apis/parking/type";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { addReservation } from "@/utils/apis/reservation/api";
import {
  ReservationSchema,
  reservationSchema,
} from "@/utils/apis/reservation/type";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormSelect } from "@/components/custom-formfield";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParkingSlot } from "@/utils/apis/slot/type";
import { Label } from "@/components/ui/label";
import { formatOrdinals } from "@/utils/formatter";

const ChooseSlot = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Parking<ParkingSlot[]>>();
  const [floors, setFloors] = useState(0);
  const [selectedValues, setSelectedValues] = useState({
    vehicle_type: "",
    floor: "",
    slot: "",
    parkingslot_id: 0,
  });

  const form = useForm<ReservationSchema>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      parkingslot_id: 0,
    },
  });

  useEffect(() => {
    fetchData();
    if (parkingSlot.length > 0 && !selectedValues.slot) {
      setSelectedValues((prevState) => ({
        ...prevState,
        slot: parkingSlot[0].label,
      }));
    }
  }, []);

  async function fetchData() {
    try {
      const result = await getParkingByID(params.parkingID!);
      const maxFloor = result.data.parking_slots.reduce(
        (prev, current) => (prev > current.Floor ? prev : current.Floor),
        0
      );

      setData(result.data);
      setFloors(maxFloor);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function onSubmit(body: ReservationSchema) {
    try {
      const result = await addReservation(body);

      toast(result.message);
      navigate(`/reservations/${result.data.reservation_id}`);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  const handleVehicleTypeChange = (value: string) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      vehicle_type: value,
      floor: "",
      slot: "",
      parkingslot_id: 0,
    }));
  };

  const handleFloorChange = (value: string) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      floor: value,
      slot: "",
      parkingslot_id: 0,
    }));
  };

  const parkingSlot = useMemo(() => {
    if (!data || !selectedValues.vehicle_type || !selectedValues.floor)
      return [];

    const filteredByVehicleType = data.parking_slots.filter(
      (slot) => slot.VehicleType === selectedValues.vehicle_type
    );

    const availableFloors = [
      ...new Set(filteredByVehicleType.map((slot) => slot.Floor)),
    ];

    if (!selectedValues.floor) {
      return availableFloors.map((floor) => ({
        label: `${formatOrdinals(floor)} Floor`,
        value: String(floor),
      }));
    }

    const filteredByFloor = filteredByVehicleType.filter(
      (slot) => slot.Floor === +selectedValues.floor
    );

    const formatData = filteredByFloor.map((slot) => ({
      label: `${formatOrdinals(slot.Slot)} Slot`,
      value: slot.ID,
    }));

    return formatData;
  }, [data, selectedValues]);

  useEffect(() => {
    if (parkingSlot.length > 0 && !selectedValues.slot) {
      setSelectedValues((prevState) => ({
        ...prevState,
        slot: parkingSlot[0].label,
      }));
    }
  }, [parkingSlot]);

  return (
    <Layout>
      <div className="relative h-full w-full">
        <Form {...form}>
          <form
            className="flex flex-col space-y-4 py-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col p-4 space-y-4">
              {data ? (
                <DetailCard
                  key={data.location}
                  location_name={data.location}
                  cover_image={data.image_loc}
                  city={data.city}
                />
              ) : null}
              <RadioGroup
                onValueChange={handleVehicleTypeChange}
                defaultValue={selectedValues.vehicle_type}
                className="flex w-full justify-between "
              >
                <Card className="flex">
                  <CardContent className=" flex space-x-4 space-y-0 rounded-2xl px-16 py-6 w-full focus-within:border-orange-400">
                    <RadioGroupItem value="car" id="r1" className="my-auto" />
                    <Label htmlFor="r21">
                      <img
                        src="/car.png"
                        alt="Motorcycle"
                        className="h-12 w-12"
                      />
                    </Label>
                  </CardContent>
                </Card>
                <Card className="flex">
                  <CardContent className="flex space-x-4 space-y-0 rounded-2xl px-16 py-6 w-full focus-within:border-orange-400">
                    <RadioGroupItem
                      value="motorcycle"
                      id="r2"
                      className="my-auto"
                    />
                    <Label htmlFor="r2">
                      <img
                        src="/motorcycle.png"
                        alt="Motorcycle"
                        className="h-12 w-12"
                      />
                    </Label>
                  </CardContent>
                </Card>
              </RadioGroup>
              <Select
                onValueChange={handleFloorChange}
                defaultValue={selectedValues.floor}
              >
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Choose Floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose Floor</SelectLabel>
                    {Array.from({ length: floors }, (_, i) => i + 1).map(
                      (number) => (
                        <SelectItem value={String(number)} key={number}>
                          {formatOrdinals(number)} Floor
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <CustomFormSelect
                control={form.control}
                name="parkingslot_id"
                label="Choose Slot"
                placeholder="Choose Slot"
                options={parkingSlot}
              />
            </div>
            <div className="flex gap-5 absolute bottom-0 w-full p-4">
              <Card className="flex flex-col w-1/2 rounded-2xl border-orange-400">
                <CardContent className="py-2">
                  <p className="font-light text-md leading-none">Picking</p>
                  <p className="font-semibold text-lg">
                    {formatOrdinals(Number(selectedValues.floor))} Floor |{" "}
                    {selectedValues.slot}
                  </p>
                </CardContent>
              </Card>
              <div className="flex flex-col w-1/2 leading-none">
                <ButtonSubmit
                  button_value="Book Now"
                  button_icon={<ArrowUpRight />}
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

export default ChooseSlot;
