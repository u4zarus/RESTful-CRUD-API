const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
