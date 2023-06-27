const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const commentRoutes = require("./routes/comment");
const movieRoutes = require("./routes/movie");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/comments", commentRoutes);
app.use("/movies", movieRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handle any requests that don't match the ones above
app.get("*", (req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

let server: { close: (arg0: (err: any) => void) => void } | null = null;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    if (process.env.NODE_ENV !== "test") {
      server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }
  })
  .catch((error: any) => {
    console.error(error);
  });

async function start() {
  return new Promise<void>((resolve) => {
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      resolve();
    });
  });
}

async function stop() {
  return new Promise<void>((resolve, reject) => {
    if (server) {
      server.close((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      reject(new Error("Server not initialized"));
    }
  });
}

module.exports = { app, start, stop };
