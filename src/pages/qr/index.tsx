import ButtonSubmit from "@/components/button-submit";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QRCode from "react-qr-code";
import { getReservationByID } from "@/utils/apis/reservation/api";
import { Reservation } from "@/utils/apis/reservation/type";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const QRPage = () => {
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState<Reservation>();

  async function fetchData() {
    try {
      const result = await getReservationByID(params.reservationID!);
      setData(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400">
        <div className="flex flex-col px-4 py-8 space-y-5 w-full">
          <p className="font-semibold text-3xl text-center text-white">
            Your QR
          </p>
          <Card className="flex rounded-3xl">
            <CardContent className="px-2 py-4 m-auto space-y-4">
              <div className="flex flex-col">
                {data ? (
                  <QRCode
                    size={256}
                    id={data.reservation_id}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={data.reservation_id}
                    viewBox={`0 0 256 256`}
                  />
                ) : null}
              </div>
              <p className="text-center font-light text-lg">
                Booking ID : <span>{data?.reservation_id}</span>
              </p>
              <Separator />
              <div className="flex">
                <div className="flex flex-col">
                  <p className="font-semibold text-3xl">Floor {data?.floor}</p>
                  <p className="font-medium text-base">Floor</p>
                </div>
                <div className="flex flex-col ms-auto">
                  <p className="font-semibold text-3xl">{data?.slot}</p>
                  <p className="font-medium text-base">Slot</p>
                </div>
              </div>
              <Separator />
              <div className="flex">
                <div className="flex flex-col w-1/2">
                  <p className="font-normal text-base">Location</p>
                  <p className="font-semibold text-3xl text-wrap">
                    {data?.location}
                  </p>
                  <p className="font-medium text-base">{data?.city}</p>
                </div>
                <div className="flex flex-col ms-auto">
                  <p className="font-normal text-base">Vehicle</p>
                  <p className="font-semibold text-3xl">{data?.vehicle_type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col w-full h-14">
            {data && data?.payment_status !== "success" ? (
              <>
                <Link to={`/reservations/${data?.reservation_id}/checkout`}>
                  <ButtonSubmit
                    button_value="Exit Park"
                    button_icon=""
                    type=""
                  />
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QRPage;
