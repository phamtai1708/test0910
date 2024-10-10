import express from "express";
import mongoose from "mongoose";
import UserModel from "./models/user.js";
import InventoryModel from "./models/inventory.js";
import OrderModel from "./models/order.js";
import { validateToken } from ".//token.js";
import jwt from "jsonwebtoken";
import { SecretKey } from "./token.js";

const app = express();

app.use(express.json());

await mongoose.connect(
  "mongodb+srv://phamtai1708:hanhhanh1505@web82.ywklp.mongodb.net/test0910?retryWrites=true&w=majority&appName=WEB82"
);

app.get("/users", validateToken, async (req, res) => {
  try {
    const listUser = await UserModel.find({});
    res.status(200).send({
      message: "Successful!",
      data: listUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: null,
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) throw new Error("Username is required");
    if (!password) throw new Error("Password is required");

    const crrUser = await UserModel.findOne({ username: username });

    if (!crrUser) throw new Error("User not found");

    if (crrUser.password !== password) throw new Error("Password is invalid");

    const user = {
      userId: crrUser.username,
      email: crrUser.password,
    };
    const accessToken = jwt.sign(user, SecretKey, {
      expiresIn: 60 * 5,
    });

    res.status(200).send({
      message: "Successful!",
      data: crrUser,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: null,
    });
  }
});

app.get("/inventorys", validateToken, async (req, res) => {
  try {
    const listInventory = await InventoryModel.find({});
    res.status(200).send({
      message: "Successful!",
      data: listInventory,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: null,
    });
  }
});

//API lấy sản phẩm có số lượng dưới 100
app.get("/inventorys/instock", validateToken, async (req, res) => {
  try {
    const listInventory = await InventoryModel.find();
    const filterIn = listInventory.filter((item) => item.instock < 100);
    res.status(200).send({
      message: "Successful!",
      data: filterIn,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: null,
    });
  }
});

app.get("/orders", validateToken, async (req, res) => {
  try {
    const listOrder = await OrderModel.find({});
    const newListOrder = await Promise.all(
      listOrder.map(async (order) => {
        const inventoryItem = await InventoryModel.findOne({ sku: order.item });
        return {
          ...order.toObject(),
          description: inventoryItem.description,
        };
      })
    );

    res.status(200).send({
      message: "Successful!",
      data: newListOrder,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: null,
    });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
