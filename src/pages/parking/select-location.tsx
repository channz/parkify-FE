import Layout from "@/components/layout";
import LocationCard from "@/components/location-card";
import { Input } from "@/components/ui/input";

const SelectLocation = () => {
  return (
    <Layout>
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <Input placeholder="Find parking place" type="search" />
        <LocationCard
          key={1}
          id={1}
          location_name={"Tunjungan Plaza"}
          city={"Surabaya"}
          cover_image={"/public/tunjungan-plaza.jpg"}
          space={"Available"}
        />
      </div>
    </Layout>
  );
};

export default SelectLocation;
