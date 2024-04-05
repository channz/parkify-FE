import {
  ApiDataArrayResponse,
  ApiDataResponse,
  ApiResponse,
} from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Parking, ParkingSchema } from "./type";
import { checkProperty, valueFormatData } from "@/utils/formatter";

export const addNewParking = async (body: ParkingSchema) => {
  try {
    const formData = new FormData();

    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.post(`/parking`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as ApiResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getAllParking = async () => {
  try {
    const response = await axiosWithConfig.get(`/parking`);
    return response.data as ApiDataArrayResponse<Parking>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getParkingByID = async (parkingID: string) => {
  try {
    const response = await axiosWithConfig.get(`/parking/${parkingID}`);
    return response.data as ApiDataResponse<Parking>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editParking = async (parkingID: string, body: ParkingSchema) => {
  try {
    const formData = new FormData();

    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(
      `/parking/${parkingID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data as ApiResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
