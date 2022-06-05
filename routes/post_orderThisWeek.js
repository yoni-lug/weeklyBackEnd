import mongoose from "mongoose"

const Product = mongoose.model ("Product")

export default function (app){
    app.post ("/orderThisWeek", function(req,res){
        const newOrder = new Order({
        productHeader : req.body.productHeader,
        productDescription: req.body.productDescription,
        vendor:req.body.vendor, 
        price: req.body.price,
        units: req.body.unit 
        })
        newProduct.save(function (err){
        if (!err){
        console.log(" save new Product completed")
        Product.find ({}, function(err,products){
        if (err){
            console.log (err)
        } else { 
            res.send ("new order is sent")
        }
        })
        
        };
    });
    })
}