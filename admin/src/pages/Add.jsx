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
  const [name, setName] = React.useState("sada");
  const [description, setdescription] = React.useState("asd");
  const [category, setcategory] = React.useState("Men");
  const [subCategory, setSubCategory] = React.useState("Topwear");
  const [price, setprice] = React.useState("123");
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
            Authorization: `Bearer ${token}`
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label
            className="text-sm font-medium text-gray-700 mb-2"
            htmlFor="image1"
          >
            <img
              className="w-20"
              alt=""
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              className="hidden"
              id="image1"
            />
          </label>
          <label
            className="text-sm font-medium text-gray-700 mb-2"
            htmlFor="image2"
          >
            <img
              className="w-20"
              alt=""
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              className="hidden"
              id="image2"
            />
          </label>
          <label
            className="text-sm font-medium text-gray-700 mb-2"
            htmlFor="image3"
          >
            <img
              className="w-20"
              alt=""
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              className="hidden"
              id="image3"
            />
          </label>
          <label
            className="text-sm font-medium text-gray-700 mb-2"
            htmlFor="image4"
          >
            <img
              className="w-20"
              alt=""
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              className="hidden"
              id="image4"
            />
          </label>
        </div>
      </div>
      <div className="w-full ">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="w-full ">
        <p className="mb-2">Product desc</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
          onChange={(e) => setdescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setcategory(e.target.value)}
            className="w-full px-3 py-2"
            name=""
            id=""
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
            name=""
            id=""
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full sm:w-[120px] px-3 py-2"
            type="number"
            placeholder="25"
            required
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes(
                (prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                // [...prev]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex  gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
    </form>
  );
};

export default Add;
