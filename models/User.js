import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const likedItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
}, { _id: false });

const userSchema =  new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, unique: true, required: true },
    password: {type: String},
    cart: { type: [cartItemSchema], default: [] },
    liked: { type: [likedItemSchema], default: [] },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;