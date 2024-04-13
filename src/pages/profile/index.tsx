import Layout from "@/components/layout";
import ManagePark from "@/components/manage-park";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAllParking,
  getParkingByID,
  getParkingWithUserByID,
} from "@/utils/apis/parking/api";
import { Parking } from "@/utils/apis/parking/type";
import { deleteUser, getProfile } from "@/utils/apis/user/api";
import { useToken } from "@/utils/contexts/token";
import { LogOut, SquarePen, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, changeToken } = useToken();

  const [data, setData] = useState<Parking[]>([]);
  const [datas, setDatas] = useState<Parking>();

  const params = useParams();

  useEffect(() => {
    fetchData();
    fetchDatas();
  }, []);

  async function fetchData() {
    try {
      const userResponse = await getProfile();
      const result = await getAllParking();
      const filteredData = result.data.filter(
        (parking) => parking.user_id == userResponse.data.user_id
      );
      setData(filteredData);
    } catch (error) {
      console.log(error);
      toast((error as Error).message.toString());
    }
  }

  async function fetchDatas() {
    try {
      const result = await getParkingByID(params.parkingID!);
      setDatas(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function handleDelete() {
    try {
      const result = await deleteUser();

      toast(result.message);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      toast((error as Error).message);
    }
  }

  function handleLogout() {
    changeToken();
    toast("Logout successfully");
  }

  return (
    <Layout>
      <div className="relative h-full w-full">
        <div className="h-2/5 bg-gradient-to-b from-orange-400 to-yellow-400">
          <div className="flex flex-col px-4 py-32 space-y-5">
            <p className="text-white font-semibold text-3xl">Profile</p>
            <Card className="flex flex-col rounded-3xl drop-shadow-md">
              <CardContent className="p-4 space-y-5">
                <div className="flex">
                  <div className="flex grow">
                    <p className="font-semibold text-3xl">Account</p>
                  </div>
                  <div className="flex my-auto">
                    <Link to={"/profile/edit"}>
                      <SquarePen />
                    </Link>
                  </div>
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
            {/* {user?.role === "operator" ? ( */}
            {data.map((parking) => (
              <ManagePark
                key={parking.ID}
                id={parking.ID}
                content="Manage My Parking"
              />
            ))}
            {/* ) : null} */}
            {/* <Link to={`/parking-location/3/edit`}>
              <Card
                className="flex flex-col rounded-3xl drop-shadow-md"
                key={datas?.ID}
                id={datas?.ID}
              >
                <CardContent className="px-4 py-6 space-y-5">
                  <div className="flex">
                    <p className="font-semibold text-xl">Edit My Parking</p>
                    <SquarePen className="my-auto ms-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link> */}
          </div>
        </div>
        <div className="absolute bottom-0 p-4 w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-lg gap-2"
                    type="button"
                  >
                    Delete Account
                    <span>
                      <Trash2 />
                    </span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-400 rounded-xl"
                      onClick={() => handleDelete()}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="flex flex-col">
              <Button
                className="w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-lg gap-2"
                type="button"
                onClick={() => handleLogout()}
              >
                Logout
                <span>
                  <LogOut />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
