import Layout from "@/components/layout";
import HistoryLocation from "@/components/history-location";
import { getReservation } from "@/utils/apis/reservation/api";
import { useEffect } from "react";
import { toast } from "sonner";


const ParkingHistory = () => {
  useEffect (() => {
    fetchData();
  }, []);
  const parkingHistoryData = [
    {
      date: "Yesterday 12.00",
      name: "Car Park",
      location: "Tunjungan Plaza, Surabaya",
      price: "Rp 25.000",
    }
  ]

  async function fetchData(){
    try {
      const res = await getReservation();
      toast(res?.message);
      fetchData();
    } catch (error){
      toast ((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <section className="flex flex-col px-5 max-w-[368px]">
          <h2 className="w-full text-sm font-bold text-black">Parking History</h2>
            {parkingHistoryData.map((item, index) => (
              <HistoryLocation
                key={index}
                date={item.date}
                name={item.name}
                location={item.location}
                price={item.price}
              />
            ))}
        </section>  
      </div>
    </Layout>
  );
};

export default ParkingHistory;
