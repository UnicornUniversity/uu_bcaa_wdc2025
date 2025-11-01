const express = require("express");
const app = express();
const port = 8000;

const categoryController = require("./controller/category-controller");
const transactionController = require("./controller/transaction-controller");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use("/category", categoryController);
app.use("/transaction", transactionController);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
