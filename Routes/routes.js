const express = require("express");
const router = express.Router();
const multer = require('multer');
const {
    registerUser,
    signin
} =require("../userContrrollers/userFunction");



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/registerUser", registerUser);
router.post("/signin", signin);


//ShopKeeper
const {
    registerStore,
    addProduct,
    getProduct,
    getMyStore,
}=require("../userContrrollers/Shopkeeper_Function")
router.post('/addProduct', upload.single('image'), addProduct);
router.get("/getProduct",getProduct);
router.post('/registerStore', upload.single('image'), registerStore);
router.get("/getMyStore", getMyStore);

//Admin Routes
const {
    getStore,
    updateStatus,
}=require("../userContrrollers/AdminFunction")
router.get("/getStore",getStore);
router.post("/updateStatus", updateStatus);
module.exports = router;