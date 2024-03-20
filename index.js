const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bookRouter = require("./routes/book.router");
require("dotenv").config();

app.use(cors());
// app.use(express.json());
app.use(
  express.json({
    // Limit the request body size to 10MB
    limit: "10mb",
    // Verify that the content type header matches the expected type
    strict: true,
    // Handle parsing errors
    errorHandler: (err, req, res, next) => {
      console.error("Error parsing JSON:", err);
      res.status(400).json({ error: "Invalid JSON" });
    },
  })
);

app.use(morgan("dev"));



// app.get("/ping",(req,res)=>{
//   res.json({msg:"it is working!"})
// })

app.use("/api/v1/books", bookRouter);
// app.use(bookRouter);

app.listen(
  process.env.PORT,
  console.log("Server is running on port", process.env.PORT)
);
