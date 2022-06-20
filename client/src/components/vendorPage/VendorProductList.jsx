import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from "react-router-dom";
import axios from 'axios';


const useStyles =  makeStyles(function (theme){ 
  return (
      ({
      table: {
        minWidth: 650,
      },
      head:{
        backgroundColor:"cyan", 
      },
      button: {
        margin: theme.spacing(1),
      },
      icons:{
        margin: theme.spacing(1),
        '&:hover':{
          backgroundColor:"cyan",
        }
      },
      addFabButton:{
        margin: theme.spacing(2, 'auto'), // '8px auto'
        textAlign:"center",

      },
    })
  )
})
  


export default function BasicTable() {
  const classes = useStyles();

  // HOOKS FOR the data from the Data Base
  
//TODO RETURN IT
  //const [rows, setRows] = useState ([]); 
//TODO RETURN IT END

//TODO ADDED
const [rows, setRows] = useState ([
  {productDescription: "YONI",
  units: "100",
  price: "200"
  },
  {productDescription: "yehonatan",
  units: 150,
  price: 200

  }
]); 

  useEffect( function(rows){
    const fetchData =  async function (){
      try {
        console.log ("render 2 " + rows)
        // console.log (rows);
         let list = await axios.get('/findVendorProducts')
        // handle success
        console.log (typeof list)
        console.log("read data ")
          let list1 = list
          console.log (list1)
          //console.log( list.data)
         // setRows (list.data)   
     }
     catch (error) {
      // handle error
      console.log (error) 
     }
    }
    fetchData ()
}, [])

  //TODO RETURN2 END
  
  // HOOKS FOR the check box
     const [isChecked, setIsChecked] = useState ([]); 

  

  // // //HOOKS FOR THE THE Effect
  // useEffect (function() {
  //   console.log("is change  "+isChecked )
  //   console.log(isChecked)
  // },[isChecked])
  
 
  //HANDLE THE ADD BUTTON - TO render the add item page
    function handleClickAddIcon(){
      console.log("clicked +, using link to render the next page")
   } 
  
  
   //HANDLE THE CHECK BOX CLICK

  // function handleCheckboxChange(event,rowId){
  //   console.log("click the checkb box")
  //   setIsChecked (function(previous){
  //     return (
  //       [...previous, {id:rowId, check:event.target.checked}]
  //     )
  //   });
  //   console.log (isChecked)
  // };
  
  //HANDLE THE DELETE ICON
  function handleDeleteIconClick (event, rowId){
    console.log(event.target)
    console.log (rowId)
    // sending get request to the server to delete the item from the DataBase
    axios.get('/deleteVendorProduct',
    {
      params:{
        id:rowId
      }
    })
    .then(
      function (response) {
      // handle success
      console.log(response.data);
      setRows (response.data)
    })
    .catch(function (error) {
      // handle error
         console.log(error);
      })
  } 
    
  // DEFINING THE ICONS in EACH ROW IN THE TABLE ADD AND DELETE
  function editIcon(rowId){
    return(
      <EditIcon 
        className={classes.icons}
        color ="primary"  
        align ="right" 
      />
    )
  } 

  function deleteIcon(rowId){
    return (
      <DeleteIcon
        className={classes.icons}
        align ="right" 
        color="secondary"
        onClick= {function (event){
          return(
            handleDeleteIconClick (event, rowId)
          )
        }}
    />
    )
  }

  
  // THIS IS THE RENDER PAGE
  return (

      <div>
      {/* <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >  Delete </Button> */}
     
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow  >
          {/* <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'checkbox headline -All rows' }}
          /> */}
            <TableCell align="right">מוצר</TableCell>
            <TableCell align="right">תיאור המוצר</TableCell>
            <TableCell align="right">יחידות/ משקל</TableCell>
            <TableCell align="right">מחיר</TableCell>
            <TableCell align="right">איזור</TableCell>
            <TableCell align="right">תאריך למשלוח</TableCell>
            <TableCell aria-label= "edit sign" align="right"></TableCell>
            
          </TableRow>
        </TableHead>
       
        <TableBody>
        {/* TODO */}
        <TableRow >
        <TableCell align="right" component="th" scope="row" >"productHeader"</TableCell>
              <TableCell align="right">"productDescription"</TableCell>
              <TableCell align="right">"units"</TableCell>
              <TableCell align="right">"price"</TableCell>
              <TableCell align="right">"vendor"</TableCell>
              <TableCell align="right">{editIcon("1")}</TableCell>
              <TableCell align="right">{deleteIcon("2")}</TableCell>

      </TableRow>


{/* TODO START */}
          {/* {rows.map((row) => (
            
            <TableRow key={row._id}> */}

            {/* <Checkbox
              color="primary"
             
              className= {classes.editIcon}
              inputProps={{ 'aria-label': 'checkbox per row'}} 
              onChange={function(event){
                return(
                  handleCheckboxChange(event,row._id)
                )
              }} 
            /> */}

              {/* <TableCell align="right" component="th" scope="row" >{row.productHeader}</TableCell>
              <TableCell align="right">{row.productDescription}</TableCell>
              <TableCell align="right">{row.units}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.vendor}</TableCell>
              <TableCell align="right">{editIcon(row._id)}</TableCell>
              <TableCell align="right">{deleteIcon(row._id)}</TableCell> */}
               
            {/* </TableRow>
          ))}
     {/* TODO END */}

        </TableBody> 
      </Table>
    </TableContainer>
      {/* <AddCircleIcon 
        fontSize="large"
      //  
      /> */}
      <Container className = {classes.addFabButton} >
      <Box >
        <Tooltip title="הוסף מוצר" aria-label="add">
          <Fab component={Link} to='/vendor' color="primary" aria-label="add with a link" style= {{padding:"3%" }}   >
              <AddIcon
                onClick={handleClickAddIcon} // send an log - move to Insert product page
                
                />
          </Fab>
        </Tooltip>
      </Box>
      </Container>

    
    </div>
  );
}
