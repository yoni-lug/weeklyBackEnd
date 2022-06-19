//NEED TO CHECK THE ASYNC EFFECT 

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import CheckBoxZones from './CheckBoxZones';
import UploadImage from "./UploadImage"
import axios from "axios";
import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  // paper: {
  //   // padding: theme.spacing(2),
  //   // textAlign: 'center',
  //   // color: theme.palette.text.secondary,
  // },
    
}}));

export default function InsertProduct() {
  const classes = useStyles();

  
  const history = useHistory();
  const routeChange = () =>{ 
    let path = `/vendorProductList`; 
    history.push(path);
  }
  
  // const newProductObject = {
  //   productHeader:"",
  //   productDescription:"",
  //   productCost:"",
  //   productPackage:"",
  //   deliveryArea:"",
  //   productID:""
// }
  
    
    const [newProduct, setNewProduct]= useState ({
    productHeader:"",
    productDescription:"",
    productCost:"",
    productPackage:"",
    deliveryArea:"",
    productID:""
    })


  const [image,setImage] =useState ({
    state: false,
    preview: "", 
    raw: ""
  });

  // TO UPLOAD THE IMAGE
  const [imageLoad, setImageLoad] =useState ({
    name: "",
    file: "",
    path:{}
  })

  function imagePreview (imageData){
    console.log("it is work");
    console.log (imageData)
    setImage ({
        state:true,
        preview: URL.createObjectURL(imageData),
        raw: imageData
    });
  }

  function handleChange (event){
    const value=event.target.value
    const name=event.target.name
 
    setNewProduct ({
      ...newProduct, 
      [name]: value
    })
  }
  function placesToDeliver(delivery){
    console.log ("the function is working")
    console.log (delivery)
    let name="deliveryArea"
    setNewProduct ({
      ...newProduct,
      [name]:delivery
    })
  }

// PRIGINAL----------------------------------------------
  // function handleSubmit (event){
  //   event.preventDefault()
  //   axios.post('/newProduct',newProduct)
  //     .then(function (response) {
  //     // handle success
  //     console.log(response.data);
  //     })
  //     .catch(function (error) {
  //    // handle error
  //     console.log(error);
  //     })

  //   console.log (event.target)

  //   routeChange(); // USING THE USE HISTORY TO ROUTE CHANGE
  // }
//-------------------------------------------------------------
  function handleSubmit (event){
    event.preventDefault()
    
    //CREATE PRODUCT_ID
    
    const productID = uuidv4(); // CREATE UNIQE IDENTFIER
    console.log("product ID = " +productID);
    //ADD PRODUCT ID TO THE NEW PRODUCT
    newProduct.productID = productID
    console.log ("NEW PRODUCT WITH PRODUCT ID")
    console.log (newProduct)
    
    
    //fUNCTIO TO SEND THR TEXT DATA TO THE SERVER
    async function sendTextData (){
      try {
        const response = await axios.post('/newProduct', newProduct);
        // handle success
        console.log(response.data);
        routeChange(); // USING THE USE HISTORY TO ROUTE CHANGE
      } catch (error) {
        // handle error
        console.log(error);
      }
    } 

    
    //FUNCTION TO SEND THE IMAGE FILE TO THE SERVER
     console.log ("imageLoad.name = " +imageLoad.name)
     console.log (imageLoad.file)
    const formData = new FormData();
    formData.append (imageLoad.name , imageLoad.file, productID )
   
   
    //SEND TEXTDATA TO SERVER AND THEN SEND THE IMAGE DATA TO SEVER SYNC
    
    sendTextData() //SEND THE DATA TO DATA BASE
    .then((response)=>{   //sync sending the data and sending the image
      console.log("response")
      return (
      // SEND THE IMAGE TO DATA BASE
        axios.post('/productImage',formData)
          .then(function (response) {
          // handle success
          console.log("respone data")
          console.log(response.data);
          })
        )
      
    })
    //sendTextData().then (sendImageToServer())
    //console.log (event.target)
    
    console.log ("!!!!!ATFTER THE IMAGE ")
   
   
   
   
   
    
      
    routeChange(); // USING THE USE HISTORY TO ROUTE CHANGE
   }
//-----------------------------------------------------------------

  function handleInputChange (event) {
  
    const name=event.target.name
    console.log (name)
    const imageFile = event.target.files[0]
    console.log (imageFile)
    setImageLoad ({
      name: name,
      file: imageFile,
      path:{}
    })   
  }

    // TODO 1
  function handleImageSubmit (event){
    event.preventDefault()    
    console.log (event.target)
    console.log (imageLoad.name)
    console.log (imageLoad.file)

    const formData = new FormData();
    formData.append (imageLoad.name , imageLoad.file)
    
    axios.post('/productImage',formData)
      .then(function (response) {
      // handle success
      console.log("respone data")
      console.log(response.data);
      const serverPath = response.data;
      console.log (serverPath.fullPathLocationLocalServer+".jpg")
      
//TODO2 END

//TODO 3 
  setImageLoad (function (preValue){
        return({
          name: preValue.name,
          file: preValue.file,
          path: serverPath
        })
      })

     
      })
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <h2>הוספת מוצר</h2>
          <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <TextField 
                id="standard-basic" 
                label="כותרת מוצר"
                placeholder="כותרת המוצר"
                fullWidth
                variant="outlined"
                onChange= {handleChange}
                name= "productHeader"
                value={newProduct.productHeader}
            />

            <TextField
                id="standard-multiline-static"
                label="תיאור המוצר"
                placeholder="תיאור המוצר"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                name= "productDescription"
                onChange= {handleChange}
                value={newProduct.productDescription}

               
            />
             <TextField 
                id="standard-basic" 
                label="מחיר"
                placeholder="מחיר"
                fullWidth
                variant="outlined"    
                name= "productCost"
                onChange= {handleChange}
                value= {newProduct.productCost}

            />
             <TextField 
                id="standard-basic" 
                fullWidth
                variant="outlined"
                placeholder="  300 גרם.ג  ציין כמוות ומארז לדוגמא: מארז תותים גדול במשקל מוערך של"    
                name="productPackage"
                onChange= {handleChange}
                value={newProduct.productPackage}
            />
              <CheckBoxZones delivery={placesToDeliver} />
               
              <Button 
                type="submit"
                 size= "large" 
                 variant="contained" 
                 color="primary"> אישור
              </Button>
            </form>
            
            
            <form 
               // action="/productImage" enctype="multipart/form-data" method="post"
                onSubmit={handleImageSubmit}
                >
                  <div >
                    <input type="file" accept= "image/*" name="file" onChange ={handleInputChange} />
                  
                    <input type="submit" value="Handel image submit!" />            
                  </div>
              </form>
          
              
              <UploadImage style= {{margin:"100px"}} imageData={imagePreview}/>  
              {/* TODO THE STYLE NOT WORK           */}
             

        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>preview</Paper>
          {/* <img src={image.preview} alt="dummy" width="300" height="300" /> */}
          {image.state && <img height = "300" src={image.preview}></img>}
        </Grid>
      </Grid>
    </div>
  );
}