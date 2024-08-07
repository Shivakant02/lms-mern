import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export const createAccout = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const response = axiosInstance.post("user/register", data);
    toast.promise(response, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return await response;
  } catch (error) {
    //console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "/auth/edit-profile",
  async (data) => {
    try {
      const response = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(response, {
        loading: "Wait! updating your account ",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update account",
      });
      return (await response).data;
    } catch (error) {
      //console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk("/auth/get-data", async () => {
  try {
    const response = axiosInstance.get(`user/me`);
    return (await response).data;
  } catch (error) {
    //console.log(error);
    toast.error(error?.message);
  }
});

export const login = createAsyncThunk("/auth/signin", async (data) => {
  try {
    // console.log("data", data);
    const response = axiosInstance.post("user/login", data);
    toast.promise(response, {
      loading: "Wait! authenticating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to authenticate account",
    });
    return await response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const response = axiosInstance.get("user/logout");

    toast.promise(response, {
      loading: "Wait! logging out  your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout your account",
    });
    return await response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        //console.log(action);

        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.user?.role);

        state.isLoggedIn = true;
        state.role = action?.payload?.data?.user?.role;
        state.data = action?.payload?.data;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        // console.log(action.payload);
        if (!action?.payload?.user) return;

        localStorage.setItem("data", JSON.stringify(action?.payload));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);

        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload;
      });
  },
});

export default authSlice.reducer;
