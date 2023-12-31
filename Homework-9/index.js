const express = require("express");
const morgan = require("morgan");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use(morgan("tiny"));

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const option = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Express API with Swagger",
      version: "2.2.16",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*"],
};

const specs = swaggerJsdoc(option);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const movies = require("./routes/movies");
const users = require("./routes/users");

app.use("/movies", movies);
app.use("/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
