// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import productRoutes from "./routes/productRoutes.js";


// dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const app = express();

// app.use(express.json());

// app.use(cors());
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/admin_panel_db")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// app.use("/api/products", productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // ✅ new import


dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/admin_panel_db")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ ROUTES
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes); // <--- add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

