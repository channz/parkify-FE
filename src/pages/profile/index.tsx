import ButtonSubmit from "@/components/button-submit";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { useToken } from "@/utils/contexts/token";
import { LogOut, Settings, SquarePen, Trash2 } from "lucide-react";

const Profile = () => {
  const { user } = useToken();

  return (
    <Layout>
      <div className="relative h-full w-full">
        <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400">
          <div className="flex flex-col px-4 py-32 space-y-5">
            <p className="text-white font-semibold text-3xl">Profile</p>
            <Card className="flex flex-col rounded-3xl drop-shadow-md">
              <CardContent className="p-4 space-y-5">
                <div className="flex">
                  <p className="font-semibold text-3xl">Account</p>
                  <SquarePen className="my-auto ms-auto" />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg">Name</p>
                  <p className="font-semibold text-xl">{user?.fullname}</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg">Email</p>
                  <p className="font-semibold text-xl">{user?.email}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col rounded-3xl drop-shadow-md">
              <CardContent className="px-4 py-6 space-y-5">
                <div className="flex">
                  <p className="font-semibold text-xl">Manage My Parking</p>
                  <Settings className="my-auto ms-auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="absolute bottom-0 p-4 w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col">
              <ButtonSubmit
                button_value="Delete Account"
                button_icon={<Trash2 />}
                type=""
              />
            </div>
            <div className="flex flex-col">
              <ButtonSubmit
                button_value="Logout"
                button_icon={<LogOut />}
                type=""
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
