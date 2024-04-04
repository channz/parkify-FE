import Layout from "@/components/layout";
import HistoryLocation from "@/components/history-location";

const ParkingHistory = () => {
  const parkingHistoryData = [
    {
      date: "Yesterday 12.00",
      name: "Car Park",
      location: "Tunjungan Plaza, Surabaya",
      price: "Rp 25.000",
    }
  ]

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
