import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {},
    },
},{minimize:false})
const userModel = mongoose.models.user || mongoose.model("user", userSchema); //if mongoose model is available with name product then use it otherwise create a new model with name product
export default userModel;