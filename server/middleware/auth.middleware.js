import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, _res, next) => {
  // extracting token from the cookies
  const { token } = req.cookies;

  // If no token send unauthorized message
  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // If no decode send the message unauthorized
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
  req.user = decoded;

  // Do not forget to call the next other wise the flow of execution will not be passed further
  next();
};

const authorizedRoles =
  (...roles) =>
  (req, res, next) => {
    const currentRole = req.user.role;

    if (!roles.includes(currentRole)) {
      return next(
        new AppError("You do not have permission to access this route", 403)
      );
    }

    next();
  };

const authorizedSubscriber = async (req, res, next) => {
  const subscriptionStatus = req.user.subscription.status;
  const currentRole = req.user.role;

  if (currentRole !== "ADMIN" && subscriptionStatus !== "active") {
    return next(
      new AppError("Please subscribe to the course to access this route", 400)
    );
  }

  next();
};

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
