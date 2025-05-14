require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", require("./api/auth"));
app.use("/api/spaces", require("./api/spaces"));
app.use("/api/reservations", require("./api/reservations"));
app.use("/api/admin", require("./api/admin"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening in ${PORT}`))