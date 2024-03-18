import mongoose from "mongoose";

const productCollection = "products"

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

const productModel = mongoose.model(productCollection, resultadoSchema)

export  { productModel };