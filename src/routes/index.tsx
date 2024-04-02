import Homepage from "@/pages";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ChooseSlot from "@/pages/parking/choose-slot";
import SelectLocation from "@/pages/parking/select-location";
import SelectPayment from "@/pages/payment/select-payment";
import Profile from "@/pages/profile";
import EditProfile from "@/pages/profile/edit-profile";
import QRPage from "@/pages/qr";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./protected-routes";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/select-location",
        element: <SelectLocation />,
      },
      {
        path: "/chooseslot",
        element: <ChooseSlot />,
      },
      {
        path: "/qrpage",
        element: <QRPage />,
      },
      {
        path: "/payment",
        element: <SelectPayment />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;