import Layout from "@/components/layout";
import LocationCard from "@/components/location-card";
import { Input } from "@/components/ui/input";
import { getAllParking } from "@/utils/apis/parking/api";
import { Parking } from "@/utils/apis/parking/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SelectLocation = () => {
  const [data, setData] = useState<Parking[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getAllParking();
      setData(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  return (
    <Layout>
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <Input placeholder="Find parking place" type="search" />
        {data.map((parking) => (
          <LocationCard
            key={parking.ID}
            id={parking.ID}
            location_name={parking.location}
            city={parking.city}
            cover_image={parking.imageloc}
          />
        ))}
      </div>
    </Layout>
  );
};

export default SelectLocation;
