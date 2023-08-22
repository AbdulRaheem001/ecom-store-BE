const express = require("express");
const router = express.Router();
const multer = require('multer');
const {
    registerUser,
    signin
} =require("../userContrrollers/userFunction");
const {
    addProduct,
    getProduct,
}=require("../userContrrollers/AdminFunction")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/registerUser", registerUser);
router.post("/signin", signin);
router.post('/addProduct', upload.single('image'), addProduct);
router.get("/getProduct",getProduct);
module.exports = router;