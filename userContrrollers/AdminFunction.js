
const Product = require("../Module/product_Module");
const asyncHandler = require("express-async-handler");
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      actualPrice: req.body.actualPrice,
      discountPrice: req.body.discountPrice,
      discountPercentage: req.body.discountPercentage,
      image: req.file.buffer,
    });
    console.log(newProduct);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    console.log("hi");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("by");
  }
};

const getProduct= async (req,res)=>{
  try {
  const products = await Product.find(); // Retrieve all products from the database
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
}
module.exports= {addProduct,getProduct}
