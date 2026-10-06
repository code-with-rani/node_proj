
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const Listing = require("./models/listing.js");
const methodOverride=require("method-override");
// MongoDB URL
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Listings route -- index route 
app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});

    // CORRECT: Do not add "/" before listings
    res.render("listings/index", { allListings });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listings");
  }
});

//show route
app.get("/listing/:id",async(req,res)=>{
  let {id}=req.params;
  const Listing=await Listing.findById(id);
  res.render("listing/show.ejs",{listing});
});

//create router
app.post("/listings",async(req,res)=>{
  const newListing=new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
  //let {title,description,image,price,country,location}=req.body;
  //let listing=req.body.listing;
  //console.log(listing);

});

//edit route
app.get("/listing/:id/edit",async(req,res)=>{
  let{id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});

});

//Update route
app.put("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  redirect(`/listings/${id}`);
});

//DELETE ROUTE
app.delete("/listings/:id",async(req,res)=>{
  let{id}=req.params;
  let de;etedListing= await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
})

//new route 
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
})

// Start server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});