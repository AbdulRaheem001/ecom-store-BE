const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      trim: true,
      required: [true, "Please add Your Name"],
    },
    Email: {
      type: String,
      trim: true,
      required: [true, "Please Add Your Email"],
    },
    userType: {
      type: String,
      trim: true,
      required: [true, "Please Add Your userType"],
    },
    Password: {
      type: String,
      required: [true, "Please Add Password"],
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Users", UsersSchema);


// // Api Key AIzaSyBpzDLExdP4xEOC1rGYCur4LWQuVlXkhKg

