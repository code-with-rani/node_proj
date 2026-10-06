const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title : {
        type : String,
        required : true,
    },
    description :  String,
    image : {
        type : String,
        default : 
            "https://unsplash.com/illustrations/sky-with-palm-trees-blue-yellow-sky-and-palm-leaf-background-vector-illustration-FsYlaw7epiQ",
        set : (v)=>
         v === "" 
            ? "https://unsplash.com/illustrations/sky-with-palm-trees-blue-yellow-sky-and-palm-leaf-background-vector-illustration-FsYlaw7epiQ" 
            : v,
    },
    price : String,
    location : String,
    country : String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;