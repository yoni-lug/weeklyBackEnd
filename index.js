import express from 'express'
import bodyParser from "body-parser";
import initialProducts from "./initialProducts.js"
import multer from "multer"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import {v2 as cloudinary} from 'cloudinary' 
import mongoose from "mongoose";


import cloudinaryConfig from "./services/cloudinary.js"
import exampleroute from "./routes/exampleRoute.js" 
import keys from "./config/keys.js"
import Order from "./models/order.js"
import Product from "./models/product.js"
import findVendorProducts from "./routes/findVendorProducts.js"
import deleteVendorProduct from './routes/deleteVendorProduct.js';
import post_newproduct from './routes/post_newproduct.js';
import post_orderThisWeek from './routes/post_orderThisWeek.js';


const localServerPath = "http://127.0.0.1:8887"; // THIS IS ONLY FOR DEVELOPMEMT 
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log (__dirname);


const app = express()
const upload = multer ({dest:"uploads/"})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000  // Dynamic port  from server or locally developement enivornment
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

//HEROKU DEPLYMNET PREPEATION
if (process.env.NODE_ENV === "production") {
  //Express will serve up prodution assests like our main.js or main.css file!)
  app.use (express.static ("client/build"));

  //Express will serve up the index.html file if it doesnt recognize the route
  //const path = require ("path")  - THIS LINE GOT UP TO THE IMPORT 
  app.get ("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build', 'index.html'));
  })
}

console.log ("dirname")
console.log(__dirname)


// ATLAS DATA BASE /DATA BASE - MONGOOSE FUNCTIONS
mongoose.connect(
  'mongodb+srv://'+keys.mongoDB.userName+':'+keys.mongoDB.passWord+'@cluster0weekly.8xvzm.mongodb.net/WeeklyDB', {useNewUrlParser: true, useUnifiedTopology: true});
  // mongoose.connect('mongodb://localhost:27017/WeeklyDB', {useNewUrlParser: true, useUnifiedTopology: true}); //LOCAL DATA BASE ON PORT 27017
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log ( "data base is connected")
});

// Product model is imported from "./server/models"

// GET Routes


exampleroute(app) // this function activate GET requet in exapmpe route
findVendorProducts (app) // this function activate Get request from /findVendorProducts
deleteVendorProduct (app)


//POST Routes

post_newproduct(app) // this function activate Post request from /post_newproduct (llok at routes folder)
post_orderThisWeek (app)

//

//EXPRESS POST AND GET FUNCTIONS

// TODO START GET PROCESS FOR PRODUCTS - DONT SURE IT WORK
//TODO
// app.get('/products', (req, res) => {
//   //Product.findOne({ _id: "60284e1d6854d208ed3ee7a8" }, function (err, product) {
//   Product.findOne({ }, function (err, product) {
//       console.log(product)
//       res.send(product)
//     console.log("Get request is passing")
//   });
// })
//TODO END
// END GET PROCESS FOR PRODUCT 


// COLUDINARY CONFIG





//upload image

app.post("/productImage",upload.single("file"),function (req,res){
  console.log ( "REQUEST --------------------------------------------")
  //console.log (req.body)
  console.log (req.file)
  // console.log (req.file.originalname)
  const productID = req.file.originalname
  console.log( "productID = " + productID)
 
 //Arrange the Local storgae in the Server - in case using the server
  const imageStoringPath = {
    fileName : req.file.filename,
    destination: req.file.destination,
    relativePath: req.file.path,
    serverAdress: __dirname,
    serverAdressLocalServer: localServerPath, //ONLY FOR LOCAL SERVER
    folderPath: path.join(__dirname,req.file.destination),
    folderPathLocalServer: path.join(localServerPath,req.file.destination), //ONLY FOR LOCAL SERVER
    fullPathLocation: path.join(__dirname,req.file.path),
    fullPathLocationLocalServer: path.join (localServerPath,req.file.path) //ONLY FOR LOCAL SERVER
  }
  console.log ("RELATIVE PATH " + imageStoringPath.relativePath)
  console.log ("imageStoringPath OBJECT");   
  console.log (imageStoringPath)
   

   //UPLOAD IMAGE TO CLOUDINARY
   console.log(productID) 
   cloudinary.uploader.upload(imageStoringPath.relativePath,
      {tags:[productID]},
   function(error, result) {
     console.log(result, error)
     console.log (result.secure_url)
     console.log (result.tags)
     res.send (result.secure_url)
    // return (result)
   });  
    console.log ("whatis" )

// NOW HERE NEED TO SEND THE CLOUDINARY PATH AND THE LOCAL PATH TO THE TEXT OBJECT

   // console.log (imageCloudinaryDetails)
  //  console.log ("end")
//    db.products.update(
//     { productID: productID },
//     { $set:
//        {
//          quantity: 500,
//          details: { model: "14Q3", make: "xyz" },
//          tags: [ "coats", "outerwear", "clothing" ]
//        }
//     }
//  )

})



// app.get ("/productImage", function (req,res){
//   console.log ("path")
//   console.log (req.query)
//   const pathObject = JSON.parse (req.query.path)
//   const pathDestinataion = pathObject.destination
 
//   console.log (pathDestinataion)
//   console.log (__dirname)
//   const filepath=path.join(__dirname,pathDestinataion)
//   console.log ("this is the file path"+ filepath)
//   var options = {
//    // root: path.join(filePath)
   
//     root:filepath
   
//   };

//   //const fileName = pathObject.fileName; 
//   const fileName = "picture.jpg"


//   res.sendFile (fileName, options, function(err){
//     if (err){
//      console.log(err)
//     } else 
//       console.log ('Sent:', fileName);
      
//   })



// })








  


