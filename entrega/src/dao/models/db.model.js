import mongoose from "mongoose";

const productCollection = "products"
const messageCollection = "messages";


const resultadoSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: Number,
        unique: true
    },
    stock: Number
});

const messageSchema = new mongoose.Schema({
  user:String,
  message: [String],
  createdAt: { type: Date, default: Date.now }
});


const productModel = mongoose.model(productCollection, resultadoSchema)
const messageModel = mongoose.model(messageCollection, messageSchema);



export  { productModel, messageModel };