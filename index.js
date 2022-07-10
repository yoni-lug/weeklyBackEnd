import express from 'express'
import bodyParser from "body-parser";
import initialProducts from "./initialProducts.js"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import mongoose from "mongoose";
import keys from "./config/keys.js"
//import Order from "./models/order.js"

import productModel from "./models/product.js"
import findVendorProducts from "./routes/findVendorProducts.js"
import deleteVendorProduct from './routes/deleteVendorProduct.js';
import post_newproduct from './routes/post_newproduct.js';
import post_orderThisWeek from './routes/post_orderThisWeek.js';
import post_productImage from './routes/post_productImage.js'


//TODO PROBALABLY NOT NEEDED 
const localServerPath = "http://127.0.0.1:8887"; // THIS IS ONLY FOR DEVELOPMEMT 

async function indexJS() {
  const app = express()
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());


  //ATLAS DATA BASE /DATA BASE - MONGOOSE FUNCTIONS


  const response = await mongoose.connect(
    'mongodb+srv://'+keys.mongoDB.userName+':'+keys.mongoDB.passWord+'@cluster0weekly.8xvzm.mongodb.net/WeeklyDB', {useNewUrlParser: true, useUnifiedTopology: true});
    
  if (mongoose.connection.readyState ===1){
    console.log ("DATABASE is connected: Connection.readyState ===1 ")
  }
  const  db = mongoose.connection;
  

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once ('open', function() {   // THIS FUNCTION NOT RELVANT WHEN AWAIT IS ADDED TO MONGOOSE CONNECT 
    // we're connected!
    console.log ( "data base is connected")
    
  });


  //TODO WHAT IS THE BEST PRACTICES TO SYNC THE DATA BASE TO ACTIVATE BEFORE USING IT 
  const PORT = process.env.PORT || 5000  // Dynamic port  from server or locally developement enivornment
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })

  // MONGO DB MODELS IMPORTED
  const Product = productModel() // Product model is imported with intial values

  // GET Routes
  findVendorProducts (app,Product) // this function activate Get request from /findVendorProducts
  deleteVendorProduct (app,Product)

  //POST Routes
  post_newproduct(app,Product) // this function activate Post request from /post_newproduct (llok at routes folder)
  post_productImage (app,Product)
  post_orderThisWeek (app,Product)

  //HEROKU DEPLYMNET PREPEATION
  const __dirname = dirname(fileURLToPath(import.meta.url));
  if (process.env.NODE_ENV === "production") {
    //Express will serve up prodution assests like our main.js or main.css file!)
    app.use (express.static ("client/build"));

    //Express will serve up the index.html file if it doesnt recognize the route
    //const path = require ("path")  - THIS LINE GOT UP TO THE IMPORT 
    app.get ("*", (req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build', 'index.html'));
    })
  }
}
indexJS() // activate the async function that activate the index.js


  


