import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import config from "./config/config.js";

import { ROLE_ADMIN } from "./constants/roles.js";
import auth from "./middlewares/auth.js";
import authRoutes from "./routes/auth.route.js";
import bodyParser from "body-parser";
import checkRole from "./middlewares/checkRole.js";
import connectDB from "./config/database.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import logger from "./middlewares/logger.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";

//aaba yo aap le sabai kaam garnu milxa express ma,
// server banaune, route haru define garne, middleware haru use garne, etc.
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req, res) => {
  res.send({
    name: config.name,
    version: config.version,
  });
});

// Configs
connectDB();
connectCloudinary();

app.use(bodyParser.json());

app.use(logger);

app.set("view engine", "hbs");

// Routes
app.use(process.env.VERSION + "/products", productRoutes);

app.use(
  process.env.VERSION + "/users",
  auth,
  upload.single("image"),
  userRoutes,
);

app.use(process.env.VERSION + "/auth", authRoutes);
app.use(process.env.VERSION + "/orders", auth, orderRoutes);

//Middleware for handling errors
app.use(errorMiddleware);

// Server
// app.listen(config.port, () => {
//   console.log(`Server is running on port ${config.port}....`);
// });

export default app;
