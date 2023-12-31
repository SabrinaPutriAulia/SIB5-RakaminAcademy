const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("tiny"));

require("dotenv").config();
app.use(express.json());

const path = require("path");

// router
const { movieRouter } = require("./src/routes/index");
const { userRouter } = require("./src/routes/index");
app.use("/", movieRouter);
app.use("/", userRouter);

// server static file
app.use(
  "/movies/upload",
  express.static(path.join(__dirname, "public/upload"))
);

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
