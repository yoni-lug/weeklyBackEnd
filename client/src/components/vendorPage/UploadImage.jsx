import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function UploadImage(props) {
  const classes = useStyles();
  const [image, setImage] = useState({ preview: "", raw: "" });

 // NOT WORKING
  // useEffect (function(props){
  //   props.imageData(image.raw)
  //   console.log("image changed");
  // },[image.raw])
  
  const handleChange = function(event) {
    console.log(event.target.files)
    if (event.target.files.length) {
      setImage({
        preview: URL.createObjectURL(event.target.files[0]),
        raw: event.target.files[0]
      })
      props.imageData(event.target.files[0])
    }
  };
  
  
  return (
    
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained"  color="primary" component="span">
          הצג תמונה
        </Button>
      </label>
    </div> 
  );   
}
export default UploadImage

