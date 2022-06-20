import mongoose from "mongoose"
const Product = mongoose.model("Product")
export default function (app) {
    app.get ("/findVendorProducts", function (req,res){
        Product.find ({}, function(err,products){
            if (err){
                console.log (err)
            } else { 
                console.log("findvendor get fucntion")
                res.send ({title:"YONIIIIIIIIIIIIIIIII"})
                // res.send (products)
            }
        })
    });
}