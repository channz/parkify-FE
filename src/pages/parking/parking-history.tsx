import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";

const SelectLocation = () => {
  return (
    <Layout>
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        <Input placeholder="Find parking place" type="search" />
        
      </div>
    </Layout>
  );
};

export default SelectLocation;
