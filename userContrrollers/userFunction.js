const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Module/user_Modul");
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

  const signin= asyncHandler(async(req,res) => {
    const { Email, Password } = req.body;
    console.log(Email );
   
    const userExists = await User.findOne({ Email });
    if(userExists && (await bcrypt.compare(Password, userExists.Password)) ) {
        console.log("user Find");
        res.json({
          token: generateToken(userExists._id),
          userType: userExists.userType,
        });
    }
    else{}
  })

  module.exports= {registerUser,signin}