import express from "express";
import http from "http";
import { createBareServer } from "@mercuryworkshop/bare-server-node";

const app = express();
const port = process.env.PORT || 8080;

const bare = createBareServer("/bare/");

app.use(express.static("public"));

const server = http.createServer(app);

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  }
});

server.listen(port, () => {
  console.log("Server running on port " + port);
});
