import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Add a new product
const addProduct = async (req, res) => {
    try {
        console.log("=== PRODUCT ADD REQUEST RECEIVED ===");
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);
        
        const { name, description, category, subCategory, sizes, price, bestseller } = req.body;
        const image1 = req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files.image4 ? req.files.image4[0] : null;

        const images = [image1, image2, image3, image4].filter(item => item !== undefined && item !== null);
        console.log("Extracted data:", { name, description, category, subCategory, sizes, bestseller, price });
        console.log("Images found:", images.length);
        console.log("=== UPLOADING TO CLOUDINARY ===");
        let imageUrls = [];
        if (images.length > 0) {
            imageUrls = await Promise.all(images.map(async (image, index) => {
                console.log(`Uploading image ${index + 1}:`, image.originalname);
                
                // For memory storage, use image.buffer instead of image.path
                const uploadResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) {
                                console.error(`Error uploading image ${index + 1}:`, error);
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    ).end(image.buffer);
                });
                
                console.log(`Image ${index + 1} uploaded:`, uploadResult.secure_url);
                return uploadResult.secure_url;
            }));
        }

        console.log("=== CREATING PRODUCT DATA ===");
        const productData = {
            name,
            description,
            category,
            subCategory,
            sizes: JSON.parse(sizes), // Parse the sizes JSON string from frontend
            date: Date.now(), // Use current timestamp
            BestSeller: bestseller === 'true' || bestseller === true, // Boolean check
            image: imageUrls,
            price: Number(price) // Ensure price is a number
        };
        
        console.log("Product data to save:", productData);


        console.log("=== SAVING TO DATABASE ===");
        const newProduct = new productModel(productData);

        const savedProduct = await newProduct.save();
        console.log("=== PRODUCT SAVED SUCCESSFULLY ===");
        console.log("Product ID:", savedProduct._id);

        res.status(201).json({ success: true, message: "Product added successfully", product: savedProduct });
    } catch (error) {
        console.error("=== ERROR IN PRODUCT ADD ===");
        console.error("Error type:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// List all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get single product by ID
const singleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete product by ID
const removeProduct = async (req, res) => {
    try {
        console.log("=== REMOVING PRODUCT ===");
        console.log("Product ID:", req.params.id);
        const deleted = await productModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, message: "Product removed successfully", product: deleted });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export {
    addProduct,
    listProducts,
    singleProduct,
    removeProduct
};
