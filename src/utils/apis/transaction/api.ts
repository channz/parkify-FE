import { ApiDataResponse } from "@/utils/types/api";
import { Transaction, TransactionSchema } from "./type";
import axiosWithConfig from "../axiosWithConfig";

export const addTransaction = async (data: TransactionSchema) => {
  try {
    const response = await axiosWithConfig.post(`/transaction`, data);
    return response.data as ApiDataResponse<Transaction>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getTransaction = async () => {
  try {
    const response = await axiosWithConfig.get(`/transaction`);
    return response.data as ApiDataResponse<Transaction>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
