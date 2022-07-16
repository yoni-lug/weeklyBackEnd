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
import defaultImage from "./defaultImage/default_transparent_image.jpg"
import { Typography } from '@material-ui/core';

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
    const [newProduct, setNewProduct]= useState ({
      productID:"",
      productHeader:"",
      productDescription:"",
      vendor:"",
      productCost:"",
      productPackage:"",
      deliveryArea:""
    })

  // TO PREVIEW THE IMAGE
    const [image,setImage] =useState ({
    state: false,
    preview: "", 
    raw: ""
  });

  
  // TO UPLOAD THE IMAGE
  const [imageLoad, setImageLoad] =useState ({
    name: "",
    file: null
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
    //console.log ("the function is working")
    //console.log (delivery)
    let name="deliveryArea"
    setNewProduct ({
      ...newProduct,
      [name]:delivery
    })
  }
 
  function handleInputChange (event) {
  
    const imageFile = event.target.files[0];
    const imageName = event.target.files[0].name;
    //const imageType= event.target.files[0].type;
    
    setImageLoad ({
      name: imageName,
      file: imageFile,
    })   
  }

    // TODO 1 / MANAGE THE SMAL SENT BUTTON ""Handel image submit!"
  function handleSubmit (event){
    event.preventDefault()
   //ADD THE productID uninqe
    const productID = uuidv4(); // CREATE UNIQE IDENTFIER
   
    //ADD PRODUCT ID TO THE NEW PRODUCT
    newProduct.productID = productID
    
    //CREATE FORMDATA TO FETCH
    const formData = new FormData();
    if (imageLoad.file) { //  PREVENT FAILURE IF IMAGE NOT EXIST
       formData.append ("file",imageLoad.file, imageLoad.name)
    }
  
    // ADD THE TEXT DATA TO THE FORMDATA  
    for (var key of Object.keys(newProduct)) {
      console.log(key + " -> " + newProduct[key])
      formData.append(key,newProduct[key])
   }
    
    axios.post('/productImage',formData, {
      headers:{
        "Content-Type": "multipart/form-data",
        'Authorization': productID  // THE PRODUCT ID IS ADDED TO THE FILE
      }
    })
      .then(function (response) {
      // handle success
      console.log("respone data")
      console.log(response.data);
      // setImageLoad (function (preValue){
      //   return({
      //     name: preValue.name,
      //     file: preValue.file
      //  //   path: serverPath
      //   })
      // })
      
      routeChange(); // USING THE USE HISTORY TO ROUTE CHANGE
      
//TODO2 END

//TODO 3 
  

     
      })
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant='h2'> הוספת מוצר</Typography>
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
                 color="primary"
                 > אישור
              </Button>
            </form>
            
            
            <form 
               // action="/productImage" enctype="multipart/form-data" method="post"
                onSubmit={handleSubmit}
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