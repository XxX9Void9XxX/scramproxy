import express from "express";
import http from "http";
import { createBareServer } from "bare-server-node";

const app = express();
const port = process.env.PORT || 8080;

// Create the bare server
const bare = createBareServer("/bare/");

// Serve static files
app.use(express.static("public"));

const server = http.createServer(app);

// Route HTTP requests
server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  }
});

// Handle websocket upgrades (needed for some proxy traffic)
server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  }
});

// Start server
server.listen(port, () => {
  console.log("Server running on port " + port);
});
