import mongoose from "mongoose"
const Product = mongoose.model("Product")
export default function (app){
    app.get ("/deleteVendorProduct", function(req,res){
        console.log ("request is" +req.query.id)
        Product.findOne ({_id:req.query.id}, function (err,selectedProduct){
        if (err){
            console.log(err)
        } else {
            console.log (selectedProduct)
        }
        })
        Product.deleteOne({_id: req.query.id }, function (err) {
        if (err){
            console.log (err)
        };
        // deleted at most one document
        });
        Product.find ({}, function(err,products){
        if (err){
            console.log (err)
        } else { 
            console.log("findvendor get fucntion")
            res.send (products)
        }
        })
        
    })

}