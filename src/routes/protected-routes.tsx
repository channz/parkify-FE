import { useToken } from "@/utils/contexts/token";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = [`/login`, `/register`];
  const protectedByToken = [
    `/`,
    `/profile`,
    `/profile/edit`,
    `/select-location`,
    `/choose-slot/:parkingID`,
    `/reservations`,
    `/reservations/:reservationID`,
    `/reservations/:reservationID/checkout`,
    `/reservations/:reservationID/summary`,
    `/parking-location`,
    `/parking-location/:parkingID/edit`,
    `/parking-slot/:parkingID`,
    `/parking-slot/:parkingslotID/edit`,
    `/list-parking`,
  ];

  const operatorProtected = [
    `/parking-location`,
    `/parking-location/:parkingID/edit`,
    `/parking-slot/:parkingID`,
    `/parking-slot/:parkingslotID/edit`,
    `/list-parking`,
  ];
  const userProtected = [
    `/select-location`,
    `/choose-slot/:parkingID`,
    `/reservations`,
    `/reservations/:reservationID`,
    `/reservations/:reservationID/checkout`,
    `/reservations/:transactionID/summary`,
  ];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) {
      toast("You need to login first");
      return <Navigate to="/login" />;
    }

    if (operatorProtected.includes(pathname)) {
      if (user.role === "user") return <Navigate to="/" />;
    }

    if (userProtected.includes(pathname)) {
      if (user.role === "operator") return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
