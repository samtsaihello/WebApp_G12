import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import userNameRoutes from "./routes/userName.js";
import historyRoutes from "./routes/history.js";
// We use a custom env.ts file to make sure that all the environment variables are in correct types.
import { env } from "./utils/env.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/userName", userNameRoutes);
app.use("/api/history", historyRoutes);

app.get("/heartbeat", (_, res) => {
  return res.send({ message: "Hello World!" });
});

// Connect to MongoDB
mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    app.listen(env.PORT, () =>
      console.log(`Server running on port http://localhost:${env.PORT}`),
    );
    // If the connection is successful, we will see this message in the console.
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    // Catch any errors that occurred while starting the server
    console.log("Failed to connect to MongoDB");
    console.log(error.message);
  });
