import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const user = await userModel.findById(userId);
    let cartData = await user.cartData;
    if (cartData[itemId] && cartData[itemId][size]) {
      // Item and size exist - increment quantity
      cartData[itemId][size] += 1;
    } else if (cartData[itemId]) {
      // Item exists but size doesn't - add new size
      cartData[itemId][size] = 1;
    } else {
      // Item doesn't exist - create new item with size
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    console.log("cartdata after update", cartData);
    await userModel.findByIdAndUpdate(userId, { cartData });
    console.log("cartdata after update - cart updated successfully");
   
    return res
      .status(200)
      .json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const user = await userModel.findById(userId);
    let cartData = await user.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    let cartData = await user.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error getting user cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
 
export { addToCart, updateCart, getUserCart };
