import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getAllParkingSlot } from "@/utils/apis/slot/api";
import { ParkingSlot } from "@/utils/apis/slot/type";
import { useToken } from "@/utils/contexts/token";
import {
  LogOut,
  MapPinned,
  History,
  Plus,
  Receipt,
  Settings2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { getReservation } from "@/utils/apis/reservation/api";
import { Reservation } from "@/utils/apis/reservation/type";

const Homepage = () => {
  const { changeToken, user } = useToken();
  const [data, setData] = useState<ParkingSlot[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [lastReservation, setLastReservation] = useState<Reservation | null>(
    null
  );

  useEffect(() => {
    fetchData();
    fetchDataReservation();
  }, []);

  async function fetchData() {
    try {
      const result = await getAllParkingSlot();
      const totalPriceOfNotAvailableSlots = result.data
        .filter((slot) => slot.Status === "not available")
        .reduce((acc, slot) => acc + slot.Price, 0);
      setData(result.data.filter((slot) => slot.Status === "available"));
      setTotalPrice(totalPriceOfNotAvailableSlots);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function fetchDataReservation() {
    try {
      const result = await getReservation();
      const lastReservation = result.data[0];
      setLastReservation(lastReservation);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  function handleLogout() {
    changeToken();
    toast("Logout successfully");
  }

  return (
    <Layout>
      <div className="h-full w-full relative">
        <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400">
          <div className="flex flex-col px-4 py-8 space-y-5">
            <div className="flex mb-12">
              <div className="flex flex-col grow">
                <p className="font-light text-2xl text-white">Hello</p>
                <h1 className="font-semibold text-4xl text-white">
                  {user?.fullname}
                </h1>
              </div>
              <div className="flex gap-5 text-white">
                <Link to={"/profile"}>
                  <Settings2 className="w-7 h-7" />
                </Link>
                <LogOut
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => handleLogout()}
                />
              </div>
            </div>
            {user?.role === "operator" ? (
              <>
                <div className="flex flex-col gap-5">
                  <Link to={`/list-parking`}>
                    <Card className="pt-4 bg-gradient-to-b from-orange-400 to-yellow-400 border-none rounded-2xl text-white drop-shadow-md">
                      <CardContent className="space-y-12">
                        <div className="flex gap-4">
                          <MapPinned className="w-7 h-7" />
                          <p className="font-medium text-2xl">
                            Available Parking Place
                          </p>
                        </div>
                        <p className="flex font-bold text-4xl gap-2">
                          {data.length}
                          <span>Places</span>
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Card className="pt-4 border-2 border-orange-400 rounded-2xl drop-shadow-md">
                    <CardContent className="space-y-12">
                      <div className="flex gap-4">
                        <Receipt className="w-7 h-7" />
                        <p className="font-medium text-2xl">Income This Day</p>
                      </div>
                      <p className="flex font-bold text-4xl gap-2">
                        Rp.<span>{totalPrice}</span>
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Link to={`/parking-location`}>
                  <div className="absolute p-4 bottom-0 right-0">
                    <Plus className=" bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full w-12 h-12 p-2 text-white" />
                  </div>
                </Link>
              </>
            ) : (
              <>
                <div className="flex gap-5">
                  <Card className="flex flex-col flex-auto w-7/12 pt-4 bg-gradient-to-b from-orange-400 to-yellow-400 border-none rounded-2xl text-white drop-shadow-md">
                    <Link to={`/select-location`}>
                      <CardContent className="flex flex-col space-y-8 pe-12">
                        <MapPinned className="w-7 h-7" />
                        <p className="font-semibold text-2xl mt-auto">
                          Find Parking Place
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                  <Card className="flex flex-col flex-auto w-5/12 pt-4 border-2 border-orange-400 rounded-2xl drop-shadow-md">
                    <Link to={`/reservations`}>
                      <CardContent className="space-y-8">
                        <History className="w-7 h-7" />
                        <p className="font-semibold text-2xl">Last Parking</p>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
                <div className="flex flex-col">
                  <Card className="pt-4 border-2 border-orange-400 rounded-2xl drop-shadow-md">
                    <CardContent className="space-y-8">
                      {lastReservation ? (
                        <>
                          <QRCode
                            size={256}
                            style={{
                              height: "auto",
                              maxWidth: "100%",
                              width: "100%",
                            }}
                            value={lastReservation.reservation_id}
                            viewBox={`0 0 256 256`}
                          />
                          <p className="font-semibold text-center text-2xl">
                            Your QR Code
                          </p>
                        </>
                      ) : null}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
