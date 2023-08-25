const express = require("express");
const connectDB = require("./DB/db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });

connectDB();
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/routes", require("./Routes/routes"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

// dns.resolveNs('youtube.com', (err, nameservers) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Nameservers:', nameservers);
// });

// const assert = require('assert');

// const value = 42;
// const expected = 42;

// assert.ok(value, 'Value should be truthy');
// assert.strictEqual(value, expected, 'Values should be strictly equal');

// const obj1 = { a: 1, b: 2 };
// const obj2 = { b: 2, a: 1 };

// assert.deepEqual(obj1, obj2, 'Objects should be deeply equal');

// const add = () => {
//   let sum = 1 + 2;
//   throw new Error('Function contains undefined error');
// };

// assert.throws(add, { message: 'Function contains undefined error' });
// const punycode = require('punycode');

// // Decode Punycode strings of ASCII
// // to Unicode symbols
// console.log(punycode.decode('manama-pta'));
// console.log(punycode.decode('--dqo34k'));
