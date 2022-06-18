import  mongoose  from "mongoose";
const Product = mongoose.model ("Product");

export default function (app){
    app.post ("/newproduct", function(req,res){
        const newProduct = new Product({
        productID: req.body.productID,
        productHeader : req.body.productHeader,
        productDescription: req.body.productDescription,
        vendor:"" ,
        price: req.body.productCost,
        units: req.body.productPackage,
        deliveryArea: req.body.deliveryArea
        })
        newProduct.save(function (err){
        if (!err){
        console.log(" save new Product completed")
        Product.find ({}, function(err,products){
        if (err){
            console.log (err)
        } else { 
            res.send ("New product (excluding image) was saved successfuly in the data base")
        }
        })
        
        };
    });
    })
}
