const express = require("express");
const app = express();
const taskRoutes = require("./routes/task-routes");
const connectDB = require("./db/connect");
const dotenv = require("dotenv").config();
require("express-async-errors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/error");
//json body-parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hii");
});

//routes
app.use("/api/v1", taskRoutes);

//middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log("server is running on port:3000"));
  } catch (error) {
    console.log(error);
  }
};

start();
