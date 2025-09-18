import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const Verify = () => {
  const { navigate, token, setCartItems,backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/order/verify",
          {
            success,
            orderId,
          },
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
          toast.success("Payment verified successfully");
        } else {
          navigate("/cart");
          toast.error("Payment verification failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error("Payment verification failed");
      }
    }
  };
useEffect(() => {
  verifyPayment();
}, [token]);
  return <div>Verify</div>;
};
