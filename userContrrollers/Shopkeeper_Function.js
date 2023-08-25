const Store = require("../Module/store_Module");
const Product = require("../Module/product_Module");
const registerStore = async (req, res) => {
  const email=req.body.Email;
  const userExists = await Store.findOne({ email });

  if (userExists) {
    res.status(400).send("User already exists");
   
  } else {
    try {
      const newStore = new Store({
        Email: req.body.Email,
        Store_name: req.body.Store_name,
        Owner_name: req.body.Owner_name,
        Status: false,
        image: req.file.buffer,
      });
      console.log("Store SuccessFul");
      const savedStore = await newStore.save();
      res.status(201).json(savedStore);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log("Data did't Store");
    }
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      actualPrice: req.body.actualPrice,
      discountPrice: req.body.discountPrice,
      discountPercentage: req.body.discountPercentage,
      catagory: req.body.catagory,
      storeName: req.body.storeName,
      image: req.file.buffer,
    });
    console.log(newProduct);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    console.log("Product Added");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("sorry Product not add");
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

const getMyStore = async (req, res) => {
  const Email = req.query.Email;
  console.log("Shop Fun",Email);
  try {
    const user = await Store.findOne({ Email: Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userStore = user.store;
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user store:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { registerStore,addProduct,getProduct,getMyStore };
