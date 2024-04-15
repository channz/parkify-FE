import {
  ApiDataArrayResponse,
  ApiDataResponse,
  ApiResponse,
} from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Reservation, ReservationSchema } from "./type";

export const addReservation = async (data: ReservationSchema) => {
  try {
    const response = await axiosWithConfig.post(`/reservation`, data);
    return response.data as ApiResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getReservation = async () => {
  try {
    const response = await axiosWithConfig.get(`/reservation`);
    return response.data as ApiDataArrayResponse<Reservation>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getReservationByID = async (
  reservationID: string,
  
  ) => {
  try {
    const response = await axiosWithConfig.get(
      `/reservation/${reservationID}`,

      );
    return response.data as ApiDataResponse<Reservation>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

// export const getCheckout = async (reservationID: string) => {
//   try {
//     const response = await axiosWithConfig.get(`/checkout/${reservationID}`);
//     return response.data as ApiDataResponse<Reservation>;
//   } catch (error: any) {
//     throw Error(error.response.data.message);
//   }
// };

