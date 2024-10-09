const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/blog", (req, res) => {
    res.send("Welcome to my blog");
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ product });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Update a product
app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res
                .status(404)
                .json({ message: `Cannot find a product with ID ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res
                .status(404)
                .json({ message: `Cannot find a product with id ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose
    .connect(
        "mongodb+srv://admin:admin@restfulcrudapi.6rhdv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=restfulcrudapi"
    )
    .then(() => {
        console.log("Connected to database");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log("Error: ", err);
    });
