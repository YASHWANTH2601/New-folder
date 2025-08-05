import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://yashwanth2601:yashwanth2601@cluster0.eezdx.mongodb.net/food-del"
    )
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
};
