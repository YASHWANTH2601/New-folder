import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
// connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => res.send("Hello World!"));
const startServer = async () => {
  try {
    await connectDB();
    await app.listen(port, () => {
      console.log(`Server Started on http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
// mongodb+srv://yashwanth2601:yashwanth2601@cluster0.eezdx.mongodb.net/?
