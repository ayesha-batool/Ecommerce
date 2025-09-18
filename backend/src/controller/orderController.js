import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const currency = "usd";
const delivery_fee = 10;

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const order = new orderModel(orderData);
    await order.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res
      .status(200)
      .json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const order = new orderModel(orderData);
    await order.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
    });
    res.status(200).json({
      success: true,
      session_url: session.url,
      message: "Order placed successfully",
      order,
      session,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const verifyStripe = async (req, res) => {
  try {
    const { success, orderId, userId } = req.body;
    if (success) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res
        .status(200)
        .json({ success: true, message: "Order placed successfully" });
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res
        .status(200)
        .json({ success: false, message: "Order failed" });
    }
  } catch (error) {
    console.error("Error verifying stripe:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error getting all orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error getting user orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
