
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env file from the backend directory
dotenv.config({ path: path.join(__dirname, '.env') })
import fs from "fs";

const envPath = path.join(__dirname, ".env");
console.log("Looking for .env at:", envPath);
console.log("File exists?", fs.existsSync(envPath));
console.log("Raw .env content:\n", fs.readFileSync(envPath, "utf-8"));
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);

import userRouter from './src/routes/userRoute.js'
import connectDB from './src/config/mongodb.js'
import connectCloudinary from './src/config/cloudinary.js'
import productRouter from './src/routes/productRoute.js'
import cartRouter from './src/routes/cartRoute.js'
import orderRouter from './src/routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 5000

// Connect DB + Cloudinary
connectDB()
connectCloudinary()

// ✅ CORS middleware (must be before routes)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'token']
}))

// ✅ Handle preflight requests globally
app.options('*', cors())

// Middleware to parse JSON
app.use(express.json())

// Routers
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


// Test routes
app.get('/', (req, res) => {
  res.send("API working")
})
app.get('/test', (req, res) => {
  res.json({ message: 'CORS test successful' })
})

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: 'Internal server error' });
})

// Start server
app.listen(port, () => console.log("Serer started on port", port))
