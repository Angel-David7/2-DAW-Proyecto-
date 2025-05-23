const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
console.log("Starting GreenWork backend…");
console.log("JWT_SECRET loaded?", !!process.env.JWT_SECRET);

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { swaggerOptions } = require("./swagger");

const app = express();

// 1. CORS (must be first)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Note: cors middleware automatically handles preflight OPTIONS requests

// 2. Security headers via Helmet
app.use(helmet());

// 3. JSON parser
app.use(express.json());

// 4. Swagger documentation endpoint (temporarily disabled due to path-to-regexp issue)
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

// 5. Mount routers with debug logs with debug logs
[
  ["/api/auth", "./routes/auth"],
  ["/api/spaces", "./routes/spaces"],
  ["/api/reservations", "./routes/reservations"],
  ["/api/notifications", "./routes/notifications"],
  ["/api/admin", "./routes/admin"],
  ["/api/admin", "./routes/adminUsers"],
].forEach(([routePath, modulePath]) => {
  console.log(`Mounting ${routePath} from ${modulePath}`);
  try {
    app.use(routePath, require(modulePath));
  } catch (err) {
    console.error(`Error mounting ${routePath} (${modulePath}):`, err.message);
    process.exit(1);
  }
});

// 6. Health check
app.get("/api/healthz", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 7. Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message });
});

// 8. Start HTTP server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
