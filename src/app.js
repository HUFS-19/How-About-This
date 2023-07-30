import express from "express";
import "dotenv/config";
import db from "./db";

import productRouters from "./routers/productRouters";
const test = require("./routers/login");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.set("port", 5000);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/product", productRouters);
app.use("/login", test);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
