import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    BestSeller: {
        type: Boolean
    },
    date: {
        type: Number,
        required: true,
    },
})
const productModel = mongoose.models.product || mongoose.model("product", productSchema); //if mongoose model is available with name product then use it otherwise create a new model with name product
export default productModel;