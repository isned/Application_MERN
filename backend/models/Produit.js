const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ProduitSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    prix:{
        type:Number,
        required:true,
        
    },
  
    description:{
        type:String,
        required:true,
    },

});


module.exports=Produit=mongoose.model("produit",ProduitSchema);