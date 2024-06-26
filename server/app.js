import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import morgan from "morgan";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import miscRoutes from "./routes/misc.routes.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URI],
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1", miscRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS! 404 page not found");
});

app.use(errorMiddleware);

export default app;
