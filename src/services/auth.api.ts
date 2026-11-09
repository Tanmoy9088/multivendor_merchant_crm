import api from "./api";

import {
  LoginPayload,
  SignupPayload,
  LoginResponse,
} from "@/typescript/interface/auth.interface";

// LOGIN API

export const loginApi = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/merchant/login", payload);

  return data;
};

// SIGNUP API

export const signupApi = async (
  payload: SignupPayload,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/merchant/register", payload);

  return data;
};
