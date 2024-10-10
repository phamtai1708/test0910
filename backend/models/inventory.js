import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  id: Number,
  sku: String,
  description: String,
  instock: String,
});
const InventoryModel = mongoose.model("inventorys", inventorySchema);
export default InventoryModel;
