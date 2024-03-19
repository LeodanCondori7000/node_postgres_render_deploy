const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const bookRouter = require("./routes/book.router");

app.use("/api/v1/books", bookRouter)
// app.use(bookRouter);

app.listen(
  process.env.PORT,
  console.log("Server is running on port",process.env.PORT)
);
