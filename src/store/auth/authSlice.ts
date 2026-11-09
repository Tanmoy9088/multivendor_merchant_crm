import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "@/typescript/interface/auth.interface";

import { loginMerchant, signupMerchant } from "./authThunk";

const initialState: AuthState = {
  isPending: false,
  isActive: false,
  isBlock: false,
  pending: null,
  isError: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.isError = false;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.isActive = false;
      state.isBlock = false;
      state.pending = null;
      state.isError = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN PENDING
      .addCase(loginMerchant.pending, (state) => {
        state.pending = "login";
        state.isError = false;
        state.error = null;
      })

      // LOGIN SUCCESS
      .addCase(loginMerchant.fulfilled, (state, action) => {
        state.pending = null;
        state.user = action.payload.user;
        state.isActive = true;
        state.isBlock = false;
        state.isError = false;
        state.error = null;
      })

      // LOGIN ERROR
      .addCase(loginMerchant.rejected, (state, action) => {
        state.pending = null;
        state.isError = true;
        state.error = action.payload || "Login failed";
      })

      // SIGNUP PENDING
      .addCase(signupMerchant.pending, (state) => {
        state.pending = "signup";
        state.isError = false;
        state.error = null;
      })

      // SIGNUP SUCCESS
      .addCase(signupMerchant.fulfilled, (state, action) => {
        state.pending = null;
        state.user = action.payload.user;
        state.isActive = true;
        state.isBlock = false;
        state.isError = false;
        state.error = null;
      })

      // SIGNUP ERROR
      .addCase(signupMerchant.rejected, (state, action) => {
        state.pending = null;
        state.isError = true;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;

export default authSlice.reducer;
