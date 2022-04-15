const mongoose = require("mongoose");
const database=mongoose.createConnection(
  "mongodb://localhost:27017/Dl3-Kershk"
);

database.on("error", (err) => {
  console.log("failed to connect to db " + err);
});
database.on("connected", () => {
  console.log("connected to db successfully");
});

     const Restaurant_Schema = new mongoose.Schema({

      RestaurantName:{
        type:String,
        immutable:true,
        required:true
      },
      menu:String,
    
      category:[String],
    
      contact:String,
    
      delivers:Boolean,
    
      rating:{},
    
      aveRating:Number,
      numberOfVoters:Number,
    },
    { timestamps: { createdAt: "created_at" } }
    )

module.exports={
    Restaurant : database.model('Restaurant', Restaurant_Schema),
  }