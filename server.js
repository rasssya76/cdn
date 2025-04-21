const express = require("express");
require("dotenv").config();
const fileRoutes = require("./routes/fileRoutes.js");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Security headers duluan
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'none'; object-src 'none';"
  );
  next();
});

// Serve static
app.use(express.static(path.join(__dirname, "public")));

// Pakai route lo
app.use("/", fileRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
