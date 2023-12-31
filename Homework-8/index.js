const express = require("express");
const router = require("./route");
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/dvdrental", router);

app.set("view engine", "ejs");
