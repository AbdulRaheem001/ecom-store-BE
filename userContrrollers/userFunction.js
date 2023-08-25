const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Module/user_Modul");
const Store = require("../Module/store_Module");
const mongoose = require('mongoose');



const registerUser = asyncHandler(async (req, res) => {
    
    const { Name, Email, Password, userType } = req.body;  
    
    if (!Name || !Email || !Password|| !userType) {
      res.status(400).send("Please add all fields");
    } 
    //check id user exists
    const userExists = await User.findOne({ Email });
  console.log(userType);
    if (userExists) {
      res.status(400).send("User already exists");
    }
    else {
      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);
  
      // Create user
      const user = await User.create({
        Name,
        Email,
        Password: hashedPassword,
        userType,
      });
      if (user) {
        res.status(201).json({
          _id: user.id,
          Name: user.Name,
          Email: user.Email,
          userType: user.userType,
          token: generateToken(user._id),
        });
        res
          .status(201)
          .send({ message: "SignUp Successfully" });
      }
      else {
        res.status(400).send("Invalid User data");
      }
  
    }
  });

  function generateToken(userId) {
    const secretKey = "your_secret_key_here";
    const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
    return token;
  }

  const signin = asyncHandler(async (req, res) => {
    const { Email, Password } = req.body;
    const userExists = await User.findOne({ Email });
    console.log(Email);
    if (userExists && (await bcrypt.compare(Password, userExists.Password))) {
      console.log(userExists.userType);
      if (userExists.userType === "shopKeeper") {
        const storeExists = await Store.findOne({ Email });
        
        if (storeExists) {
          console.log("signIn as a Shopkeeper");
          res.json({
            token: generateToken(userExists._id),
            userType: userExists.userType,
            Email: userExists.Email,
            Status: storeExists.Status,
            StoreExist: true,
          });
        } else {
          console.log("Shopkeeper exists but store is not registered yet");
          res.json({
            token: generateToken(userExists._id),
            userType: userExists.userType,
            Email: userExists.Email,
            Status: false,
            StoreExist: false,
          });
        }
      } else {
        console.log("User is not a shopkeeper");
        res.json({
          token: generateToken(userExists._id),
          userType: userExists.userType,
          Email: userExists.Email,
          Status: false,
          StoreExist: false,
        });
      }
    } else {
      // Handle invalid credentials
    }
  });
  
  module.exports= {registerUser,signin}