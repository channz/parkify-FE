import Layout from "@/components/layout";
import HistoryLocation from "@/components/history-location";
import { getReservation } from "@/utils/apis/reservation/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Reservation } from "@/utils/apis/reservation/type";

const ParkingHistory = () => {
  const [data, setData] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getReservation();
      setData(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="flex flex-col px-4 py-8 space-y-4 overflow-auto">
        <section className="flex flex-col space-y-4">
          <h2 className="w-full text-3xl text-center font-semibold text-black">
            Parking History
          </h2>
          {data.map((reservation) => (
            <HistoryLocation
              key={reservation.reservation_id}
              id={reservation.reservation_id}
              slot={reservation.slot}
              floor={reservation.floor}
              location={reservation.location}
              city={reservation.city}
              price={reservation.price}
            />
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default ParkingHistory;
