import express from 'express'
import bodyParser from "body-parser";
import initialProducts from "./initialProducts.js"

const app = express()

app.use(express.urlencoded({ extended: true }));
 
app.use(express.json());

const port = 5000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//DATA BASE - MONGOOSE FUNCTIONS

import mongoose from "mongoose";

// ATLAS DATA BASE 
mongoose.connect(
  'mongodb+srv://yoni_lug:YEHONATAN11@cluster0weekly.8xvzm.mongodb.net/WeeklyDB', {useNewUrlParser: true, useUnifiedTopology: true});

//LOCAL DATA BASE ON PORT 27017
// mongoose.connect('mongodb://localhost:27017/WeeklyDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log ( "data base is connected")
});
const orderSchema = new mongoose.Schema({
  productHeader: String,
  productDescription: String,
  vendor: String,
  price: String,
  units: String,
  orderQnt: Number,
  orderWeek: Number
 });
 
 const Order=mongoose.model ("order",orderSchema);
 
const productSchema = new mongoose.Schema({
  productHeader: String,
  productDescription: String,
  vendor: String,
  price: String,
  units: String,
  deliveryArea: Object
 });

const Product = mongoose.model("Product", productSchema);

const firstProduct = new Product({
    productHeader :"ארטישוק במבצע" ,
    productDescription:"גויבות ב 30 שקל לכמות של 4 קילו, מחיר בשופרסל דיל 120 שקל קילו",
    // productImage:artishokImage,
    vendor: "משק חקלאי הגויבות",
    // the cost in shekel
    price: "30 שח",
    // the type of order- package, units, several units
    units: "ארגז 10 יחידות כ 3 קילו"
});
// SVAE THE FIRST PORDUCT ONLY ONE TIME - MAKE IT NOTE AFTER IT
// firstProduct.save(function (err){          
//    if (!err){}
// console.log(" SAVE DEFAULT PRODUCTS COMPLETED");
// });



//EXPRESS POST AND GET FUNCTIONS

// app.get('/vendor', (req, res) => {
  
//   res.send("Get severe is working")
// })

app.get('/products', (req, res) => {
  Product.findOne({ _id: "60284e1d6854d208ed3ee7a8" }, function (err, product) {
    console.log(product)
    res.send(product)
   //res.send("Get products severe is working")
    console.log("Get request is passing")
  });
})

app.post ("/newproduct", function(req,res){
  const newProduct = new Product({
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
      res.send ("DONE")
    }
   })
   
  };
});
})

app.post("/vendor",function (req,res){
  //console.log(req.body)
  const postName= {
    firstName: "Hila",
    lasyName: "Lugassy",
    privousName : req.body
  }

  res.send (postName)
})

app.get ("/findVendorProducts", function (req,res){
  Product.find ({}, function(err,products){
    if (err){
      console.log (err)
    } else { 
      console.log("findvendor get fucntion")
      res.send (products)
    }
   })
  });

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

  const name=[{
  name: 'DB_Eclair',
  calories: 100,
  fat: 100,
  carbs: 100,
  protein: 100
},
{
  name: 'Cupcake',
  calories: 300,
  fat: 30,
  carbs: 60,
  protein: 40
},
{
  name: 'Gingerbread',
  calories: 356,
  fat: 16.0,
  carbs: 49,
  protein: 3.9
}
]




