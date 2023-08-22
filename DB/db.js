const mongoose = require("mongoose");
const mongoosURL = "mongodb://127.0.0.1:27017/?directConnection=true";



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoosURL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;



