import axios from "axios";
import { toast } from "react-toastify";
import React, { useContext, useState } from "react";
import { Title } from "../components/Title";
import { CartTotal } from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

export const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    getCartAmount,
    setCartItems,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const itemInfo = products.find((item) => {
              console.log(
                "Comparing:",
                item._id,
                "===",
                items,
                "Result:",
                item._id === items
              );
              return item._id === items;
            });
            console.log("itemInfo", itemInfo);
            if (itemInfo) {
              const orderItem = structuredClone(itemInfo);
              orderItem.size = size;
              orderItem.quantity = cartItems[items][size];
              orderItem.price = orderItem.price * cartItems[items][size];
              orderItems.push(orderItem);
            } else {
              console.warn(
                `Product with id ${items} not found in products array`
              );
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "stripe":
          console.log("strip", orderData);
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("responsestripe", responseStripe.data);
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.href = session_url;
          } else {
            toast.error("Failed to place order");
          }
          break;
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("response", response.data);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order placed successfully");
          } else {
            toast.error("Failed to place order");
          }
          break;
      }

      console.log("orderData", orderData);
      console.log("orderItems", orderItems);
      console.log("formData", formData);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            value={formData.firstName}
            name="firstName"
            onChange={onChangeHandler}
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            value={formData.lastName}
            name="lastName"
            onChange={onChangeHandler}
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          value={formData.email}
          name="email"
          onChange={onChangeHandler}
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          value={formData.street}
          name="street"
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            value={formData.city}
            name="city"
            onChange={onChangeHandler}
            type="text"
            placeholder="City name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            value={formData.state}
            name="state"
            onChange={onChangeHandler}
            type="text"
            placeholder="State name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            value={formData.zipcode}
            name="zipcode"
            onChange={onChangeHandler}
            type="text"
            placeholder="Zip code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            value={formData.country}
            name="country"
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          value={formData.phone}
          name="phone"
          onChange={onChangeHandler}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className={`text-gray-500 text-sm font-medium mx-4`}>
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              // onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
