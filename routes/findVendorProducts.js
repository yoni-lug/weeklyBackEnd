import mongoose from "mongoose"
//const Product = mongoose.model("Product")
export default function (app,Product) {
    app.get ("/findVendorProducts", function (req,res){
        Product.find ({}, function(err,products){
            if (err){
                console.log (err)
            } else { 
                console.log("findvendor get fucntion")
                //const result = {title:"YONIIIIIIIIIIIIIIIII"}
                //const result1 = JSON.stringify(result)
                res.send (products)
            }
        })
    });
}