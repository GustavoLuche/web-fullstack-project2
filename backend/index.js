// backend/index.js
const express = require("express");
const app = express();
const port = 3001;

// Define a route for the root URL ("/") that sends a simple message
app.get("/", (req, res) => {
  res.end("Express server running successfully!");
});

// Start the server and listen on the specified port
module.exports = app;
