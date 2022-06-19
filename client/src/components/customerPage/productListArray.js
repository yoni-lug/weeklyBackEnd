import aviv from './productPhotos/aviv.jpg'
import pineappleImage from './productPhotos/pineapple.jpg'
import artishokImage from "./productPhotos/artishok.jpg"

    const productsList = [ 
        {
          _id:"1",
          productHeader :"ארטישוק במבצע" ,
          productDescription:"גויבות ב 30 שקל לכמות של 4 קילו, מחיר בשופרסל דיל 120 שקל קילו",
          productImage:artishokImage,
          quantity : 0,
          vendor: "משק חקלאי הגויבות",
          // the cost in shekel
          price: 10,
          
          // the type of order- package, units, several units
          units: "ארגז 10 יחידות כ 3 קילו",
          

        },
        { 
          _id:"2",
          productHeader :"אננס כמו בתיאלנד" ,
          productDescription:"אננס טרי מהמשק , 10 חתיכות במחיר 100 שח",
          productImage:pineappleImage,
          quantity : 0,
          vendor: " משק מעגלים ",
           // the cost in shekel
           price: 30,
           // the type of order- package, units, several units
           units: "12 יחידות ( משקל כ 4 קילו)",
        },
        { 
          _id:"3",
          productHeader :"ענבים מתוקים" ,
          productDescription:"ענב מיוחד במחיר מעולה",
          productImage:pineappleImage,
          quantity : 0,
          vendor: "כרם לכיש ",
           // the cost in shekel
           price: 20,
           // the type of order- package, units, several units
           units: "12 יחידות ( משקל כ 4 קילו)",
           
        },
        { 
          _id:"4",
          productHeader :"מוצר 4 " ,
          productDescription:"אין כמו מוצר רביעי",
          productImage:pineappleImage,
          quantity : 0,
          vendor: "ספק המוצרים ",
           // the cost in shekel
           price: 100,
           // the type of order- package, units, several units
           units: "12 יחידות ( משקל כ 4 קילו)",
           
        },
        { 
          _id:"5",
          productHeader :"אביבוש המתוק" ,
          productDescription:"אביב לוגסי המתוק המקסים החכם והנסיך",
          productImage:aviv,
          quantity : 0,
          vendor: " אבא ",
           // the cost in shekel
           price: 100000,
           // the type of order- package, units, several units
           units: "אחד ומיוחד"
        }
      ]
    
    export {productsList}