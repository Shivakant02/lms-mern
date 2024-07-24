import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";
const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecords: [],
};

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("payments/razorpay-key");
    return response.data;
  } catch (error) {
    toast.error("Failed to load data");
  }
});

export const purchaseCourseBundle = createAsyncThunk(
  "/purchasecourse ",
  async () => {
    try {
      const response = await axiosInstance.post("payments/subscribe");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "/payments/verify ",
  async (data) => {
    try {
      const response = await axiosInstance.post("payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.rarazorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getPaymentRecords = createAsyncThunk(
  "/payments/records ",
  async () => {
    try {
      const response = await axiosInstance.get("payments?count=100");
      toast.promise(response, {
        loading: "getting the payment records",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to get the payment records",
      });
      return (await response).data;
    } catch (error) {
      toast.error("Operation failed");
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payments/unsubscribe ",
  async () => {
    try {
      const response = await axiosInstance.get("payments?count=100");
      toast.promise(response, {
        loading: "unsubscribing the bundle",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to unsubscribe",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorPaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.error(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecords.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecords = action?.payload?.monthlySalesRecords;
      });
  },
});

export default razorPaySlice.reducer;
