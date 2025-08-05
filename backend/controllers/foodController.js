import foodModel from "../models/FoodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.status(200).json({
      success: true,
      message: "Food added ",
      data: food,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

//add food list
const listFood = async (req, res) => {
  try {
    const food_list = await foodModel.find({});
    res.status(200).json({ success: true, data: food_list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "deleted item successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error" });
  }
};
export { addFood, listFood, removeFood };
