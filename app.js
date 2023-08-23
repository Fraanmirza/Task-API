const express = require("express");
const app = express();
const taskRoutes = require("./routes/task-routes");
const connectDB = require("./db/connect");
require("dotenv").config();
require("express-async-errors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/error");
const authRoutes = require("./routes/auth-routes");
const authentication = require("./middlewares/routes-authentication");

//Extra security packages
const helmet = require("helmet");
const cors = require("cors");
const { xss } = require("express-xss-sanitizer");
const expressLimiter = require("express-rate-limit");
//json body-parser
app.use(express.json());

// extra packages
app.set("trust proxy", 1);
app.use(
  expressLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Task API's");
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", authentication, taskRoutes);

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
