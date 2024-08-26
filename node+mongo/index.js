const express = require("express");
const exphbs = require("express-handlebars");

const conn = require("./db/conn");
const productRouter = require("./routers/productRouter");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.use(express.json());

app.use("/products", productRouter);

app.listen(3000);