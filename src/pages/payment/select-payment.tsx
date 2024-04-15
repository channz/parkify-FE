import ButtonSubmit from "@/components/button-submit";
import { CustomFormSelect } from "@/components/custom-formfield";
import DetailCard from "@/components/detail-card";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { getReservationByID } from "@/utils/apis/reservation/api";
import { Reservation } from "@/utils/apis/reservation/type";
import { addTransaction } from "@/utils/apis/transaction/api";
import {
  TransactionSchema,
  transactionSchema,
} from "@/utils/apis/transaction/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const SelectPayment = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Reservation>();
  const params = useParams();

  const form = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      reservation_id: 0,
      payment_method: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getReservationByID(params.reservationID!);
      console.log(result);
      setData(result.data);
    } catch (error) {}
  }

  async function onSubmit(body: TransactionSchema) {
    try {
      body.reservation_id = Number(data?.reservation_id);
      console.log(body.reservation_id);
      const result = await addTransaction(body);

      toast(result.message);
      navigate(`/detail-payment`);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="relative h-full w-full">
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex gap-5">
            <Card className="flex flex-row items-center gap-1 w-1/2 rounded-3xl border-2 active:border-orange-400 focus-within:border-orange-400">
              <CardContent className="p-5 m-auto">
                <img
                  className="h-16 w-full object-contain"
                  src="/public/car.png"
                  alt=""
                  id="r1"
                />
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-1 w-1/2 rounded-3xl border-2 active:border-orange-400 focus-within:border-orange-400">
              <CardContent className="p-5">
                <p className="font-semibold text-3xl">1</p>
                <p className="font-normal text-lg">1st Floor</p>
              </CardContent>
            </Card>
          </div>
          <DetailCard
            location_name={"Tunjungan Plaza"}
            cover_image={"/tunjungan-plaza.jpg"}
            city={"Surabaya"}
          />
          <Separator />
          <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
              <CustomFormSelect
                control={form.control}
                name="payment_method"
                label="Select Payment"
                options={[{ value: "VA BCA", label: "VA BCA" }]}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <div className="absolute bottom-0 p-4 w-full">
          <div className="flex flex-col gap-5 w-full">
            <Card className="flex flex-col rounded-2xl border-orange-400">
              <CardContent className="py-2">
                <p className="font-semibold text-2xl">
                  Rp. <span>25.000</span>
                </p>
                <p className="font-light text-base">Per hour</p>
              </CardContent>
            </Card>
            <div className="flex flex-col">
              {/* <ButtonSubmit
                button_value="Confirm"
                button_icon=""
                type="submit"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectPayment;
