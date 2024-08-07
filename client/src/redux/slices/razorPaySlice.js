import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";
const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
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
  "/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("/payments/subscribe");

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
        razorpay_subscription_id: data.razorpay_subscription_id,
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
      // toast.promise(response, {
      //   loading: "getting the payment records",
      //   success: "all payments",
      //   error: "failed to get the payment records",
      // });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Operation failed");
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payments/unsubscribe ",
  async () => {
    try {
      const response = await axiosInstance.post("payments/unsubscribe");
      toast.promise(response, {
        loading: "unsubscribing the bundle",
        success: (data) => {
          return data?.payload?.message;
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
    builder.addCase(getRazorPayId.fulfilled, (state, action) => {
      state.key = action?.payload?.key;
    });
    builder.addCase(purchaseCourseBundle.fulfilled, (state, action) => {
      state.subscription_id = action?.payload?.subscription_id;
    });
    builder.addCase(verifyUserPayment.fulfilled, (state, action) => {
      toast.success(action?.payload?.message);
      state.isPaymentVerified = action?.payload?.success;
    });
    builder.addCase(verifyUserPayment.rejected, (state, action) => {
      toast.error(action?.payload?.message);
      state.isPaymentVerified = action?.payload?.success;
    });
    builder.addCase(getPaymentRecords.fulfilled, (state, action) => {
      state.allPayments = action?.payload?.allPayments;
      state.finalMonths = action?.payload?.finalMonths;
      state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
    });
  },
});

export default razorPaySlice.reducer;
