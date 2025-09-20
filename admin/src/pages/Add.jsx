import React from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const [image1, setImage1] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [image3, setImage3] = React.useState(null);
  const [image4, setImage4] = React.useState(null);
  const [name, setName] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [category, setcategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [price, setprice] = React.useState("");
  const [sizes, setSizes] = React.useState([]);
  const [bestseller, setBestseller] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      image1,
      image2,
      image3,
      image4,
      name,
      description,
      category,
      subCategory,
      price,
      sizes,
      bestseller,
    };

    const formData = new FormData();
    if (image1) {
      console.log("Adding image1:", image1.name, image1.type, image1.size);
      formData.append("image1", image1);
    }
    if (image2) {
      console.log("Adding image2:", image2.name, image2.type, image2.size);
      formData.append("image2", image2);
    }
    if (image3) {
      console.log("Adding image3:", image3.name, image3.type, image3.size);
      formData.append("image3", image3);
    }
    if (image4) {
      console.log("Adding image4:", image4.name, image4.type, image4.size);
      formData.append("image4", image4);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestseller", bestseller);

    try {
      const res = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("Product added successfully");
      } else {
        console.log("Product not added:", res.data);
      }
    } catch (err) {
      console.error("Full error object:", err);
    }
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setName("");
    setdescription("");
    setcategory("");
    setSubCategory("");
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-pink-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Add New Product
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-start gap-6"
          >
            <div className="w-full">
              <p className="mb-4 text-lg font-semibold text-gray-700">
                Upload Product Images
              </p>
              <div className="flex flex-wrap gap-4">
                <label
                  className="relative cursor-pointer group"
                  htmlFor="image1"
                >
                  <div className="w-24 h-24 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center bg-orange-50 group-hover:bg-orange-100 transition-colors">
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      alt="Upload Image 1"
                      src={
                        !image1
                          ? assets.upload_area
                          : URL.createObjectURL(image1)
                      }
                    />
                  </div>
                  <input
                    onChange={(e) => setImage1(e.target.files[0])}
                    type="file"
                    className="hidden"
                    id="image1"
                    accept="image/*"
                  />
                </label>
                <label
                  className="relative cursor-pointer group"
                  htmlFor="image2"
                >
                  <div className="w-24 h-24 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center bg-orange-50 group-hover:bg-orange-100 transition-colors">
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      alt="Upload Image 2"
                      src={
                        !image2
                          ? assets.upload_area
                          : URL.createObjectURL(image2)
                      }
                    />
                  </div>
                  <input
                    onChange={(e) => setImage2(e.target.files[0])}
                    type="file"
                    className="hidden"
                    id="image2"
                    accept="image/*"
                  />
                </label>
                <label
                  className="relative cursor-pointer group"
                  htmlFor="image3"
                >
                  <div className="w-24 h-24 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center bg-orange-50 group-hover:bg-orange-100 transition-colors">
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      alt="Upload Image 3"
                      src={
                        !image3
                          ? assets.upload_area
                          : URL.createObjectURL(image3)
                      }
                    />
                  </div>
                  <input
                    onChange={(e) => setImage3(e.target.files[0])}
                    type="file"
                    className="hidden"
                    id="image3"
                    accept="image/*"
                  />
                </label>
                <label
                  className="relative cursor-pointer group"
                  htmlFor="image4"
                >
                  <div className="w-24 h-24 border-2 border-dashed border-orange-300 rounded-xl flex items-center justify-center bg-orange-50 group-hover:bg-orange-100 transition-colors">
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      alt="Upload Image 4"
                      src={
                        !image4
                          ? assets.upload_area
                          : URL.createObjectURL(image4)
                      }
                    />
                  </div>
                  <input
                    onChange={(e) => setImage4(e.target.files[0])}
                    type="file"
                    className="hidden"
                    id="image4"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                type="text"
                placeholder="Enter product name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="w-full">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                rows="4"
                placeholder="Describe your product..."
                required
                onChange={(e) => setdescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  onChange={(e) => setcategory(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  value={category}
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Sub Category
                </label>
                <select
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  value={subCategory}
                >
                  <option value="">Select Sub Category</option>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  type="number"
                  placeholder="0.00"
                  required
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-3">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div
                    key={size}
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((item) => item !== size)
                          : [...prev, size]
                      )
                    }
                    className="cursor-pointer"
                  >
                    <span
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        sizes.includes(size)
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {size}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
              <input
                onChange={() => setBestseller((prev) => !prev)}
                checked={bestseller}
                type="checkbox"
                id="bestseller"
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
              <label
                className="cursor-pointer text-lg font-medium text-gray-700"
                htmlFor="bestseller"
              >
                Mark as Best Seller
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
