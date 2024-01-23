const express = require("express");
const categoryRoutes = require("./routes/categories.router.js");
const productRoutes = require("./routes/products.router.js");
const userRoutes = require("./routes/users.router.js");
const cors = require ("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000" 
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['*'])
    res.setHeader('Access-Control-Allow-Headers', ['https://127.0.0.1:3000'])
    next()
})

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.get("/*", (req, res) => res.status(404).send("Invalid Route!") );

app.listen(process.env.PORT, () => console.log(`Listening at port ${process.env.PORT}...`));