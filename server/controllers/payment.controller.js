import User from "../models/user.model.js";
import crypto from "crypto";
import { razorpay } from "../server.js";
import AppError from "../utils/appError.js";
import Payment from "../models/payment.model.js";

export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay api key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized,please login ", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin can not purchase a subscription!", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    // console.log(user);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    // Finding the user
    const user = await User.findById(id);

    // Getting the subscription ID from the user object
    const subscriptionId = user.subscription.id;

    // Generating a signature with SHA256 for verification purposes
    // Here the subscriptionId should be the one which we saved in the DB
    // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
    // At the end convert it to Hex value
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    // Check if generated signature and signature received from the frontend is the same or not
    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again.", 400));
    }

    // If they match create payment and store it in the DB
    await Payment.create({
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    });

    // Update the user subscription status to active (This will be created before this)
    user.subscription.status = "active";

    // Save the user in the DB with any changes
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin can not cancel the subscription", 400));
    }

    const subscriptionId = user.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const subscription = await razorpay.subscriptions.all({
      count: count || 10,
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      payments: subscription,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
