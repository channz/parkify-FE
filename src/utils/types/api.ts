export interface ApiResponse {
  code: number;
  message: string;
}

export interface ApiDataResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface ApiDataArrayResponse<T = any> {
  code: number;
  data: [T];
  message: string;
}
