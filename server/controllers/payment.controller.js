import User from "../models/user.model.js";
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
      return next(new AppError("Asmin can not purchase a subscription!", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login", 400));
    }

    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`);

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again", 400));
    }

    //record payment details in payment collection

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    //update user records with subscription status

    user.subscription.status = "active";
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
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
