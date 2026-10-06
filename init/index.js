const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing = require("../models/listing.js");

// MongoDB URL = connection satablished 
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    Listing.deleteMany({});
    await Listing.insertMany(initDara.data);
    console.log("data was initilazed");
};

initDB;