// File: api/server.js
const express = require("express");
const fileRoutes = require("../routes/fileRoutes.js");
const path = require("path");
const serverless = require("serverless-http"); // WAJIB

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/", fileRoutes);

// Error handling routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../public", "404.html"));
});

app.use((err, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, "../public", "500.html"));
});

// Security headers
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'none'; object-src 'none';"
  );
  next();
});

module.exports = app;
module.exports.handler = serverless(app);
