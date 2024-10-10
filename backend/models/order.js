import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  item: String,
  price: Number,
  quantity: Number,
});

const OrderModel = mongoose.model("orders", orderSchema);
export default OrderModel;
