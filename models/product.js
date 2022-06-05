import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    productID: String,
    productHeader: String,
    productDescription: String,
    vendor: String,
    price: String,
    units: String,
    deliveryArea: Object,
    imageServerRelativePath:String,
    ImageCloudineryURL:String
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

Product.find( {} , function(err, products){

  //SAVE DEFAULT  THE FIRST PORDUCT ONLY ONE TIME - MAKE IT NOTE AFTER IT
  if (!products.length){
    firstProduct.save (function (err){          
       if (!err){}
    console.log(" SAVE DEFAULT PRODUCTS COMPLETED");
    })};
  } 
)

export default Product