import mongoose from "mongoose";

const PremiumPriceSchema = new mongoose.Schema({
        acctype : { type : String , enum : ["normal" , "pro" , "pro-max"] , default : "normal"} ,
        price : {type : Number , enum : [ 1 , 1.5 ] }
});

export const PremiumPrice = mongoose.model('PremiumPrice', PremiumPriceSchema);