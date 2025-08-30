import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './src/routes/userRoute.js'
import connectDB from './src/config/mongodb.js'
import connectCloudinary from './src/config/cloudinary.js'
import productRouter from './src/routes/productRoute.js'

const app = express()
const port = process.env.PORT || 4000

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
app.listen(port, () => console.log("Server started on port", port))
