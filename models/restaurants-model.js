const mongoose = require("mongoose");


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
    Restaurant : Restaurant_Schema,
  }