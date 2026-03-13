import express from "express";
import { createBareServer } from "@mercuryworkshop/scramjet";

const app = express();
const port = 8080;

const bare = createBareServer("/bare/");

app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log("Proxy running on port " + port);
});

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  }
});
