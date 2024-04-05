import { ApiDataArrayResponse, ApiResponse } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { ParkingSlot, SlotSchema } from "./type";

export const addNewParkingSlot = async (data: SlotSchema) => {
  try {
    const response = await axiosWithConfig.post(`/parkingslot`, data);
    return response.data as ApiResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getAllParkingSlot = async () => {
  try {
    const response = await axiosWithConfig.get(`/parkingslot`);
    return response.data as ApiDataArrayResponse<ParkingSlot>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editParkingSlot = async (
  parkingslotID: string,
  body: SlotSchema
) => {
  try {
    const response = await axiosWithConfig.put(
      `/parkingslot/${parkingslotID}`,
      body
    );

    return response.data as ApiResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteParkingSlot = async (parkingslotID: string) => {
  try {
    const response = await axiosWithConfig.delete(
      `/parkingslot/${parkingslotID}`
    );

    return response.data as ApiResponse;
  } catch (error: any) {}
};
