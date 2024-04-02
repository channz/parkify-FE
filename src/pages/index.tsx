import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { useToken } from "@/utils/contexts/token";
import {
  LogOut,
  MapPinned,
  History,
  QrCode,
  Plus,
  Receipt,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";

const Homepage = () => {
  const { changeToken } = useToken();

  function handleLogout() {
    changeToken();
    toast("Logout successfully");
  }

  return (
    <Layout>
      <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400">
        <div className="flex flex-col px-4 py-24 space-y-5">
          <div className="flex my-10">
            <div className="flex flex-col grow">
              <p className="font-light text-2xl text-white">Hello</p>
              <h1 className="font-semibold text-4xl text-white">John Doe</h1>
            </div>
            <div className="flex gap-5 text-white">
              <Settings2 className="w-7 h-7" />
              <LogOut
                className="w-7 h-7 cursor-pointer"
                onClick={() => handleLogout()}
              />
            </div>
          </div>
          {/* User Dashboard */}
          <div className="flex gap-5">
            <Card className="flex flex-col flex-auto w-7/12 pt-4 bg-gradient-to-b from-orange-400 to-yellow-400 border-none rounded-2xl text-white drop-shadow-md">
              <CardContent className="space-y-8">
                <MapPinned className="w-7 h-7" />
                <p className="font-semibold text-2xl">Find Parking Place</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col flex-auto w-5/12 pt-4 border-2 border-orange-400 rounded-2xl drop-shadow-md">
              <CardContent className="space-y-8">
                <History className="w-7 h-7" />
                <p className="font-semibold text-2xl">Last Parking</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col">
            <Card className="pt-4 border-2 border-orange-400 rounded-2xl drop-shadow-md">
              <CardContent className="space-y-8">
                <QrCode className="w-7 h-7" />
                <p className="font-semibold text-2xl">There is no QR yet</p>
              </CardContent>
            </Card>
          </div>
          {/* End User Dashboard */}
          {/* Operator Dashboard */}
          {/* <div className="flex flex-col gap-5">
            <Card className="pt-4 bg-gradient-to-b from-orange-400 to-yellow-400 border-none rounded-2xl text-white drop-shadow-md">
              <CardContent className="space-y-12">
                <div className="flex gap-4">
                  <MapPinned className="w-7 h-7" />
                  <p className="font-medium text-2xl">
                    Available Parking Place
                  </p>
                </div>
                <p className="flex font-bold text-4xl gap-2">
                  4<span>Places</span>
                </p>
              </CardContent>
            </Card>
            <Card className="pt-4 border-2 border-orange-400 rounded-2xl drop-shadow-md">
              <CardContent className="space-y-12">
                <div className="flex gap-4">
                  <Receipt className="w-7 h-7" />
                  <p className="font-medium text-2xl">Income This Day</p>
                </div>
                <p className="flex font-bold text-4xl gap-2">
                  Rp.<span>275.000</span>
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="absolute p-4 bottom-0 right-0">
            <Plus className=" bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full w-12 h-12 p-2 text-white" />
          </div> */}
          {/* End Operator Dashboard */}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
