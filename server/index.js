const path = require("path");
const express = require("express");
const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8001,
    mediaroot: "./media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg: "/usr/bin/ffmpeg",
    tasks: [
      {
        app: "live",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
      },
    ],
  },
};

var nms = new NodeMediaServer(config);
nms.run();

const app = express();
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  req.method === "OPTIONS" ? res.sendStatus(200) : next();
});

app.use(express.static(path.join(__dirname, "media")));
app.listen(8000);
