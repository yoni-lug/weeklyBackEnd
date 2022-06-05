import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productHeader: String,
    productDescription: String,
    vendor: String,
    price: String,
    units: String,
    orderQnt: Number,
    orderWeek: Number
   });
//const Order=mongoose.model ("order",orderSchema);
const Order = mongoose.model ("order",orderSchema);
export default Order
