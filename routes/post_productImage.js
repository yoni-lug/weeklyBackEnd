import mongoose from "mongoose"
import upload from "../services/uploadMulter.js"
import {v2 as cloudinary} from 'cloudinary' 
import cloudinaryConfig from "../services/cloudinary.js" 

//upload image
export default function post_productImage(app,Product) {
    app.post("/productImage",upload.single("file"),function (req,res){
    //MANAGE THE TEXT PRODUCT DATA
    let imagePathServer = ""
    if (req.file){
        console.log ("req.file")
        console.log(req.file)
        imagePathServer = req.file.path 
    }
        console.log ("PRODDDUCCT IMAGE")
        
        
        const productID = req.headers.authorization // the unique product ID
        
            console.log ("image is saved at the server at : " +imagePathServer)
        //} 
        

        // Create New product to the DataBase
        const newProduct = new Product({
            productID: req.body.productID,
            productHeader : req.body.productHeader,
            productDescription: req.body.productDescription,
            vendor:"" ,
            price: req.body.productCost,
            units: req.body.productPackage,
            deliveryArea: req.body.deliveryArea,
            imageServerRelativePath:imagePathServer,
            ImageCloudineryURL:""
        })
        newProduct.save(function (err){
            if (!err){
            console.log(" save new Product without image completed")
            Product.find ({}, function(err,products){
            if (err){
                console.log (err)
            } else {
                console.log ("New product (WITHOUT IMAGAE) was saved successfuly in the data base") 
                res.send ("New product (WITH IMAGAE) was saved successfuly in the data base")
            }
            })
            
            };
        });
        
        //UPLOAD IMAGE TO CLOUDINARY
        if (req.file){
            cloudinary.uploader.upload(imagePathServer,{tags:[productID]},
                function(error, result) {
                if (!error) {
                    let [productID] = result.tags
                    console.log ("image is saved at Coldinary at  : "+result.secure_url)
                    // send the URL to the database with the fitting tag(unique productID) 
                    
                    Product.findOneAndUpdate(
                        {productID:productID}, //filter
                        {ImageCloudineryURL: result.secure_url },  // update
                        {useFindAndModify: false, new:true }, //options
                        //  {new: true}, 
                    
                        function (err,newDoc){
                            console.log(newDoc)
                    }
                    )
                }   
                else { 
                    console.log (error)
                } 
            });
        }   
    })
}
    