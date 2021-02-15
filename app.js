const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/errorHandler");

app.use(cors());
app.options('*', cors());

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads') )
app.use(errorHandler)


const api = process.env.API_URL;

//Routes
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders")
const usersRoutes = require("./routes/users")
const categoriesRoutes = require("./routes/categories");



app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//database config
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database"
  })
.then(() => {
    console.log("Database Connection is Ready.....")
})
.catch((err) => {
    console.log(err)
})


//server
app.listen(4000, () => {
  console.log("server is running now en http://localhost:4000");
});
