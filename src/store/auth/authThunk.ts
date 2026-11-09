import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  LoginPayload,
  SignupPayload,
  LoginResponse,
} from "@/typescript/interface/auth.interface";

import { loginApi, signupApi } from "@/services/auth.api";

// LOGIN THUNK

export const loginMerchant = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginMerchant", async (payload, { rejectWithValue }) => {
  try {
    const response = await loginApi(payload);

    if (!response.success) {
      return rejectWithValue(response.message);
    }

    if (response.user.role !== "merchant") {
      return rejectWithValue(
        "You are not authorized to access the merchant portal.",
      );
    }

    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// SIGNUP THUNK

export const signupMerchant = createAsyncThunk<
  LoginResponse,
  SignupPayload,
  { rejectValue: string }
>("auth/signupMerchant", async (payload, { rejectWithValue }) => {
  try {
    const response = await signupApi(payload);

    if (!response.success) {
      return rejectWithValue(response.message);
    }

    if (response.user.role !== "merchant") {
      return rejectWithValue("Invalid merchant registration.");
    }

    return response;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed. Please try again.",
    );
  }
});
