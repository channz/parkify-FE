import { ApiDataResponse, ApiResponse } from "@/utils/types/api";
import { LoginSchema, ProfileUpdateType, RegisterSchema, User } from "./type";
import axiosWithConfig from "../axiosWithConfig";

export const registerUser = async (data: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post(`/users`, data);
    return response.data as ApiResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const loginUser = async (data: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/login`, data);
    return response.data as ApiDataResponse<User>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/users`);
    return response.data as ApiDataResponse<User>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateProfile = async (body: ProfileUpdateType) => {
  try {
    const response = await axiosWithConfig.put(`/users`, body);
    return response.data as ApiResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteUser = async () => {
  try {
    const response = await axiosWithConfig.delete(`/users`);
    return response.data as ApiResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
